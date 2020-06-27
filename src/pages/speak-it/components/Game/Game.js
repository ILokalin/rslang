import { DataController } from 'Service/DataController';
import Utils from '../../services/utils';
import SpeechRecognitionService from '../../services/speechRecognition';
import GameSettings from '../GameSettings';

import {
  CARDS_ITEMS,
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
    this.gameSettings = new GameSettings();
    this.gameSettings.init(this.levelOrRoundSelected.bind(this));
    localStorage.isStart = false;
    this.props = {
      errors: ERRORS_MAX_COUNT,
      know: 0,
      errorsArr: [],
      knowArr: [],
    };
    Utils.resetMainCard();
    this.dataController = new DataController();
    this.dataController.getUser().then(Utils.displayUserName, Utils.displayEmptyUserName);
    this.createCardPage();
    RESTART.addEventListener('click', this.onRestartBtnClick.bind(this));
    RETURN.addEventListener('click', Utils.onReturnBtnClick);
    NEW_GAME.addEventListener('click', this.onNewGameBtnClick.bind(this));
    RESULTS_BTN.addEventListener('click', this.showResults.bind(this));
    this.recognition = new SpeechRecognitionService(this.props);
  }

  showResults(e) {
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
    RESULTS.classList.remove('hidden');
    Utils.goToTop();
    e.preventDefault();
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

  async createCardPage() {
    this.props.errorsArr = [];
    this.props.errorsArr.length = 0;
    const wordsData = await Utils.getWordsForRound(this.dataController);
    await wordsData.forEach(this.createCard.bind(this));
    await Utils.disableCardClick();
    Utils.resetCardMinWidth('0');
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

  levelOrRoundSelected() {
    this.clearStatistics();
    this.restartGame();
    Utils.resetCardMinWidth();
    CARDS_ITEMS.innerHTML = '';
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
