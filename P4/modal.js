/*------------------------------------------------------------------------------*/
/*                 gestion css de la barre de navigation                        */
/*------------------------------------------------------------------------------*/

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/*------------------------------------------------------------------------------*/
/*                 récupération des principaux éléments DOM                     */
/*------------------------------------------------------------------------------*/

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const contentClass = document.querySelector(".content");
const feedback = document.querySelector(".feedback");
const soumissionBtn = document.querySelector("#soumission");
/* références aux différents champs du formulaire */
let f_prenom = document.getElementById('first');
let f_nom = document.getElementById('last');
let f_mail = document.getElementById('email');
let f_date = document.getElementById('birthdate');
let f_nb_part = document.getElementById('quantity');
let f_conditions = document.getElementById('checkbox1');
let f_events = document.getElementById('checkbox2');
/* références vers les différents messages d'erreurs du formulaire */
const prenom_error = document.querySelector("#prenom-error");
const nom_error = document.querySelector("#nom-error");
const mail_error = document.querySelector("#mail-error");
const date_error = document.querySelector("#date-error");
const nb_part_error = document.querySelector("#nb_part-error");
const ville_error = document.querySelector("#ville-error");
const conditions_error = document.querySelector("#conditions-error");

/*------------------------------------------------------------------------------*/
/*                 ajout des listenenrs                                         */
/*------------------------------------------------------------------------------*/

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// ajout d'un listener 'click' sur les boutons de fermeture du formulaire
let btncoll = document.querySelectorAll(".close");
for (btn of btncoll)
  btn.addEventListener("click", closeModal);
// ajout d'un listener 'click' sur le bouton de soumission du formulaire.
// Ce listener est nécessaire, car il permet d'utiliser preventDefault() qui empêchera l'appel 
// de onsubmit = "return validate()" lorsque celui-ci est présent et empêchera de même les vérifications
// HTML inhérentes aux champs du formulaires. (type="email", min-length=2... etc) 
soumissionBtn.addEventListener("click", validation);
/*------------------------------------------------------------------------------*/
/*                 ouverture/fermeture de la modal+feedback                     */
/*------------------------------------------------------------------------------*/

// launch modal form
function launchModal() {
  contentClass.style.animationName = "modalopen";
  modalbg.style.display = "block";
}


// fermeture du formulaire
// Animation de fermeture du formulaire : il 'disparaît' comme il est apparu, mais environ trois fois plus vite.
function closeModal() {
  let d = getComputedStyle(document.documentElement).getPropertyValue('--modal-duration');
  d = d.slice(0, -1);
  const duration = Number.parseFloat(d) * 1000 / 3;
  setTimeout(() => {
    modalbg.style.display = "none"; // 'disparition' du formulaire
    feedback.style.display = "none"; // 'disparition' du feedback
  },
    duration + 100);
  contentClass.style.animationName = "modalclose";
  contentClass.style.animationDuration = duration + "";
  contentClass.style.animationFillMode = "forwards";
}


// affichage du message feedback succès de l'inscription
function showFeedBack() {
  feedback.style.display = "flex";
}


/*------------------------------------------------------------------------------*/
/*                 fonctions de validation                                      */
/*------------------------------------------------------------------------------*/

// validation de l'ensemble du formulaire

let user = {};


function validation(event) {
  // empêche les vérifications 'HTML' des champs du formulaire 
  event.preventDefault();
  const champs = [
    { validate_fct: validationPrenom, err: prenom_error },
    { validate_fct: validationNom, err: nom_error },
    { validate_fct: validationEmail, err: mail_error },
    { validate_fct: validationDate, err: date_error },
    { validate_fct: validationNbParticipation, err: nb_part_error },
    { validate_fct: validationVille, err: ville_error },
    { validate_fct: validationConditions, err: conditions_error },
  ];

  user = {};

  let isValide = true;
  champs.forEach(function (elt) {
    if (!elt.validate_fct()) {
      elt.err.style.display = "block";
      isValide = false;
    } else {
      elt.err.style.display = "none";
    }
  });

  checkEvents(); // verifie la souscription de l'utilisateur aux news.

  if (isValide) {
    // tout OK... envoi du formulaire
    console.log(user);
    // fetch().... envoi de user au server
    // simulation ci-dessous
    soumissionBtn.disabled = true;
    document.getElementById('submitting').style.display = 'block';
    setTimeout(() => {       
      document.getElementById('feedback-town').textContent = user.ville;
      showFeedBack();
      document.getElementById('submitting').style.display = 'none';
      soumissionBtn.disabled = false;
      resetForm();
    }, 2000);
  } 
}

const regex_prenom = new RegExp(/( )*\p{Letter}+(('?| ?|-?)?(\p{Letter})+)+( )*/gu);
const regex_nom = new RegExp(/( )*\p{Letter}*(('?| ?|-?)?(\p{Letter})+)+( )*/gu);
const regex_mail = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g);
const regex_part = new RegExp(/^[1-9]?[0-9]/g);

function validationPrenom() {
  if (!f_prenom.value) {
    prenom_error.textContent = "Veuillez renseigner votre prénom";
    return false;
  }
  const matched = f_prenom.value.match(regex_prenom);
  if (matched && matched[0] === f_prenom.value) {
    user.prenom = matched[0].trim();
    return true;
  } else {
    prenom_error.textContent = "Votre prénom doit être composé d'au moins deux lettres.\n Vous pouvez utiliser l'apostrophe, le trait d'union ou un espace pour les prénoms composés.";
    return false;
  }
}

function validationNom() {
  if (!f_nom.value) {
    nom_error.textContent = "Veuillez renseigner votre nom.";
    return false;
  }
  const matched = f_nom.value.match(regex_nom);
  if (matched && matched[0] === f_nom.value) {
    user.nom = matched[0].trim();
    return true;
  } else {
    nom_error.textContent = "Votre nom doit être composé que de lettres.\n Vous pouvez utiliser l'apostrophe, le trait d'union ou un espace pour les noms composés.";
    return false;
  }
}

function validationEmail() {
  if (!f_mail.value) {
    mail_error.textContent = "Veuillez renseigner votre adresse email.";
    return false;
  }
  const matched = f_mail.value.match(regex_mail);
  if (matched && matched[0] === f_mail.value) {
    user.email = matched[0].trim();
    return true;
  } else {
    mail_error.textContent = "Veuillez renseigner une adresse email valide.";
    return false;
  }
}

function validationDate() {
  if (!f_date.value) {
    date_error.textContent = "Veuillez renseigner votre vraie date de naissance.";
    return false;
  }

  const d = f_date.value.split('-');
  const a = Number.parseInt(d[0]);
  const m = Number.parseInt(d[1]);
  const j = Number.parseInt(d[2]);
  // vérifie que l'utilisateur aura au moins 13 ans le jour du concours
  const date_concours = { 'a': 2022, 'm': 10, 'j': 15 };
  if (((a === date_concours.a - 13) && m === date_concours.m && j <= date_concours.j) || ((a === date_concours.a - 13) && m < date_concours.m) || (a < date_concours.a - 13)) {
    user.date_naissance = f_date.value;
    return true;
  } else {
    date_error.textContent = `Vous ne pouvez pas vous inscrire : vous devez avoir au moins 13 ans le jour du concours. (le ${date_concours.j}.${date_concours.m}.${date_concours.a})`;
    return false;
  }
}

function validationNbParticipation() {
  if (!f_nb_part.value) {
    nb_part_error.textContent = "Veuillez entrer votre nombre de participations à un de nos concours.";
    return false;
  }
  const matched = f_nb_part.value.match(regex_part);
  if (matched && matched[0] === f_nb_part.value) {
    user.nb_part = matched[0];
    return true;
  } else {
    nb_part_error.textContent = "Veuillez entrer un nombre de participations entre 0 et 99.";
    return false;
  }
}

function validationVille() {
  
  let villeElt = document.querySelector('input[name="location"]:checked');
  if (!villeElt) {
    ville_error.textContent = "Vous devez choisir la ville dans laquelle vous voulez participer au tournoi.";
    return false;
  } else {
    user.ville = villeElt.value;
    return true;
  }
  
}

function validationConditions() {
  if (!f_conditions.checked) {
    conditions_error.textContent = "Vous devez avoir lu et accepté les conditions générales de participation.";
    return false;
  } else return true;
}

// enregistre si l'utilisateur s'est inscrit aux informations sur les prochains événements
function checkEvents() {
    user.subscription = f_events.checked;
}

function resetForm() {
  f_prenom.value = null;
  f_nom.value = null;
  f_mail.value = null;
  f_date.value = null;
  f_nb_part.value = null;
  let villeElt = document.querySelector('input[name="location"]:checked');
  if (villeElt) villeElt.checked = false;
  f_events.checked = false;
}