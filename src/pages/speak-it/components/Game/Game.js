import Utils from '../../services/utils';
import SpeechRecognitionService from '../../services/speechRecognition';

import {
  CARDS_ITEMS,
  LEVELS,
  ERRORS_MAX_COUNT,
  WORD_IMG,
  WORD_TRANSLATION,
  DATA_PATH,
  RESTART,
  RETURN,
  RESULTS,
  RESULTS_BTN,
  NEW_GAME,
  ERRORS,
  RESULTS_ERRORS,
  KNOW,
  RESULTS_KNOW,
} from '../../data/constants';

export default class Game {
  constructor() {
    this.level = 1;
    this.round = 1;
    localStorage.isStart = false;
    this.props = {
      errors: ERRORS_MAX_COUNT,
      know: 0,
      errorsArr: [],
      knowArr: [],
    };
    Utils.resetMainCard();
    this.cards = CARDS_ITEMS;
    this.createCardPage();
    LEVELS.forEach(this.onLevelClick, this);
    RESTART.addEventListener('click', this.onRestartBtnClick.bind(this));
    RETURN.addEventListener('click', Utils.onReturnBtnClick);
    NEW_GAME.addEventListener('click', this.onNewGameBtnClick.bind(this));
    RESULTS_BTN.addEventListener('click', this.showResults.bind(this));
    this.recognition = new SpeechRecognitionService(this.props);
  }

  showResults(e) {
    RESULTS.classList.remove('hidden');
    ERRORS.innerText = this.props.errors;
    KNOW.innerText = this.props.know;
    RESULTS_ERRORS.innerHTML = '';
    RESULTS_KNOW.innerHTML = '';
    this.props.errorsArr.forEach((item) => {
      item.classList.remove('activeItem');
      item.addEventListener('click', () => {
        Utils.playAudio(item.getAttribute('data-audio'));
      });
      RESULTS_ERRORS.appendChild(item);
    });
    this.props.knowArr.forEach((item) => {
      item.classList.remove('activeItem');
      item.addEventListener('click', () => {
        Utils.playAudio(item.getAttribute('data-audio'));
      });
      RESULTS_KNOW.appendChild(item);
    });
    e.preventDefault();
  }

  onLevelClick(el, index) {
    el.addEventListener('click', () => {
      this.levelClicked(el, index);
    });
  }

  onRestartBtnClick(e) {
    this.restartGame();
    e.preventDefault();
  }

  onNewGameBtnClick(e) {
    this.restartGame();
    RESULTS.classList.add('hidden');
    e.preventDefault();
  }

  createCardPage() {
    this.props.errorsArr = [];
    this.props.errorsArr.length = 0;
    const wordsData = Utils.getWordsForRound(this.level, this.round);
    wordsData.forEach(this.createCard.bind(this));
    Utils.disableCardClick();
  }

  restartGame() {
    Utils.clearScore();
    Utils.resetCards();
    this.props.errors = ERRORS_MAX_COUNT;
    this.props.know = 0;
    this.clearStatistics();
    const CARDS = document.querySelectorAll('.container .item');
    CARDS.forEach(this.prepareStatisticsContent, this);
    Utils.resetMainCard();
  }

  prepareStatisticsContent(card) {
    const cln = card.cloneNode(true);
    this.props.errorsArr.push(cln);
  }

  clearStatistics() {
    this.props.errorsArr = [];
    this.props.knowArr = [];
    this.props.errorsArr.length = 0;
    this.props.knowArr.length = 0;
  }

  levelClicked(el, index) {
    this.clearStatistics();
    this.restartGame();
    LEVELS.forEach((item) => item.classList.remove('activePoint'));
    el.classList.add('activePoint');
    CARDS_ITEMS.innerHTML = '';
    this.level = index + 1;
    this.round = Math.round(0 - 0.5 + Math.random() * (29 - 0 + 1));
    this.createCardPage();
  }

  createCard(data, index) {
    const CARD = document.createElement('div');
    CARD.classList.add('item');
    CARD.setAttribute('data-audio', `${DATA_PATH}/${data.audio}`);
    CARD.setAttribute('data-img', `${DATA_PATH}/${data.image}`);
    CARD.setAttribute('index', `${index}`);
    CARD.innerHTML = Utils.getCard(data);
    CARD.onclick = () => {
      Utils.cardClicked(CARD);
      Utils.playAudio(CARD.getAttribute('data-audio'));
      WORD_IMG.src = CARD.getAttribute('data-img');
      WORD_TRANSLATION.innerText = data.wordTranslate;
    };
    const cln = CARD.cloneNode(true);
    this.props.errorsArr.push(cln);
    CARDS_ITEMS.appendChild(CARD);
  }
}
