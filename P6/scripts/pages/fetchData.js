// retourne le tableau des photographes. [{ phgr1 }, { phgr2 } ...]
async function fetchPhotographers() {
        return await fetch("https://raw.githubusercontent.com/sviosdi/sviosdi.github.io/main/P6/data/photographers.json")
            .then(res => res.json())         // res.json() = { photgraphers:[{},{} ...], media: [{},{} ...]}
            .then(res => res.photographers)  // res.photographers = [{ phgr1 }, { phgr2 } ...]
            .catch(err => console.log("erreur lors du chargement de la liste des photographes", err));
}

 

async function fetchData() {
    return await fetch("https://raw.githubusercontent.com/sviosdi/sviosdi.github.io/main/P6/data/photographers.json")
        .then(res => res.json())   // res.json() = { photgraphers:[{},{} ...], media: [{},{} ...]}
        .then(res => res)  
        .catch(err => console.log("erreur lors du chargement de la liste des photographes", err));
}


