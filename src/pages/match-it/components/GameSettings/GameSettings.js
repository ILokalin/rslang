import { levelSelect, roundSelect, roundLabel } from '../../data/constants';

export default class GameSettings {
  constructor(currentRound) {
    const [level, round] = currentRound.split('.');
    levelSelect.value = level.toString();
    roundSelect.value = round.toString();
    // eslint-disable-next-line no-undef
    M.AutoInit();
  }

  init(optionSelected) {
    this.optionSelected = optionSelected;
    levelSelect.addEventListener('change', this.updateGameData.bind(this));
    roundSelect.addEventListener('change', this.updateGameData.bind(this));
    GameSettings.displayRound();
  }

  static displayRound() {
    const currentRound = `${levelSelect.value}.${roundSelect.value}`;
    roundLabel.innerText = `Round ${currentRound}`;
    roundLabel.classList.remove('hidden');
    return currentRound;
  }

  updateGameData() {
    this.optionSelected();
  }
}
