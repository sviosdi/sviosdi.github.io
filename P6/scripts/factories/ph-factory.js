function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

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

    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }
}





