// à remplacer par l'adresse de publication du site https://eralit.github.io ou https://eralyt.com
//const root = "/media/vincent/common data/OpenClassRooms/Projet_02/soutenance/presentation";
//const root = "http://localhost:3000/P2-0"
//const root = "https://eralyt.github.io";
const root = "https://sviosdi.github.io";

const hlogo = document.querySelector('.hlogo');
const svg = document.querySelector('.logoe');
const a = document.createElement("a");
a.setAttribute("href", root + "/index.html");
a.appendChild(svg);
hlogo.appendChild(a);


// synchronisation scrolling

let lastSelected = null;
let topics = document.querySelector(".tw1").children[1].querySelectorAll("li");
let paragraphes = document.querySelector(".sections").querySelectorAll("section");
let startTop = document.querySelector('.sections').offsetTop;
if (paragraphes.length != 0)
    document.querySelector('.cw1').style.marginBottom = window.innerHeight - paragraphes[paragraphes.length - 1].clientHeight - 55 + "px";

window.addEventListener('scroll', () => {
    let current = "";
    let last = null;
    let i = 0;
    for (i = 0; i < paragraphes.length; ++i) {
        let section = paragraphes[i];
        const sectionTop = section.offsetTop;
        if (scrollY < sectionTop + startTop) {
            break;
        }
    }
    // i - 1 : index du paragraphe courant
    if (i > 0) {
        let current = topics[i - 1].firstElementChild;
        if (!current.classList.contains('active')) {
            if (lastSelected) lastSelected.classList.remove('active');
            current.classList.add('active');
            lastSelected = current;
        }
    } else {
        if (lastSelected) lastSelected.classList.remove('active');
    }
})

// menu global de navigation

const nav = document.querySelector('.nw1-content');
const navProjItems = [
    { name: "Projet 2 ", link: "/P2/index.html", childs: null, ext: true },
    { name: "Projet 3 ", link: "/P3/index.html", childs: null, ext: true },
    { name: "Projet 4 ", link: "/P4/index.html", childs: null, ext: true }
];



function createNavigation(items) {
    let menu = document.createElement("div");
    menu.classList.add("menu-items");
    items.forEach(item => {
        let a = document.createElement("a");
        a.setAttribute("href", root +  item.link);
        a.textContent = item.name;
        if(item.ext) a.setAttribute("target", "_blank");  
        menu.appendChild(a);
    })
    nav.appendChild(menu);
}

function addSeparator(name) {
    let sep = document.createElement("div");
    sep.classList.add('separator');
    sep.textContent = name;
    nav.appendChild(sep);
}

function createMainMenu() {
    addSeparator("Technologies WEB");
    createNavigation(navWebItems);
    addSeparator("Programmation");
    createNavigation(navProgItems);
    addSeparator("Sur GitHub");
    createNavigation(navGithub);
    addSeparator("Divers");
    createNavigation(navDivers);
}

let pagehref = window.location.href.split('/');
let page = pagehref[pagehref.length - 1];

addSeparator("Ensemble des projets");
createNavigation(navProjItems);
