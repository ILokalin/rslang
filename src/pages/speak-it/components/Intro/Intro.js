import { INTRO, START_BTN, GAME_CONTAINER } from '../../data/constants';

export class Intro {
  constructor() {
    this.el = START_BTN;
    this.el.addEventListener('click', this.startButtonClick.bind(this));
  }

  startButtonClick() {
    INTRO.classList.add('hidden');
    GAME_CONTAINER.classList.remove('hidden');
  }
}