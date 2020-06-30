import { appStartButton, intro, difficultMenu } from '../helper/constants';

export default class Intro {
  constructor() {
    this.el = appStartButton;
    this.el.addEventListener('click', Intro.startButtonClick);
  }

  static startButtonClick(e) {
    intro.classList.add('hidden');
    difficultMenu.classList.remove('hidden');
    e.preventDefault();
  }
}
