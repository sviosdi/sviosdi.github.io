document.addEventListener('click', e => {  // on clique en dehors d'un dropdown
    if (e.target.closest('.dropdown') === null) {
        closeDropdown();
    }
})


function closeDropdown(keepopen) {
    let drops = document.querySelectorAll('.dropdown');
    drops.forEach(el => {
        if (el !== keepopen && el.matches('.active')) {
            el.classList.remove('active');
            el.querySelector(".dropdown-menu").style.display = 'none';
        }
    })
}


function onclick(e) {
    let target = e.target;
    if (target.classList.contains('chevron'))
        target = target.parentElement;
    e.stopPropagation();
    let value = target.getAttribute('value');
    let select = e.target.closest('.dropdown');
    let first = select.firstElementChild;
    let chevron = first.firstElementChild;
    let menu = select.querySelector(".dropdown>div:last-child");
    if (!select.classList.contains('active')) {
        select.classList.add('active');
        chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
        menu.style.display = 'block';
    } else {
        select.classList.remove('active');
        chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
        menu.style.display = 'none';
    }
    if (first !== target) {
        let tmp = first.firstChild.textContent;
        let tempvalue = first.getAttribute("value");
        first.firstChild.textContent = target.textContent;
        first.setAttribute("value", value);
        target.textContent = tmp;
        target.setAttribute("value", tempvalue);
        const changeEvent = new Event("dropdown-selection");
        changeEvent.selected = value;
        select.dispatchEvent(changeEvent);
    }
}

// onclick() gère le dropdown. C'est la fonction onchange() qui permet de récupérer la valeur sélectionnée
// et d'effectuer le traitement personnalisé.
function createDopdown(idStr) {
    let first = document.querySelector(`#${idStr}>div:first-child`);
    let i = document.createElement("i");
    i.setAttribute("class", "chevron fa-solid fa-chevron-down");
    first.appendChild(i);
    first.classList.add('dropdown-item');
    first.classList.add('first-item');
    let select = document.getElementById(idStr);
    let menu = document.createElement("div");
    let downs = select.querySelectorAll("div:not(:first-child)");
    downs.forEach(div => {
        div.classList.add('dropdown-item');
        menu.appendChild(div);
    });
    select.appendChild(menu);
    menu.classList.add("dropdown-menu");
    select.addEventListener("click", e => onclick(e));
    return select;
}

function compareDate(d1, d2) {
    d1 = d1.split('-');
    d2 = d2.split('-');
    d1 = d1.map(e => parseInt(e));
    d2 = d2.map(e => parseInt(e));

    let years = d1[0] - d2[0];
    if (years != 0) return years;
    let months = d1[1] - d2[1];
    if (months != 0) return months;
    return d1[2] - d2[2];

}

function onchange(e) {
    switch (e.selected) {
        case 'date':
            media.sort((e1, e2) => compareDate(e1.date, e2.date));
            break;
        case 'title':     
            media.sort((e1, e2) => {
                if (e1.title < e2.title) return -1;
                if (e1.title > e2.title) return 1;
                return 0;
            });
            break;
        case 'likes':
            media.sort((e1, e2) => e2.likes - e1.likes);
            break;
        default:
            console.log("oops... pas de tri, media affichés tels que chargés.")
    }
    
    displayMedia(media, photographerName);
}


let select = createDopdown("tri");
select.addEventListener("dropdown-selection", onchange);

