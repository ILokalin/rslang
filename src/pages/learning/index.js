import './index.scss';
import 'materialize-css';
import moment from 'moment';
import './components/buttons';
import { mySwiper, settings, dataController, preloaderController } from './components/constants';
import Training from './components/Training';
import {saveTrainingStatistics} from './components/helpers';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

preloaderController.showPreloader();

// eslint-disable-next-line no-undef
M.AutoInit();

if (settings.lastTrain !== moment().format('DD-MMM-YYYY')) {
  const train = new Training(settings.newCardsPerDay, settings.cardsPerDay);
  mySwiper.train = train;
} else {
  dataController.getUserStatistics().then((res) => {
    const shortTermStat = res.card.shortTime;
    console.log(shortTermStat);
    if (settings.cardsPerDay > shortTermStat.totalCards) {
      const totalCardsLeft = settings.cardsPerDay - shortTermStat.totalCards;
      const newCardsLeft = settings.newCardsPerDay - shortTermStat.newWords;
      const train = new Training(newCardsLeft, totalCardsLeft, shortTermStat);
      train.updateStat();
      mySwiper.train = train;
    } else {
      preloaderController.hidePreloader();
      // eslint-disable-next-line no-undef
      const modal = M.Modal.getInstance(document.querySelector('.modal-done-for-today'));
      modal.open();
    }
  });
}

