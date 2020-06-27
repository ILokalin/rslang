import { introPage, startBtn, sideNavBurger, gamePage, gameContainer } from '../../data/constants';

export default class Intro {
  init() {
    startBtn.addEventListener('click', Intro.startButtonClick);
  }

  static startButtonClick(e) {
    introPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    gameContainer.classList.remove('hidden');
    document.body.classList.remove('bg');
    e.preventDefault();
  }
}
