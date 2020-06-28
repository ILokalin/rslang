import GameSprint from './gameSprint/GameSprint';
import 'materialize-css';

// eslint-disable-next-line no-undef
M.AutoInit();

export default class App {
  constructor() {
    this.score = 0;
  }

  init() {
    const gameSprint = new GameSprint(this.score);
    gameSprint.init();
  }
}
