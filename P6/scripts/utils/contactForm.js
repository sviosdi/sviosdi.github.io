const ariaWrapper = document.getElementById("aria-wrapper");
const modal = document.getElementById("contact_modal");

function displayModal() {
    ariaWrapper.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
    const mod = document.querySelector(".modal");
    mod.style.display = "block";
    mod.style.animationName = "modalopen";
   
}

function closeModal() {
    ariaWrapper.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    const feedback = document.querySelector(".feedback"); 
    const mod = document.querySelector(".modal");
    mod.style.animationName = "modalclose";
    mod.style.animationDuration = "400ms";
    mod.style.animationFillMode = "forwards";
    setTimeout(() => {        
        modal.style.display = "none";
        mod.style.display = "none"; // 'disparition' du formulaire
        feedback.style.display = "none"; // 'disparition' du feedback
      },
        500);
}

// Récupère les données du formulaire de contact et les "envoie" (simulation) au serveur.
// Affiche la fenêtre de feedback de remerciements.
function send(photographer) {   
    let nom = document.getElementById('nom').value.trim();
    let prenom = document.getElementById('prenom').value.trim();
    let mail = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let user = { nom: nom, prenom: prenom, mail: mail, message: message };
    console.log(user);
    console.log(photographer.name);
    console.log(photographer.id);

    let feedback = document.querySelector('.feedback');
    feedback.style.display = "flex";

    let msg = document.querySelector(".feedback-msg");
    msg.innerHTML = `Votre message a bien été envoyé à  ${photographer.name}.<br>Vous aurez une réponse très prochainement de sa part.<br>
    Merci ${prenom} pour l'intérêt que vous portez à son travail. `

}