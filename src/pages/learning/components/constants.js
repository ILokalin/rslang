import Swiper from 'swiper';
import { ElementGen } from 'Src/service/DomGen/DomGen';
import { DataController } from 'Service/DataController/DataController';
import { setProgressbarToCurrentPosition } from './helpers';
import 'materialize-css';

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
    // prevEl: '.swiper-button-prev',
  },
  a11y: {
    prevSlideMessage: 'Previous card',
    nextSlideMessage: 'Next card',
  },
  on: {
    slideChange() {
      this.train.playNextCard();
      setProgressbarToCurrentPosition();
    },
  },
});
mySwiper.allowTouchMove = false;
const wordContentUrl = 'https://raw.githubusercontent.com/jules0802/rslang-data/master/';
const progressBar = document.querySelector('.progress');
const settings = JSON.parse(localStorage.getItem('settings'));
const dataController = new DataController();

export { mySwiper, wordContentUrl, progressBar, settings, dataController };
