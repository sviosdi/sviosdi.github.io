let oldw = 0, oldh = 0;


function resize() {
    let medias = document.querySelectorAll(".md-card>a");
    medias.forEach(m => {
        let brect = m.getBoundingClientRect();
        m.style.height = brect.width + "px";

    });
}

window.onresize = resize;

function displayMedia() {
    const mediaSection = document.querySelector(".pph-media");
    mediaSection.innerHTML = "";
    userCards.forEach((card, idx) => {
        mediaSection.appendChild(card.getHtmlCard());
        card.idx = idx;
    });

};

// les média du photographe en variable globale pour ne pas avoir à les recharger
// à chaque changement de tri.
//let media = [];         // les media du photographe tirées telles quelles du .json au chargement de la page.
let photographe = {};         // le photographe courant
let userCards = [];           // l'utilisateur courant - retient les cards avec leurs likes. 
let userLiked = JSON.parse(localStorage.getItem('userLiked'));// [{ idp: 195, idm: 3523523534 }, { idp: 930, idm: 952343423 }];  // mettre en webstorage
if (!userLiked) userLiked = [];


async function init() {
    // Récupère l'id du photographe dans les paramètres de la requête http
    let params = (new URL(document.location)).searchParams;
    let idInt = Number.parseInt(params.get('id')); // l'id. du photographe.

    // Récupère les datas du .json
    let data = await fetchData();
    // Retourne les data du photographe dont l'id dans le json correspond à celui de la requête
    photographe = new Photographe(data.photographers.find(el => el.id === idInt));
    photographe.displayPhotographeHeader();
    // Récupère parmi les media ceux qui ce rapporte au photographe courant
    // En profite pour calculer la somme des likes sur ses media
    let nblikes = 0;
    let media = data.media.filter(m => {
        if (m.photographerId === idInt) {
            nblikes += m.likes;
            return true;
        } else return false;
    });
    photographe.nbLikes = nblikes;

    // tenir compte du filtre de tri ici par défaut : par popularité
    media.sort((e1, e2) => e2.likes - e1.likes);
    let userLikedFromPhotograph = userLiked.filter(v => v.idp === photographe.id);
    if (userLikedFromPhotograph.length != 0) {
        photographe.nbLikes += userLikedFromPhotograph.length;
    }

    media.forEach((md) => {
        let card = new Card(md, (userLikedFromPhotograph.find(v => v.idm === md.id) !== undefined));
        userCards.push(card);
    });
    displayMedia();

    let rightChevron = document.querySelector(".lb-right .fa-chevron-right");
    let leftChevron = document.querySelector(".lb-left .fa-chevron-left");
    let closeBtn = document.querySelector(".lb-right .fa-xmark");
    let lightbox = document.querySelector(".lightbox-bg");

    closeBtn.setAttribute("tabindex", "0");
    rightChevron.addEventListener("click", showNext);

    leftChevron.addEventListener("click", showPrevious);

    window.dispatchEvent(new Event('resize'));
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.setAttribute("tabindex", "0");
    lightbox.addEventListener("keydown", onLbKeydown);

};

init();





