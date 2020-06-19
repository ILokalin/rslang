import './index.scss';
import 'materialize-css';
import Swiper from 'swiper';

const swiper = new Swiper('.swiper-container', {
  pagination: {
    slidesPerView: 1,
    spaceBetween: 50,
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});