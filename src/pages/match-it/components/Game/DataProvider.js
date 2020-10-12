import Utils from '../../services/utils';
import { levelSelect, roundSelect, DEFAULT_ROUND } from '../../data/constants';

export default class DataProvider {
  constructor(dataController, preloaderController, userService) {
    this.dataController = dataController;
    this.preloaderController = preloaderController;
    this.userService = userService;
    this.gameRound = this.userService.getRound();
  }

  async start() {
    return this.dataController.getUser().then(
      (settings) => this.processUserSettings(settings),
      (report) => {
        Utils.displayUserName(report);
        this.noWordsFound();
      },
    );
  }

  async processUserSettings(settings) {
    this.preloaderController.showPreloader();
    Utils.displayUserName(settings);
    const gameSettings = settings['match-it'];
    if (!gameSettings) {
      await this.dataController.setUserOptions({ 'match-it': { gameRound: this.gameRound } });
    } else {
      this.gameRound = settings['match-it'].gameRound;
    }
    await this.userService.init();
    this.preloaderController.hidePreloader();
    if (!this.userService.hasWords()) {
      this.noWordsFound();
    }
  }

  noWordsFound() {
    levelSelect.options.remove(0);
    this.gameRound = Utils.getCurrentRound();
    if (this.gameRound === this.userService.getRound()) {
      this.gameRound = DEFAULT_ROUND;
    }
  }

  getInitialGameRound() {
    return this.gameRound;
  }

  getCurrentGameRound() {
    if (Utils.isUserWordsSelected()) {
      return this.userService.getRound();
    }
    return `${levelSelect.value}.${roundSelect.value}`;
  }

  getDisplayedRound() {
    if (Utils.isUserWordsSelected()) {
      return `${levelSelect.selectedOptions[0].innerHTML}`;
    }
    const currentRound = this.getCurrentGameRound();
    return `Раунд ${currentRound}`;
  }

  async getData() {
    let wordsData;
    if (Utils.isUserWordsSelected()) {
      wordsData = this.userService.getUserWords();
    } else {
      this.preloaderController.showPreloader();
      wordsData = await Utils.getWordsForRound(this.dataController);
      this.preloaderController.hidePreloader();
    }
    return wordsData;
  }
}
