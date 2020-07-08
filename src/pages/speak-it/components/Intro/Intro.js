import { INTRO, START_BTN, GAME_CONTAINER, sideNavTriggerEl } from '../../data/constants';

export default class Intro {
  init(game) {
    this.el = START_BTN;
    this.game = game;
    this.el.addEventListener('click', this.startButtonClick.bind(this));
  }

  startButtonClick(e) {
    INTRO.classList.add('hidden');
    GAME_CONTAINER.classList.remove('hidden');
    sideNavTriggerEl.classList.remove('hidden');
    this.game.start();
    e.preventDefault();
  }
}
