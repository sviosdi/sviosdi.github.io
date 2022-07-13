class Card {
    constructor(data, liked = false) {
        this.data = data; // les data propres à l'image/video du .json
        this.liked = liked;
        this.cardHtmlElem = this.mediaFactory()
    }

    getHtmlCard() {
        return this.cardHtmlElem;
    }

    getFocus() {
        this.cardHtmlElem.focus();
    }

    onKeyDown(e) {
        switch (e.key) {
            case 'Enter':           
                openLightbox(this.idx);                
                this.focused = true;
                break;
            case ' ':
                e.preventDefault();
                console.log("marquer le coeurs");
                this.onlikes();
                break;
        }
    }

    mediaFactory() {
        let dirName = photographe.name.split(' ')[0];
        let card = document.createElement("article");
        card.classList.add('md-card');
        let a = document.createElement("a");
        card.setAttribute("tabindex", "0");
        card.addEventListener("keydown", this.onKeyDown.bind(this));
        if (this.data.image) { // image     
            let img = document.createElement("img")
            let imagethumb = this.data.image.split('.')[0] + ".webp";
            img.setAttribute("src", `assets/images/${dirName}/thumbs/${imagethumb}`);
            img.setAttribute("alt", `${this.data.title}, vue agrandie de l'image`);
            a.appendChild(img);
        } else {               // video
            let video = document.createElement("video");
            video.setAttribute("src", `assets/images/${dirName}/${this.data.video}`);
            video.setAttribute("alt", `${this.data.title}, visionnage de la video`);
            video.setAttribute("type", "video/mp4");
            video.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
            video.setAttribute("disablePictureInPicture", "");
            let playBtn = document.createElement("i");
            playBtn.classList.add("playBtn");
            playBtn.classList.add("fa-solid");
            playBtn.classList.add("fa-play");
            a.appendChild(playBtn);
            a.appendChild(video);
        }
        a.addEventListener("click", function () {
            openLightbox(this.idx);
        }.bind(this));
        card.appendChild(a);
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.textContent = this.data.title;
        let rightDiv = document.createElement("div");
        let pLikes = document.createElement("p");
        pLikes.textContent = this.data.likes;
        rightDiv.appendChild(pLikes);
        let i_plein = document.createElement("i");
        i_plein.classList.add("fa-solid");
        i_plein.classList.add("fa-heart");
        i_plein.classList.add("licon");
        i_plein.setAttribute("aria-label", "likes");
        i_plein.addEventListener('click', this.onlikes.bind(this));
        if (this.liked) i_plein.classList.add('liked');
        let i_creux = document.createElement("i");
        i_creux.classList.add("fa-regular");
        i_creux.classList.add("fa-heart");
        rightDiv.appendChild(i_plein);
        rightDiv.appendChild(i_creux);
        div.appendChild(p);
        div.appendChild(rightDiv);
        card.appendChild(div);
        return card;
    }

    onlikes(register = true) {
        if (!this.liked) {
            this.data.likes++;
            this.liked = true;
            photographe.nbLikes++;
        } else {
            this.data.likes--;
            this.liked = false;
            photographe.nbLikes--;
        }
        // il faudrait ici côté serveur :
        //     - incrémenter/décrémenter le nbre de likes de l'image :  data.images.likes = this.data.likes   

        let coeur = this.cardHtmlElem.querySelector(".licon");
        coeur.classList.toggle('liked');
        coeur.parentElement.firstElementChild.textContent = this.data.likes;
        // document.querySelector(".pph-price>div>p").textContent = photographer.nbLikes;
        if (this.liked) {
            userLiked.push({ idp: photographe.id, idm: this.data.id });

        } else {
            let idx = userLiked.findIndex(e => e.idp === photographe.id && e.idm === this.data.id);
            userLiked.splice(idx, 1);
        }
        if (register) localStorage.setItem('userLiked', JSON.stringify(userLiked));
    }
}


