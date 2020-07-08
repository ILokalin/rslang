import { introPage, startBtn, sideNavBurger, gamePage } from '../../data/constants';

export default class Intro {
  init(game) {
    this.game = game;
    startBtn.addEventListener('click', Intro.startButtonClick.bind(this));
  }

  static startButtonClick(e) {
    introPage.classList.add('hidden');
    sideNavBurger.classList.remove('hidden');
    gamePage.classList.remove('hidden');
    document.body.classList.remove('bg');
    this.game.start();
    e.preventDefault();
  }
}
