import {UI_ELEMENTS} from "./view";

UI_ELEMENTS.MOBILE_MENU.addEventListener('click', openMenu)

UI_ELEMENTS.MENU_LIST.addEventListener('click', closeMenu)

function openMenu() {
  UI_ELEMENTS.MENU_LIST.classList.toggle('mobile-active')
  UI_ELEMENTS.BODY.classList.toggle('stop-scroll')
}

function closeMenu(event) {
  if (event.target.className === 'nav-menu__link') {
    UI_ELEMENTS.MENU_LIST.classList.remove('mobile-active')
    UI_ELEMENTS.BODY.classList.remove('stop-scroll')
  }
}