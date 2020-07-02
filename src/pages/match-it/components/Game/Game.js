import { DataController } from 'Service/DataController';
import Utils from '../../services/utils';
import { dataTransfer } from '../../services/dataTransferService';
import GameSettings from '../GameSettings';

import {
  allCards,
  allWords,
  ERRORS_MAX_COUNT,
  scoreLabel,
  userWords,
  nextBtn,
  checkBtn,
  restartBtn,
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
    this.gameSettings.init(this.optionSelected.bind(this));
    this.createCardPage();
    restartBtn.addEventListener('click', this.onRestartBtnClick.bind(this));
    nextBtn.addEventListener('click', this.onNextBtnClick.bind(this));
    checkBtn.addEventListener('click', this.showResults.bind(this));
  }

  showResults(e) {
    Utils.disableCardsTransfer();
    checkBtn.classList.add('activeBtn');
    scoreLabel.children[0].innerHTML = this.props.know;
    Utils.displayResults();
    scoreLabel.classList.remove('hidden');
    e.preventDefault();
  }

  onRestartBtnClick(e) {
    this.restartGame();
    e.preventDefault();
  }

  onNextBtnClick(e) {
    Utils.goToNextRound();
    this.restartGame();
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
    Utils.setCurrentRound(GameSettings.displayRound());
    await wordsData.forEach(this.createCard.bind(this));
    const words = [];
    wordsData.forEach((data) => {
      words.push(data);
    });
    words.sort(() => 0.5 - Math.random());
    words.forEach(this.createWordCard, this);
    dataTransfer(this.props);
  }

  restartGame() {
    checkBtn.classList.remove('activeBtn');
    allCards.innerHTML = '';
    allWords.innerHTML = '';
    scoreLabel.classList.add('hidden');
    scoreLabel.children[0].innerHTML = '';
    this.clearStatistics();
    this.createCardPage();
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
    this.props.know = 0;
    this.props.errors = ERRORS_MAX_COUNT;
  }

  optionSelected() {
    allCards.innerHTML = '';
    allWords.innerHTML = '';
    this.clearStatistics();
    this.createCardPage();
  }

  async createCard(data, index) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col', 'l4', 's8', 'm6', 'center-align');
    const CARD = document.createElement('div');
    CARD.id = `card-${data.id}`;
    CARD.setAttribute('index', `${index}`);
    CARD.classList.add('card', 'droptarget');
    const image = await this.dataController.getMaterials(data.image);
    CARD.setAttribute('data-word', `${data.word}`);
    CARD.innerHTML = Utils.getCard(data.id, image);
    cardWrapper.append(CARD);
    allCards.appendChild(cardWrapper);
  }

  createWordCard(data) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col', 'l6', 's12', 'm12', 'center-align');
    const CARD = document.createElement('div');
    CARD.id = `word-${data.id}`;
    CARD.draggable = true;
    CARD.classList.add('card-panel', 'teal', 'draggable');
    CARD.innerHTML = Utils.getWordCard(`${data.word}`);
    cardWrapper.append(CARD);
    const cln = CARD.cloneNode(true);
    this.props.errorsArr.push(cln);
    allWords.appendChild(cardWrapper);
  }
}
