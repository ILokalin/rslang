import { ERRORS_MAX_COUNT, USER_DEFAULT_ROUND } from '../data/constants';
import Utils from './utils';

export default class UserService {
  constructor(dataController) {
    this.dataController = dataController;
    this.userWords = [];
    this.round = USER_DEFAULT_ROUND;
  }

  async init() {
    this.authorized = true;
    const userWordsForRound = await Utils.getUserWordsForRound(this.dataController);
    if (userWordsForRound) {
      this.userWordsArr = userWordsForRound[0].paginatedResults;
    }
  }

  getRound() {
    return this.round;
  }

  getUserWords() {
    const shuffled = this.userWordsArr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, ERRORS_MAX_COUNT);
  }

  isAuthorized() {
    return this.authorized;
  }

  hasWords() {
    return this.userWordsArr.length > ERRORS_MAX_COUNT;
  }
}
