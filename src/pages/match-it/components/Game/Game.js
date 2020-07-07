import Utils from '../../services/utils';
import GameSettings from '../GameSettings';
import DataProvider from './DataProvider';

import {
  allCards,
  allWords,
  ERRORS_MAX_COUNT,
  scoreLabel,
  nextBtn,
  checkBtn,
  restartBtn,
  roundLabel,
} from '../../data/constants';

export default class Game {
  constructor(dataController, userService, dataTransferService) {
    localStorage.isStart = false;
    this.props = {
      errors: ERRORS_MAX_COUNT,
      know: 0,
      errorsArr: [],
      knowArr: [],
    };
    this.dataController = dataController;
    this.userService = userService;
    this.dataProvider = new DataProvider(this.dataController, this.userService);
    this.dataTransfer = dataTransferService;
  }

  async start() {
    await this.dataProvider.start();
    this.init();
  }

  init() {
    this.gameSettings = new GameSettings(this.dataProvider.getGameRound());
    this.gameSettings.init(this.optionSelected.bind(this));
    this.createCardPage();
    restartBtn.addEventListener('click', this.onRestartBtnClick.bind(this));
    nextBtn.addEventListener('click', this.onNextBtnClick.bind(this));
    checkBtn.addEventListener('click', this.showResults.bind(this));
  }

  async showResults(e) {
    if (checkBtn.classList.contains('activeBtn')) {
      return;
    }
    Utils.disableCardsTransfer();
    checkBtn.classList.add('activeBtn');
    scoreLabel.children[0].innerHTML = this.props.know;
    Utils.displayResults();
    scoreLabel.classList.remove('hidden');
    if (this.userService.isAuthorized()) {
      await this.sendStatisticsToBackEnd();
    }
    e.preventDefault();
  }

  async sendStatisticsToBackEnd() {
    const results = Math.floor((this.props.know / this.props.errors) * 100) || 0;
    const requestBody = {
      'match-it': {
        result: results,
        round: roundLabel.innerHTML,
        knownWords: this.props.know,
        mistakeWords: this.props.errors,
      },
    };
    await this.dataController.setUserStatistics(requestBody);
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
    const words = [];
    const round = GameSettings.displayRound();
    let wordsData = this.dataProvider.getData().get(round);
    if (!wordsData || wordsData.length === 0) {
      wordsData = await Utils.getWordsForRound(this.dataController);
    }
    await wordsData.forEach(this.createCard.bind(this));
    wordsData.forEach((data) => words.push(data));
    words.sort(() => 0.5 - Math.random());
    words.forEach(this.createWordCard, this);
    this.dataTransfer.start(this.props);
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

  async optionSelected() {
    allCards.innerHTML = '';
    allWords.innerHTML = '';
    this.clearStatistics();
    const round = GameSettings.displayRound();
    this.dataController.setUserOptions({ 'match-it': { gameRound: round } }).then(() => {
      await this.createCardPage();
    });
  }

  async createCard(data, index) {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col', 'l4', 's8', 'm6', 'center-align');
    const CARD = document.createElement('div');
    // eslint-disable-next-line no-underscore-dangle
    CARD.id = `card-${data.id || data._id}`;
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
    // eslint-disable-next-line no-underscore-dangle
    CARD.id = `word-${data.id || data._id}`;
    CARD.draggable = true;
    CARD.classList.add('card-panel', 'teal', 'draggable');
    CARD.innerHTML = Utils.getWordCard(`${data.word}`);
    cardWrapper.append(CARD);
    const cln = CARD.cloneNode(true);
    this.props.errorsArr.push(cln);
    allWords.appendChild(cardWrapper);
  }
}
