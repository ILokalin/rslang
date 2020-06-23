import { levelSelectEl, roundSelectEl, roundLabelEl } from '../../data/constants';

export default class GameSettings {
  constructor() {
    M.AutoInit();
    this.level = 1;
    this.round = 1;
  }

  init(levelOrRoundSelected) {
    this.levelOrRoundSelected = levelOrRoundSelected;
    levelSelectEl.addEventListener('change', this.onLevelSelected.bind(this));
    roundSelectEl.addEventListener('change', this.onRoundSelected.bind(this));
  }

  onLevelSelected(e) {
    this.level = e.target.value;
    this.updateGameData();
  }

  onRoundSelected(e) {
    this.round = e.target.value;
    this.updateGameData();
  }

  updateGameData() {
    roundLabelEl.innerText = `Round ${this.level}.${this.round}`;
    this.levelOrRoundSelected(this.level, this.round);
  }
}
