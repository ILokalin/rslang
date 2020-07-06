import { ERRORS_MAX_COUNT } from '../data/constants';
import Utils from './utils';

export default class UserService {
  constructor(dataController) {
    this.dataController = dataController;
    this.myWords = new Map();
  }

  async init() {
    this.authorized = true;
    const userWordsForRound = await Utils.getUserWordsForRound(this.dataController);
    if (userWordsForRound) {
      this.userWordsArr = userWordsForRound[0].paginatedResults;
      const size = Math.floor(this.userWordsArr.length / ERRORS_MAX_COUNT);
      let i = 0;
      while (i < size) {
        i += 1;
        this.myWords.set(
          i.toString(),
          this.userWordsArr.slice((i - 1) * ERRORS_MAX_COUNT, i * ERRORS_MAX_COUNT),
        );
      }
    }
  }

  getMyWords() {
    return this.myWords;
  }

  isAuthorized() {
    return this.authorized;
  }
}
