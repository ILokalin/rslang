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
    LEVELS.forEach((el, index) => {
      el.addEventListener('click', () => {
        this.levelClicked(el, index);
      });
    });
    RESTART.addEventListener('click', this.onRestartBtnClick.bind(this));
    RETURN.addEventListener('click', this.onReturnBtnClick.bind(this));
    NEW_GAME.addEventListener('click', this.onNewGameBtnClick.bind(this));
    RESULTS_BTN.addEventListener('click', this.showResults.bind(this));
    this.recognition = new SpeechRecognitionService(this.props);
  }

  showResults(evt) {
    RESULTS.classList.remove('hidden');
    evt.preventDefault();
  }

  onRestartBtnClick(evt) {
    this.restartGame();
    evt.preventDefault();
  }

  onReturnBtnClick(evt) {
    RESULTS.classList.add('hidden');
    evt.preventDefault();
  }

  onNewGameBtnClick(evt) {
    this.restartGame();
    RESULTS.classList.add('hidden');
    evt.preventDefault();
  }

  createCardPage() {
    const wordsData = Utils.getWordsForRound(this.level, this.round);
    wordsData.forEach((item, index) => { this.createCard(item, index); }, this);
    Utils.disableCardClick();
  }

  restartGame() {
    Utils.resetCards();
    this.props.errors = ERRORS_MAX_COUNT;
    this.props.know = 0;
    this.props.errorsArr = [];
    this.props.knowArr = [];
    const CARDS = document.querySelectorAll('.item');
    CARDS.forEach(this.prepareStatisticsContent, this);
    Utils.resetMainCard();
  }

  prepareStatisticsContent(card) {
    const cln = card.cloneNode(true);
    this.props.errorsArr.push(cln);
  }

  levelClicked(el, index) {
    this.props.errorsArr = [];
    this.props.knowArr = [];
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
