function photographerFactory(data) {
    let { name, id, city, country, tagline, price, portrait } = data;

    portrait = portrait.split('.')[0] + ".webp";

    function getUserCardDOM() {
        article = document.createElement('article');       
        let a = document.createElement("a");
        a.setAttribute("href", `./photographer.html?id=${id}`);
        let img = document.createElement("img");
        img.setAttribute("src", `assets/photographers/${portrait}`);
        let h2 = document.createElement("h2");
        h2.textContent = name;
        let p_location = document.createElement("p");
        p_location.textContent = `${city}, ${country}`;
        p_location.classList.add('ph-location');
        let p_tagline = document.createElement("p");
        p_tagline.textContent = tagline;
        p_tagline.classList.add('ph-tagline');
        let p_price = document.createElement("p");
        p_price.classList.add('ph-price');
        p_price.textContent = `${price}€/jour`;
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);
        article.appendChild(p_location);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return article;
    }

    function getPhotographPageData() {
        const img = document.querySelector(".photograph-header>img");
        const phName = document.querySelector(".pph-name");
        const phLocation = document.querySelector(".pph-location");
        const phTagline = document.querySelector(".pph-tagline");
        phName.textContent = name;
        phLocation.textContent = `${city}, ${country}`;
        phTagline.textContent = tagline;
        img.setAttribute("src", `assets/photographers/${portrait}`);

        let pphPrice = document.querySelector('.pph-price>div>p');
        pphPrice.textContent = "584"; // provisoire - adapter avec la somme des likes des media du photographe
        let pphPricePerDay = document.querySelector('.pph-price-fixed');
        pphPricePerDay.textContent = `${price}€/jour`; 

        let modalName = document.querySelector('.modal-name');
        modalName.textContent = name;

        let form = document.querySelector("#contact_modal form");
        form.setAttribute("action", `javascript:send({"name":"${name}", "id":${id}})`);
    }

    return { "getUserCardDOM": getUserCardDOM, "getPhotographPageData": getPhotographPageData }
}





