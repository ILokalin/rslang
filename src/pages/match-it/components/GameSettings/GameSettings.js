import { levelSelect, roundSelect, roundLabel } from '../../data/constants';

export default class GameSettings {
  constructor(dataProvider) {
    this.dataProvider = dataProvider;
    const [level, round] = this.dataProvider.getInitialGameRound().split('.');
    levelSelect.value = level.toString();
    roundSelect.value = round.toString();
    // eslint-disable-next-line no-undef
    M.AutoInit();
  }

  init(optionSelected) {
    this.optionSelected = optionSelected;
    levelSelect.addEventListener('change', this.updateGameData.bind(this));
    roundSelect.addEventListener('change', this.updateGameData.bind(this));
    this.displayRound();
  }

  displayRound() {
    roundLabel.innerText = this.dataProvider.getDisplayedRound();
    roundLabel.classList.remove('hidden');
  }

  updateGameData() {
    this.optionSelected();
  }
}
