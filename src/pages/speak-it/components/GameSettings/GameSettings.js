import Utils from '../../services/utils';
import { levelSelectEl, roundSelectEl, roundLabelEl } from '../../data/constants';

export default class GameSettings {
  constructor() {
    const currentRound = Utils.getCurrentRound().split('.');
    const [level, round] = currentRound;
    levelSelectEl.value = level.toString();
    roundSelectEl.value = round.toString();
    // eslint-disable-next-line no-undef
    M.AutoInit();
  }

  init(levelOrRoundSelected) {
    this.levelOrRoundSelected = levelOrRoundSelected;
    levelSelectEl.addEventListener('change', this.updateGameData.bind(this));
    roundSelectEl.addEventListener('change', this.updateGameData.bind(this));
    GameSettings.displayRound();
  }

  static displayRound() {
    const currentRound = `${levelSelectEl.value}.${roundSelectEl.value}`;
    roundLabelEl.innerText = `Round ${currentRound}`;
    return currentRound;
  }

  updateGameData() {
    this.levelOrRoundSelected();
    Utils.setCurrentRound(GameSettings.displayRound());
  }
}
