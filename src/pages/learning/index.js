import './index.scss';
import 'materialize-css';
import Swiper from 'swiper';

M.AutoInit();

const swiper = new Swiper('.swiper-container', {
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

const options = {
  edge: 'right',
}

var sideNav = M.Sidenav.init(document.querySelector('.sidenav'), options);