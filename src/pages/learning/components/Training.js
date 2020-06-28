/* eslint-disable class-methods-use-this */
import Card from './Card';
import { mySwiper, settings, dataController } from './constants';
import 'materialize-css';
import { updateMaterialComponents, setProgressbarToCurrentPosition, getApproprateWords, } from './helpers';

export default class Training {
  constructor(newWordsAmountPerDay, maxWordsPerDay) {
    console.log(newWordsAmountPerDay, maxWordsPerDay)
    this.shortTermStat = {
      date: new Date(),
      totalCards: 0,
      wrightAnswers: 0,
      newWords:0,
      chain: 0,
      longestChain:0,
    }

    getApproprateWords(newWordsAmountPerDay, maxWordsPerDay).then((res)=> {
      this.words = res;
      console.log(this.words);
      this.start();
    })
    /*const newWordsQuery = {
        group:0,
        page:5,
        wordsPerExampleSentenceLTE: '',
        wordsPerPage: newWordsAmountPerDay,
      };
    // TODO query 
   if (settings.justNewWords) {
      dataController.getWords(newWordsQuery).then(
        (wordsArray) => {
          console.log(wordsArray);
          this.words = wordsArray;
          this.start();
        },
        (rejectReport) => {
          console.log(rejectReport);
        }
      );
   } else {
      // TODO get user words and new words
      dataController.getWords(newWordsQuery).then(
        (wordsArray) => {
          console.log(wordsArray);
          this.words = wordsArray;
          this.start();
        },
        (rejectReport) => {
          console.log(rejectReport);
        }
      );
    }
    dataController.userWordsGetAll(['hard', 'onlearn','deleted']).then(
    (response) => {console.log('training ', response)},
    (rejectReport) => {console.log(rejectReport)}
  )*/
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
    const currentForm = mySwiper.slides[mySwiper.activeIndex].querySelector('.form');
    const currentInput = currentForm.querySelector('.input_text');

    mySwiper.allowSlideNext = false;
    mySwiper.navigation.nextEl.classList.add('swiper-button-disabled');
    setProgressbarToCurrentPosition();    
    currentInput.focus();
  }

  stop() {
    mySwiper.destroy(false, true);
  }

  updateStat() {
    if (this.shortTermStat.longestChain <  this.shortTermStat.chain) {
      this.shortTermStat.longestChain = this.shortTermStat.chain;
    }
    
    document.querySelector('.statistics__new-words-num').innerText = this.shortTermStat.newWords;
    document.querySelector('.statistics__correct-answers').innerText = `${Math.round(this.shortTermStat.wrightAnswers/this.shortTermStat.totalCards*100)}%`;
    document.querySelector('.statistics__total-cards').innerText = this.shortTermStat.totalCards;
    document.querySelector('.statistics__correct-in-row').innerText = this.shortTermStat.longestChain;
    localStorage.setItem('stat', JSON.stringify(this.shortTermStat));
    console.log(this.shortTermStat);
  }
}
