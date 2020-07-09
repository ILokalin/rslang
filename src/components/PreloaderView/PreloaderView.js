import { preloaderState } from 'Service/AppState';
import { DomGen } from 'Service/DomGen';
import { messages } from './PreloaderViewConst';
import { preloaderViewScreen } from './PreloaderViewScreen';

export class PreloaderView {
  constructor() {
    this.body = document.body;
  }

  init() {
    this.preloader = DomGen(preloaderViewScreen);
    this.countOfMessage = 0;

    preloaderState.watch((isShow) => {
      if (isShow) {
        this.showPreloader();
      } else {
        this.hidePreloader();
      }
    });
  }

  startCycleAnimation() {
    setTimeout(() => {
      this.countOfMessage += 1;
      if (this.countOfMessage >= 7 && this.isHide) {
        this.preloader.block.remove();
        this.countOfMessage = 0;
      } else {
        this.preloader.discribeLine.innerText = messages[this.countOfMessage];
        this.startCycleAnimation();
      }
    }, this.timeSet);
  }

  showPreloader() {
    this.timeSet = 5000;
    this.isHide = false;
    this.body.append(this.preloader.block);
    this.preloader.discribeLine.innerText = messages[this.countOfMessage];
    this.startCycleAnimation();
  }

  hidePreloader() {
    this.timeSet = 500;
    this.isHide = true;
  }
}
