import { preloaderState } from 'Service/AppStore';
import { DomGen } from 'Service/DomGen';
import { messages } from './PreloaderConst';

export class Preloader {
  constructor() {
    this.body = document.body;
  }

  init() {
    this.preloader = DomGen();
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
    this.timeSet = 10000;
    setTimeout(() => {
      this.countOfMessage += 1;
      if (this.countOfMessage < 7 && this.isHide) {
        this.preloader.block.remove();
      }
      console.log(messages[this.countOfMessage]);
      this.startCycleAnimation();
    }, this.timeSet);
  }

  showPreloader() {
    this.body.append(this.preloader.block);
    this.startCycleAnimation();
  }

  hidePreloader() {
    this.isHide = true;
  }
}
