function mediaFactory(data) {

    function getMediaCardDOM(photographerName) {
        let dirName = photographerName.split(' ')[0];
        let card = document.createElement("article");
        card.classList.add('md-card');
        let a = document.createElement("a");
        if (data.image) { // image     
            let img = document.createElement("img")
            let imagethumb = data.image.split('.')[0] + ".webp";
            img.setAttribute("src", `assets/images/${dirName}/thumbs/${imagethumb}`);
            a.appendChild(img);
        } else {         // video
            let video = document.createElement("video");            
            video.setAttribute("src", `assets/images/${dirName}/${data.video}`);
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
        
        card.appendChild(a);
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.textContent = data.title;
        let rightDiv = document.createElement("div");
        let pLikes = document.createElement("p");
        pLikes.textContent = data.likes;
        rightDiv.appendChild(pLikes);
        let i_plein = document.createElement("i");
        i_plein.classList.add("fa-solid");
        i_plein.classList.add("fa-heart");
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

    return { "getMediaCardDOM": getMediaCardDOM }

}