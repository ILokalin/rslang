import { INTRO, START_BTN, GAME_CONTAINER } from '../../data/constants';

export default class Intro {
  constructor() {
    this.el = START_BTN;
    this.el.addEventListener('click', Intro.startButtonClick);
  }

  static startButtonClick(e) {
    INTRO.classList.add('hidden');
    GAME_CONTAINER.classList.remove('hidden');
    e.preventDefault();
  }
}
