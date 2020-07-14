import { levelSelect, roundSelect, roundLabel } from '../../data/constants';
import Utils from '../../services/utils';

export default class GameSettings {
  constructor(dataProvider) {
    this.dataProvider = dataProvider;
    const [level, round] = this.dataProvider.getInitialGameRound().split('.');
    levelSelect.value = level.toString();
    roundSelect.value = round.toString();
    Utils.validateRoundValue();
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
    Utils.validateRoundValue();
    this.optionSelected();
  }
}
