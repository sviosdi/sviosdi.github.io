document.addEventListener('click', e => {
    let elt = e.target.closest('.dropdown')
    if (elt === null) { //click en dehors d'un dropdown
        Dropdown.onpenedDropdowns.forEach(dropdown => {
            if (!dropdown.keepopen) {
                dropdown.close();
            }
        })
    }
})

class Dropdown {
    constructor(idStr) {
        let select = document.getElementById(idStr);
        select.classList.add('closed');
        let first = select.firstElementChild;
        let i = document.createElement("i");
        i.setAttribute("class", "chevron fa-solid fa-chevron-down");
        first.appendChild(i);
        first.classList.add('dropdown-item');
        first.classList.add('first-item');
        first.setAttribute("role", "button");
        first.setAttribute("aria-haspopup", "listbox");
        first.setAttribute("aria-expanded", "false");
        first.setAttribute("tabindex", "0");
        let menu = document.createElement("div");
        menu.setAttribute("role", "menu"); // ou listbox....
        menu.setAttribute("tabindex", "-1");
        menu.setAttribute("aria-labelledby", idStr);
        menu.setAttribute("aria-activedescendant", `${idStr}_1`)

        let downs = select.querySelectorAll("div:not(:first-child)");
        downs.forEach((div, idx) => {
            div.setAttribute("id", `${idStr}_${++idx}`);
            div.setAttribute("role", "menuitem")
            div.classList.add('dropdown-item');
            div.setAttribute('tabindex', '0');
            menu.appendChild(div);
        });
        select.appendChild(menu);
        menu.classList.add("dropdown-menu");
        select.addEventListener("click", this.onclick.bind(this));
        select.addEventListener("keydown", this.onkeydown.bind(this));
        first.addEventListener("focusin", this.onGetFocus.bind(this));
        this.select = select;
        this.firstItem = first;
        this.menu = menu;
        this.chevron = i;
        /* --------- */
        this.keepopen = false; // fermer lors d'un click en dehors du dropdown   
    }

    connectTo(callback) {
        this.select.addEventListener("dropdown-selection", function () {
            callback(this.selected);
        }.bind(this));
    }

    open() {
        this.select.classList.replace('closed', 'opened');
        this.chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
        this.menu.style.display = 'block';
        this.firstItem.setAttribute("aria-expanded", "true");
        Dropdown.onpenedDropdowns.push(this);
        this.focusedItem = -1; // l'index de l'item du menu qui doit prendre le focus; -1 : entête firstItem;
    }

    isOpen() {
        return this.select.classList.contains('opened');
    }

    close() {
        this.select.classList.replace('opened', 'closed');
        this.chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
        this.menu.style.display = 'none';
        this.firstItem.setAttribute("aria-expanded", "false");
        let dropIdx = Dropdown.onpenedDropdowns.findIndex(d => d === this);
        Dropdown.onpenedDropdowns.splice(dropIdx, 1);
    }

    onclick(e) {
        let item = e.target;
        if (item.classList.contains('chevron'))
            item = item.parentElement;
        e.stopPropagation();
        // let value = item.dataset.value;

        if (this.firstItem !== item) {
            // onclick() gère le dropdown. C'est la fonction onchange() qui permet de récupérer la valeur sélectionnée
            // et d'effectuer le traitement personnalisé.
            //  console.log("click dans le menu")
            // console.log(value)
            this.triggerAction(item);
        } else {
            if (!this.isOpen()) {
                this.open();
            } else {
                this.close();
            }
        }
    }

    triggerAction(item) { // émet l'évenement "dropdown-selection" avec en paramètre l'item selectionné ou qui prend le focus)
        this.selected = item.dataset.value;
        let tmp = this.firstItem.firstChild.textContent;
        let tempvalue = this.firstItem.dataset.value;
        this.firstItem.firstChild.textContent = item.textContent;
        this.firstItem.dataset.value = item.dataset.value;
        item.textContent = tmp;
        item.dataset.value = tempvalue;
        this.close();
        const changeEvent = new Event("dropdown-selection");
        this.select.dispatchEvent(changeEvent);
    }

    setFocusOnNextItem() {
        if (this.focusedItem === this.menu.children.length - 1)
            this.focusedItem = 0;
        else this.focusedItem++;
        this.menu.children[this.focusedItem].focus();
    }

    setFocusOnPreviousItem() {
        if (this.focusedItem === 0)
            this.focusedItem = this.menu.children.length - 1;
        else this.focusedItem--;
        this.menu.children[this.focusedItem].focus();
    }

    setFocusOnFirstItem() {
        this.menu.children[0].focus();
        this.focusedItem = 0;
    }

    onkeydown(e) {       
        if (!this.isOpen()) {
            switch (e.key) {
                case ' ':
                case 'Enter':
                case 'ArrowDown':
                    e.preventDefault();
                    this.open();
                    this.focused = true;
                    this.setFocusOnFirstItem();
                    break;
            }
        } else {
            e.preventDefault();
            switch (e.key) {
                case 'ArrowDown':
                    this.setFocusOnNextItem();
                    break;
                case 'ArrowUp':
                    this.setFocusOnPreviousItem();
                    break;
                case 'Enter':
                    this.triggerAction(this.menu.children[this.focusedItem]);
                    this.close();
                    this.firstItem.focus();
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        }
    }

    /*onFocusLost() {
        console.log("focus lost ")
    }*/

    onGetFocus() {

        //console.log("got focus")
    }

    static onpenedDropdowns = [];

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

function onchange(selected) {
    switch (selected) {
        case 'date':
            userCards.sort((e1, e2) => compareDate(e1.data.date, e2.data.date));
            break;
        case 'title':
            userCards.sort((e1, e2) => {
                if (e1.data.title < e2.data.title) return -1;
                if (e1.data.title > e2.data.title) return 1;
                return 0;
            });
            break;
        case 'likes':
            userCards.sort((e1, e2) => e2.data.likes - e1.data.likes);
            break;
        default:
            console.log("oops... pas de tri, media affichés tels que chargés.")
    }

    displayMedia();
}

let select = new Dropdown("tri");
select.connectTo(onchange);


