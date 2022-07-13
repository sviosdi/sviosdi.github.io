// Représente un photographe construit à partir de data = { name: .., id: ... } du photographe
// obtenu du json.
class Photographe {
    constructor(data) {
        for (let prop in data)
            this[prop] = data[prop];
        /* extension .jpg du json transformée en .webp dans l'adresse de la photo de profil du photographe */
        this.portrait = this.portrait.split('.')[0] + ".webp";
        
    }

    static first = true;

    set nbLikes(nb) {
        document.querySelector('.pph-price>div>p').textContent = nb;
        this._nbLikes = nb;
    }

    get nbLikes() {
        return this._nbLikes;
    }

    /* Crée le html de la card photographe de la page d'accueil et le complète  */
    /* à partir des données 'data' du photographe                               */
    /* Retourne l'élément html article englobant cette card.                    */
    getCardDOM() {
        let article = document.createElement('article');
        let a = document.createElement("a");
        a.setAttribute("href", `./photographer.html?id=${this.id}`);
        if (Photographe.first)
            a.setAttribute("tabindex", "0");
        else Photographe.   first = false;
        let img = document.createElement("img");
        img.setAttribute("src", `assets/photographers/${this.portrait}`);
        img.setAttribute("alt", `Photo portrait du photographe ${this.name}`);
        let h2 = document.createElement("h2");
        h2.textContent = this.name;
        let p_location = document.createElement("p");
        p_location.textContent = `${this.city}, ${this.country}`;
        p_location.classList.add('ph-location');
        let p_tagline = document.createElement("p");
        p_tagline.textContent = this.tagline;
        p_tagline.classList.add('ph-tagline');
        let p_price = document.createElement("p");
        p_price.classList.add('ph-price');
        p_price.textContent = `${this.price}€/jour`;
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);
        article.appendChild(p_location);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return article;
    }

    /* Complète de html de la page photographer.html à partir des données 'data' du photographe  */
    displayPhotographeHeader() {
        /* Header du photographe */
        const img = document.querySelector(".photograph-header>img");
        const phName = document.querySelector(".pph-name");
        const phLocation = document.querySelector(".pph-location");
        const phTagline = document.querySelector(".pph-tagline");
        phName.textContent = this.name;
        phLocation.textContent = `${this.city}, ${this.country}`;
        phTagline.textContent = this.tagline;
        img.setAttribute("src", `assets/photographers/${this.portrait}`);
        img.setAttribute("alt", `Photo portrait du photographe ${this.name}`);
        let pphPricePerDay = document.querySelector('.pph-price-fixed');
        pphPricePerDay.textContent = `${this.price}€/jour`;
        
        /* Formulaire de contact*/
        let modalName = document.querySelector('.modal-name');
        modalName.textContent = this.name;
        modal.setAttribute("aria-labeledby", this.name);
        modal.setAttribute("aria-label", `Formulaire pour envoyer un message à ${ this.name }`);
        document.querySelector('.modal>header>div>h2').setAttribute("id", this.name);
        let form = document.querySelector("#contact_modal form");
        form.setAttribute("action", `javascript:send({"name":"${this.name}", "id":${this.id}})`);
    }

}






