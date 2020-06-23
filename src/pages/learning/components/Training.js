import { apiGetWords } from 'Service/ServerAPI/SereverAPI.js';
import Card from './Card';
import {mySwiper, settings} from './constants';
import 'materialize-css';
import { updateMaterialComponents, setProgressbarToCurrentPosition, formHandler } from './helpers';

export default class Training {
  constructor(newWordsAmountPerDay, maxWordsPerDay) {
    this.date = new Date();
    this.newWordsAmountPerDay = newWordsAmountPerDay;
    this.maxWordsPerDay = maxWordsPerDay;
    // TODO ServerAPI
    const wordsQuery = {
      group:0,
      page:1,      
    }
    apiGetWords(wordsQuery).then(
    (wordsArray) => {
      console.log(wordsArray);
      this.words = wordsArray.slice(0, 3);
      this.start();
      },
    (rejectReport) => {console.log(rejectReport)}
  )
  }

  start() {
    if (this.words.length) {
      this.words.forEach((word) => {
        const card = new Card(word);
        mySwiper.appendSlide(card.cardElem);
      });
      mySwiper.update();
      updateMaterialComponents();
      this.playNextCard();
    }
    
  }

  playNextCard() {
    mySwiper.allowSlideNext = false;
    mySwiper.navigation.nextEl.classList.add('swiper-button-disabled');
    setProgressbarToCurrentPosition();
    const currentForm =  mySwiper.slides[mySwiper.activeIndex].querySelector('.form');
    const currentInput =  currentForm.querySelector('.input_text');
    currentInput.focus();    
    currentForm.addEventListener('submit', formHandler);
    console.log(settings);
  }

  stop() {
    mySwiper.destroy(false, true);    
  }
}