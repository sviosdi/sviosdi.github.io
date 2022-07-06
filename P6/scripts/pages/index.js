function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {        
        photographersSection.appendChild(photographerFactory(photographer).getUserCardDOM());
    });
};


async function init() {
    // Récupère les datas des photographes et les affiche
    let photographers = await fetchPhotographers();
    displayData(photographers);
    // console.log(await getAllMedias());
};

init();

// retourne le tableau des medias. [{ md1 }, { md2 } ...]
/*async function getAllMedias() {

    const allMedia = await fetch("../../data/photographers.json")
        .then(res => res.json()) // res.json() = { photgraphers:[{},{} ...], media: [{},{} ...]}
        .then(res => res.media) // res.media = [{ md1 }, { md2 } ...]
        .catch(err => console.log("erreur lors du chargement de la liste des photographes", err));

    return allMedia;

}*/



