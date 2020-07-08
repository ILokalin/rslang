import Utils from '../../services/utils';
import SpeechRecognitionService from '../../services/speechRecognition';
import GameSettings from '../GameSettings';
import DataProvider from './DataProvider';

import {
  CARDS_ITEMS,
  ERRORS_MAX_COUNT,
  WORD_IMG,
  WORD_TRANSLATION,
  DATA_PATH,
  SPEAK_BTN,
  RESTART,
  RETURN,
  RESULTS,
  RESULTS_BTN,
  NEW_GAME,
  ERRORS,
  RESULTS_ERRORS,
  KNOW,
  RESULTS_KNOW,
  roundLabelEl,
} from '../../data/constants';

export default class Game {
  constructor(dataController, preloaderController, userService) {
    localStorage.isStart = false;
    this.authorized = false;
    this.props = {
      errors: ERRORS_MAX_COUNT,
      know: 0,
      errorsArr: [],
      knowArr: [],
    };
    Utils.resetMainCard();
    this.dataController = dataController;
    this.userService = userService;
    this.dataProvider = new DataProvider(dataController, preloaderController, userService);
  }

  async start() {
    await this.dataProvider.start();
    await this.init();
  }

  async init() {
    this.gameSettings = new GameSettings(this.dataProvider);
    this.gameSettings.init(this.levelOrRoundSelected.bind(this));
    await this.createCardPage();
    RESTART.addEventListener('click', this.onRestartBtnClick.bind(this));
    RETURN.addEventListener('click', Utils.onReturnBtnClick);
    NEW_GAME.addEventListener('click', this.onNewGameBtnClick.bind(this));
    RESULTS_BTN.addEventListener('click', this.showResults.bind(this));
    this.recognition = new SpeechRecognitionService(this.props);
  }

  async showResults(e) {
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
    if (SPEAK_BTN.classList.contains('activeBtn')) {
      await this.sendStatisticsToBackEnd();
    }
    e.preventDefault();
  }

  async saveSettings() {
    this.gameSettings.displayRound();
    Utils.setCurrentRound(this.dataProvider.getCurrentGameRound());
    if (this.userService.isAuthorized()) {
      await this.dataController.setUserOptions({
        'speak-it': { gameRound: Utils.getCurrentRound() },
      });
    }
  }

  async sendStatisticsToBackEnd() {
    const results = Math.floor((this.props.know / ERRORS_MAX_COUNT) * 100) || 0;
    const requestBody = {
      'speak-it': {
        result: results,
        round: roundLabelEl.innerHTML,
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

  onNewGameBtnClick(e) {
    this.restartGame();
    RESULTS.classList.add('hidden');
    e.preventDefault();
  }

  async createCardPage() {
    this.props.errorsArr = [];
    this.props.errorsArr.length = 0;
    this.saveSettings();
    const wordsData = await this.dataProvider.getData();
    CARDS_ITEMS.innerHTML = '';
    await wordsData.forEach(this.createCard.bind(this));
    Utils.disableCardClick();
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

  async levelOrRoundSelected() {
    this.clearStatistics();
    this.saveSettings();
    this.restartGame();
    Utils.resetCardMinWidth();
    await this.createCardPage();
  }

  async createCard(data, index) {
    const CARD = document.createElement('div');
    CARD.classList.add('item');
    const audio = await this.dataController.getMaterials(data.audio);
    const image = await this.dataController.getMaterials(data.image);
    CARD.setAttribute('data-audio', audio || `${DATA_PATH}/${data.audio}`);
    CARD.setAttribute('data-img', image || `${DATA_PATH}/${data.image}`);
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
