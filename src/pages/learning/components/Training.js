/* eslint-disable class-methods-use-this */
import 'materialize-css';
import moment from 'moment';
import Card from './Card';
import { mySwiper, settings, dataController, preloaderController } from './constants';
import {
  updateMaterialComponents,
  setProgressbarToCurrentPosition,
  getApproprateWords,
  saveTrainingStatistics,
} from './helpers';

export default class Training {
  constructor(newWordsAmountPerDay, maxWordsPerDay, shortTermStat) {
    this.shortTermStat = shortTermStat || {
      date: moment().format('DD-MMM-YYYY'),
      totalCards: 0,
      wrightAnswers: 0,
      newWords: 0,
      chain: 0,
      longestChain: 0,
    };
    settings.lastTrain = this.shortTermStat.date;
    dataController.setUserOptions({ settings });

    getApproprateWords(newWordsAmountPerDay, maxWordsPerDay).then((res) => {
      this.words = res;
      preloaderController.hidePreloader();
      this.start();
    });

    window.addEventListener('beforeunload', saveTrainingStatistics);
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
    const rightAnswersPersent = Math.round(
      (this.shortTermStat.wrightAnswers / this.shortTermStat.totalCards) * 100,
    );
    if (this.shortTermStat.longestChain < this.shortTermStat.chain) {
      this.shortTermStat.longestChain = this.shortTermStat.chain;
    }
    document.querySelector('.statistics__new-words-num').innerText = this.shortTermStat.newWords;
    // eslint-disable-next-line no-restricted-globals
    document.querySelector('.statistics__correct-answers').innerText = isNaN(rightAnswersPersent)
      ? '0%'
      : `${rightAnswersPersent}%`;
    document.querySelector('.statistics__total-cards').innerText = this.shortTermStat.totalCards;
    document.querySelector(
      '.statistics__correct-in-row',
    ).innerText = this.shortTermStat.longestChain;
  }

  continueTraining() {
    getApproprateWords(5, 10).then((res) => {
      res.forEach((word) => {
        const card = new Card(word);
        mySwiper.appendSlide(card.cardElem);
      });
      mySwiper.update();
      updateMaterialComponents();
      mySwiper.allowSlideNext = true;
      mySwiper.slideNext();
      this.playNextCard();
    });
  }
}
