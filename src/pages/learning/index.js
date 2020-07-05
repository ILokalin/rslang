import './index.scss';
import 'materialize-css';
import { mySwiper, settings, dataController } from './components/constants';
import Training from './components/Training';
import {saveTrainingStatistics} from './components/helpers';
require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// eslint-disable-next-line no-undef
M.AutoInit();
console.log(settings);
if (settings.lastTrain !== new Date().toDateString()) {
  console.log(settings.lastTrain !== new Date().toDateString());
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
      // eslint-disable-next-line no-undef
      const modal = M.Modal.getInstance(document.querySelector('.modal-done-for-today'));
      modal.open();
    }
  });
}

document.querySelector('.modal-more-btn').addEventListener('click', () => {
 mySwiper.train.continueTraining();
})

document.querySelector('.modal-done-more').addEventListener('click', () => {
  const train = new Training(settings.newCardsPerDay, settings.cardsPerDay);
  mySwiper.train = train;
})

document.querySelector('.save-settings-button').addEventListener('click', async () => {
  await saveTrainingStatistics();
})

