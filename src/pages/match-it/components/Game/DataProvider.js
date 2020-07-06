import Utils from '../../services/utils';
import { levelSelect } from '../../data/constants';

export default class DataProvider {
  constructor(dataController, userService) {
    this.dataController = dataController;
    this.userService = userService;
    this.gameRound = '0.1';
    this.gameRoundMax = 60;
    this.data = new Map();
  }

  async start() {
    return this.dataController.getUser().then(
      async (settings) => {
        Utils.displayUserName(settings);
        const gameSettings = settings['match-it'];
        if (!gameSettings) {
          await this.dataController.setUserOptions({ 'match-it': { gameRound: this.gameRound } });
        } else {
          this.gameRound = settings['match-it'].gameRound;
        }
        await this.userService.init();
        this.data = this.userService.getMyWords();
        if (this.data.size > 0) {
          this.gameRoundMax = this.data.size;
        } else {
          this.noWordsFound();
        }
      },
      () => {
        Utils.displayEmptyUserName();
        this.noWordsFound();
      },
    );
  }

  noWordsFound() {
    levelSelect.options.remove(0);
    this.gameRound = '1.1';
  }

  getGameRound() {
    return this.gameRound;
  }

  getData() {
    return this.data;
  }
}
