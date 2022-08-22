import {UI_ELEMENTS} from "./view";

UI_ELEMENTS.SWIPER_BUTTON_RIGHT.addEventListener('click', () => {
  const elem = UI_ELEMENTS.SWIPER_WRAPPER.querySelectorAll('.swiper-slide')
  UI_ELEMENTS.SWIPER_WRAPPER.removeChild(elem[0])
  UI_ELEMENTS.SWIPER_WRAPPER.appendChild(elem[0])
})

UI_ELEMENTS.SWIPER_BUTTON_LEFT.addEventListener('click', () => {
  const elem = UI_ELEMENTS.SWIPER_WRAPPER.querySelectorAll('.swiper-slide')
  UI_ELEMENTS.SWIPER_WRAPPER.removeChild(elem[4])
  UI_ELEMENTS.SWIPER_WRAPPER.insertBefore(elem[4], elem[0])
})