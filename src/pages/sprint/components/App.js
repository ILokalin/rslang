import GameSprint from './gameSprint/GameSprint';
import 'materialize-css';

export default class App {
  constructor() {
    this.score = 0;
  }

  init() {
    const gameSprint = new GameSprint(this.score);
    gameSprint.init();
  }
}
