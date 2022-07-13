
let afficher = [];
let img;
let video;
// md-factory 36
// ouvre la lightbox avec pour paramètre la position (index) de la photo cliquée
// dans le conteneur userCards des media.

function getMediaDimensions(w, h) {
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let ih, iw;

    let rs = w / h;  // rapport des dimensions de l'image source
    let rv = vw / vh // rapport des dimensions du viewport
    if (rs > rv) {
        iw = (vw - 94 * 2) - 120;
        let ih1 = (vh - 62 * 2) - 120;
        let ih2 = iw / rs;
        ih = Math.min(ih1, ih2);
        iw = rs * ih;
    } else {
        ih = (vh - 62 * 2) - 120;
        iw = rs * ih;
    }
    return { w: iw, h: ih };
}

function openLightbox(idx) {
    ariaWrapper.setAttribute("aria-hidden", "true");
    let lb = document.querySelector(".lightbox-bg");
    lb.style.display = "flex";
    let lightbox =  document.querySelector(".lightbox");
    // stocke l'index des médias déjà vus
    photographe.vus = new Set();
    photographe.markedForClose = false;
    // index du media courant rattaché au photographe comme paramètre de 
    // l'eventHandler du click sur chevron droit ou gauche
    photographe.idx = idx;
    /* crée une nouvelle image et la dimensionne au chargement */
    if (!img) {
        img = new Image();
        img.addEventListener('load', function (event) {
            let w = img.naturalWidth;
            let h = img.naturalHeight;
            let dim = getMediaDimensions(w, h);
            img.width = dim.w;
            img.height = dim.h;
            // affichage de titre ici, voir explications plus bas 
            let title = document.querySelector(".lb-title>div");
            title.textContent = userCards[event.target.idx].data.title;
            lightbox.style.display = "block";
            lb.focus(); 
        }, false);

    }
    if (!video) {
        video = document.createElement("video");
        video.addEventListener('loadedmetadata', function (event) {
            let w = video.videoWidth;
            let h = video.videoHeight;
            let dim = getMediaDimensions(w, h);
            video.width = dim.w;
            video.height = dim.h;
            let title = document.querySelector(".lb-title>div");
            title.textContent = userCards[event.target.idx].data.title;
            lightbox.style.display = "block";
            lb.focus(); 
        });
    }
    showInLB(idx);

         
}

function closeLightbox() {
    ariaWrapper.setAttribute("aria-hidden", "false");
    let lb = document.querySelector(".lightbox-bg");
    lb.style.display = "none";

}


function showNext() {
    if (photographe.idx < userCards.length - 1) {
        photographe.idx++;
    } else photographe.idx = 0;
    showInLB(photographe.idx)
}


function showPrevious() {
    if (photographe.idx > 0) {
        photographe.idx--;
    } else photographe.idx = userCards.length - 1;
    showInLB(photographe.idx)
}


// affiche la photo d'index idx, ferme la lightbox si toutes les photos 
// ont déjà été vues.
function showInLB(idx) {
    let media = userCards[idx];
    let content = document.querySelector('.lb-content');
    let dirName = photographe.name.split(' ')[0];
    let current = content.firstElementChild;
    if (media.data.image) { //image
        img.src = `assets/images/${dirName}/${media.data.image}`;
        // pour récupérer l'index de l'image dans l'événement "load"
        // car l'affichage du titre ne se fait qu'une fois que l'image est chargée
        // pour éviter le décalage désagréable
        img.idx = idx;
        if (current && current.tagName === "VIDEO") {
            video = content.removeChild(current);
            content.appendChild(img);
        } else {
            if (!current) {
                content.appendChild(img);
            }
        }
    } else { // video
        video.setAttribute("src", `assets/images/${dirName}/${media.data.video}`);
        video.setAttribute("type", "video/mp4");
        video.setAttribute("controls", "");
        video.setAttribute("autoplay", "true");
        video.setAttribute("controlslist", "nodownload noremoteplayback");
        video.setAttribute("disablePictureInPicture", "");
        video.idx = idx;
        if (current && current.tagName === "IMG") {
            img = content.removeChild(current);
            content.appendChild(video);
        } else {
            if (!current) {
                content.appendChild(video);
            }
        }
    }

    if (photographe.markedForClose) {
        closeLightbox();
        userCards[photographe.idx].getFocus();
    }
    photographe.vus.add(idx);
    if (photographe.vus.size === userCards.length)
        photographe.markedForClose = true;

}

function onLbKeydown(e) {
    e.preventDefault();
    let closeBtn = document.querySelector(".lb-right .fa-xmark");
    let lightbox = document.querySelector(".lightbox-bg");  
    switch (e.key) {
        case 'ArrowRight':
            showNext();
            break;
        case 'ArrowLeft':
            showPrevious();
            break;
        case 'Enter':
            if (document.activeElement === closeBtn) {
                closeLightbox();
                userCards[photographe.idx].getFocus();
            } else closeBtn.focus();
            break;
        case 'Escape':
            lightbox.focus();
            break;
        case 'Tab':
            closeBtn.focus();
            break;

    }
}

