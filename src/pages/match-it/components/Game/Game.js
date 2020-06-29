import { DataController } from 'Service/DataController';
import Utils from '../../services/utils';
import { dataTransfer } from '../../services/dataTransferService';
import GameSettings from '../GameSettings';

import {
  allCards,
  allWords,
  ERRORS_MAX_COUNT,
  RESULTS,
  ERRORS,
  RESULTS_ERRORS,
  KNOW,
  RESULTS_KNOW,
  roundLabel,
  userWords,
} from '../../data/constants';

export default class Game {
  constructor() {
    localStorage.isStart = false;
    this.props = {
      errors: ERRORS_MAX_COUNT,
      know: 0,
      errorsArr: [],
      knowArr: [],
    };
    this.dataController = new DataController();
  }

  start() {
    this.dataController.getUser().then(
      (settings) => {
        Utils.displayUserName(settings);
        this.authorized = true;
        this.init();
      },
      (report) => {
        Utils.displayEmptyUserName(report);
        this.init();
      },
    );
  }

  init() {
    this.gameSettings = new GameSettings();
    this.gameSettings.init(this.levelOrRoundSelected.bind(this));
    this.createCardPage();
    //RESTART.addEventListener('click', this.onRestartBtnClick.bind(this));
    //RETURN.addEventListener('click', Utils.onReturnBtnClick);
    //NEW_GAME.addEventListener('click', this.onNewGameBtnClick.bind(this));
    //.addEventListener('click', this.showResults.bind(this));
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

  onCheckBtnClick(e) {
    this.restartGame();
    e.preventDefault();
  }

  onNextBtnClick(e) {
    this.restartGame();
    RESULTS.classList.add('hidden');
    e.preventDefault();
  }

  async createCardPage() {
    this.props.errorsArr = [];
    this.props.errorsArr.length = 0;
    let wordsData;
    if (userWords.checked && this.authorized) {
      wordsData = await Utils.getUserWordsForRound(this.dataController);
    }
    if (!wordsData || (wordsData[0].totalCount[0].count || 0) < ERRORS_MAX_COUNT) {
      wordsData = await Utils.getWordsForRound(this.dataController);
      userWords.checked = false;
    }
    GameSettings.displayRound();
    await wordsData.forEach(this.createCard.bind(this));
    const words = [];
    wordsData.forEach((data) => {
      words.push(data.word);
    });
    words.forEach(this.createWordCard);
    dataTransfer();
    //await Utils.disableCardClick();
    //Utils.resetCardMinWidth('0');
  }

  restartGame() {
    /* Utils.clearScore();
    Utils.resetCards();
    this.props.errors = ERRORS_MAX_COUNT;
    this.props.know = 0;
    this.clearStatistics();
    const CARDS = document.querySelectorAll('.container .item');
    CARDS.forEach(this.prepareStatisticsContent, this);
    Utils.resetMainCard();*/
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
    allCards.innerHTML = '';
    allWords.innerHTML = '';
    this.createCardPage();
    /*this.clearStatistics();
    this.restartGame();
    Utils.resetCardMinWidth();
    CARDS_ITEMS.innerHTML = '';
    this.createCardPage();*/
  }

  async createCard(data, index) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col', 's12', 'm6', 'center-align');
    const CARD = document.createElement('div');
    CARD.id = `card-${data.id}`;
    CARD.classList.add('card', 'draggable');
    const image = await this.dataController.getMaterials(data.image);
    CARD.innerHTML = Utils.getCard(data.id, data.word, image);
    cardWrapper.append(CARD);
    const cln = CARD.cloneNode(true);
    this.props.errorsArr.push(cln);
    allCards.appendChild(cardWrapper);
  }

  createWordCard(word) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col', 's12', 'm6', 'center-align');
    const CARD = document.createElement('div');
    CARD.classList.add('card', 'droptarget');
    CARD.innerHTML = Utils.getWordCard(word);
    cardWrapper.append(CARD);
    // const cln = CARD.cloneNode(true);
    //this.props.errorsArr.push(cln);
    allWords.appendChild(cardWrapper);
  }
}
