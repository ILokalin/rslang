import { levelSelectEl, roundSelectEl, roundLabelEl } from '../../data/constants';

export default class GameSettings {
  constructor(dataProvider) {
    this.dataProvider = dataProvider;
    const [level, round] = this.dataProvider.getInitialGameRound().split('.');
    levelSelectEl.value = level.toString();
    roundSelectEl.value = round.toString();
    // eslint-disable-next-line no-undef
    M.AutoInit();
  }

  init(levelOrRoundSelected) {
    this.levelOrRoundSelected = levelOrRoundSelected;
    levelSelectEl.addEventListener('change', this.updateGameData.bind(this));
    roundSelectEl.addEventListener('change', this.updateGameData.bind(this));
    this.displayRound();
  }

  displayRound() {
    roundLabelEl.innerText = this.dataProvider.getDisplayedRound();
    roundLabelEl.classList.remove('hidden');
  }

  updateGameData() {
    this.levelOrRoundSelected();
  }
}
