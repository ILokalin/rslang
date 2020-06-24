import Utils from '../../services/utils';
import { levelSelectEl, roundSelectEl, roundLabelEl } from '../../data/constants';

export default class GameSettings {
  constructor() {
    const currentRound = Utils.getCurrentRound().split('.');
    const [level, round] = currentRound;
    this.level = level;
    this.round = round;
    levelSelectEl.value = this.level.toString();
    roundSelectEl.children[0].value = this.round.toString();
    M.AutoInit();
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

  displayRound() {
    const currentRound = `${this.level}.${this.round}`;
    roundLabelEl.innerText = `Round ${currentRound}`;
    return currentRound;
  }

  updateGameData() {
    this.levelOrRoundSelected(this.level, this.round);
    Utils.setCurrentRound(this.displayRound());
  }
}
