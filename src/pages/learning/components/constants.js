import Swiper from 'swiper';
import {ElementGen} from 'Src/service/DomGen/DomGen';

const mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  centeredSlides: true,
  watchSlidesProgress: true,
  effect: 'fade',
  pagination: { 
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
   a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
});

const wordContentUrl = 'https://raw.githubusercontent.com/jules0802/rslang-data/master/'
const divider = ElementGen('div', 'divider', null);


export {mySwiper, divider}