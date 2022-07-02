let params = (new URL(document.location)).searchParams;
let id = Number.parseInt(params.get('id')) ; // l'id. du photographe.
console.log(`id=${id}`)

async function init() {
    // Récupère les datas
    let data = await fetchData();    
    let ph = data.photographers.find( el => el.id === id);
    console.log(ph);
    let media = data.media.filter(el => el.photographerId === id);
    console.log(media);
};

init();