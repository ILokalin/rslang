import { preloaderState } from 'Service/AppState';
import { DomGen } from 'Service/DomGen';
import { messages, textOfFacts } from './PreloaderViewConst';
import { preloaderViewScreen } from './PreloaderViewScreen';
import { preloaderCommand } from 'Service/AppState';

export class PreloaderView {
  constructor() {
    this.body = document.body;
  }

  init() {
    this.preloader = DomGen(preloaderViewScreen);
    this.countOfMessage = 0;

    preloaderState.watch((control) => {
      if (control === preloaderCommand.long) {
        this.showLongPreloader();
      } else if (control === preloaderCommand.hide) {
        this.hidePreloader();
      } else if (control === preloaderCommand.short) {
        this.showShortPreloader();
      }
    });
  }

  startCycleAnimation() {
    setTimeout(() => {
      const { length } = messages;
      this.countOfMessage = this.countOfMessage === length - 1 ? 0 : this.countOfMessage + 1;

      if (this.countOfMessage >= 7 && this.isHide) {
        this.preloader.block.remove();
        this.countOfMessage = 0;
      } else {
        this.preloader.discribeLine.innerText = messages[this.countOfMessage].text;
        this.timeSet = this.isHide ? 300 : messages[this.countOfMessage].time;
        this.startCycleAnimation();
      }
    }, this.timeSet);
  }

  showLongPreloader() {
    this.timeSet = messages[this.countOfMessage].time;
    this.isHide = false;
    this.isQuicklyHide = false;
    this.body.append(this.preloader.block);
    this.preloader.discribeLine.innerText = messages[this.countOfMessage].text;
    this.startCycleAnimation();
  }

  showShortPreloader() {
    const { length } = textOfFacts;
    this.isHide = false;
    this.isQuicklyHide = true;
    const randomIndex = Math.floor(Math.random() * length);
    this.preloader.discribeLine.innerText = textOfFacts[randomIndex];
    this.body.append(this.preloader.block);
  }

  hidePreloader() {
    this.isHide = true;
    if (this.isQuicklyHide) {
      this.preloader.block.remove();
    }
  }
}
