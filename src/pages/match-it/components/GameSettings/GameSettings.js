import Utils from '../../services/utils';
import { levelSelect, roundSelect, roundLabel } from '../../data/constants';

export default class GameSettings {
  constructor() {
    const currentRound = Utils.getCurrentRound().split('.');
    const [level, round] = currentRound;
    levelSelect.value = level.toString();
    roundSelect.value = round.toString();
    // eslint-disable-next-line no-undef
    M.AutoInit();
  }

  init(levelOrRoundSelected) {
    this.levelOrRoundSelected = levelOrRoundSelected;
    levelSelect.addEventListener('change', this.updateGameData.bind(this));
    roundSelect.addEventListener('change', this.updateGameData.bind(this));
    GameSettings.displayRound();
  }

  static displayRound() {
    const currentRound = `${levelSelect.value}.${roundSelect.value}`;
    roundLabel.innerText = `Round ${currentRound}`;
    return currentRound;
  }

  updateGameData() {
    this.levelOrRoundSelected();
    Utils.setCurrentRound(GameSettings.displayRound());
  }
}
