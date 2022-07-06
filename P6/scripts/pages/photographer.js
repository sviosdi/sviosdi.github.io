function displayMedia(media, photographerName) {
    const mediaSection = document.querySelector(".pph-media");
    mediaSection.innerHTML = "";
    media.forEach((md) => {        
        mediaSection.appendChild(mediaFactory(md).getMediaCardDOM(photographerName));
    });
};

// les média du photographe en variable globale pour ne pas avoir à les recharger
// à chaque changement de tri.
let media = [];
let photographerName = "";

async function init() {
     
    let params = (new URL(document.location)).searchParams;
    let idInt = Number.parseInt(params.get('id')); // l'id. du photographe.

    // Récupère les datas
    let data = await fetchData();
    let photographer = data.photographers.find(el => el.id === idInt);
    photographerName = photographer.name;
    photographerFactory(photographer).getPhotographPageData();
    media = data.media.filter(el => el.photographerId === idInt);
    // tenir compte du filtre de tri ici par défaut : par popularité
    media.sort((e1, e2) => e2.likes - e1.likes);
    // le nom du photographe en paramètre est nécessaire pour trouver le répertoire dans
    // lequel se trouvent ses média.
    displayMedia(media, photographerName);

};

init();





