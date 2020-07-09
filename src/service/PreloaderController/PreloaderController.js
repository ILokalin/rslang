import { PreloaderView } from 'Components/PreloaderView';
import { openPreloader, closePreloader } from 'Service/AppState';
import { preloaderCommand } from 'Service/AppState';

export class PreloaderController {
  constructor() {
    const preloaderView = new PreloaderView();
    preloaderView.init();
  }

  showPreloader(command = preloaderCommand.short) {
    openPreloader(command);
  }

  hidePreloader() {
    closePreloader(preloaderCommand.hide);
  }
}
