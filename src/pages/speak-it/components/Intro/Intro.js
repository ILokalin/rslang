import { INTRO, START_BTN, GAME_CONTAINER } from '../../data/constants';

export default class Intro {
  constructor() {
    this.el = START_BTN;
    this.el.addEventListener('click', Intro.startButtonClick);
  }

  static startButtonClick(evt) {
    INTRO.classList.add('hidden');
    document.body.style.backgroundImage = 'none';
    GAME_CONTAINER.classList.remove('hidden');
    evt.preventDefault();
  }
}
