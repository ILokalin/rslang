import Utils from '../../services/utils';
import { levelSelect, roundSelect, roundLabel, userWords } from '../../data/constants';

export default class GameSettings {
  constructor() {
    const currentRound = Utils.getCurrentRound().split('.');
    userWords.checked = Utils.getUserWordsOption();
    const [level, round] = currentRound;
    levelSelect.value = level.toString();
    roundSelect.value = round.toString();
    // eslint-disable-next-line no-undef
    M.AutoInit();
  }

  init(optionSelected) {
    this.optionSelected = optionSelected;
    levelSelect.addEventListener('change', this.updateGameData.bind(this));
    roundSelect.addEventListener('change', this.updateGameData.bind(this));
    userWords.addEventListener('change', this.updateGameData.bind(this));
    GameSettings.displayRound();
  }

  static displayRound() {
    const currentRound = `${levelSelect.value}.${roundSelect.value}`;
    if (!userWords.checked) {
      levelSelect.disabled = false;
      roundSelect.disabled = false;
      userWords.disabled = true;
      M.FormSelect.init(levelSelect);
      roundLabel.innerText = `Round ${currentRound}`;
    } else {
      levelSelect.disabled = true;
      roundSelect.disabled = true;
      userWords.disabled = false;
      M.FormSelect.init(levelSelect);
      roundLabel.innerText = '';
    }
    return currentRound;
  }

  updateGameData() {
    this.optionSelected();
    Utils.setUserWordsOption(userWords.checked);
    Utils.setCurrentRound(GameSettings.displayRound());
  }
}
