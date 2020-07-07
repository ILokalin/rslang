import { PreloaderView } from 'Components/PreloaderView';
import { openPreloader, closePreloader } from 'Components/AppState';

export class PreloaderController {
  constructor() {
    const preloaderView = new PreloaderView();
    preloaderView.init();
  }

  showPreloader() {
    openPreloader();
  }

  hidePreloader() {
    closePreloader();
  }
}
