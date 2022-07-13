function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {      
        let photographe = new Photographe(photographer);
        photographersSection.appendChild(photographe.getCardDOM());
    });
};


async function init() {
    // Récupère les datas des photographes et les affiche
    let photographers = await fetchPhotographers();
    displayData(photographers);
};

init();
