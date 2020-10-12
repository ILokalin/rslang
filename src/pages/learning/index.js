import './index.scss';
import 'materialize-css';
import moment from 'moment';
import './components/buttons';
import { mySwiper, settings, dataController, preloaderController } from './components/constants';
import Training from './components/Training';
import { handleVolumeBtn } from './components/helpers';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// eslint-disable-next-line no-undef
M.AutoInit();
handleVolumeBtn();
if (settings.lastTrain !== moment().format('DD-MMM-YYYY')) {
  preloaderController.showPreloader();
  const train = new Training(settings.newCardsPerDay, settings.cardsPerDay);
  mySwiper.train = train;
} else {
  dataController.getUserStatistics().then((res) => {
    const shortTermStat = res.card.shortTime;
    if (settings.cardsPerDay > shortTermStat.totalCards) {
      preloaderController.showPreloader();
      const totalCardsLeft = settings.cardsPerDay - shortTermStat.totalCards;
      const newCardsLeft = settings.newCardsPerDay - shortTermStat.newWords;
      const train = new Training(newCardsLeft, totalCardsLeft, shortTermStat);
      train.updateStat();
      mySwiper.train = train;
    } else {
      // eslint-disable-next-line no-undef
      const modal = M.Modal.getInstance(document.querySelector('.modal-done-for-today'));
      modal.open();
    }
  });
}
