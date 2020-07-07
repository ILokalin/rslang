import { mySwiper, settings, dataController } from './constants';
import Training from './Training';

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

document.querySelector('.swiper-button-next').addEventListener('click', () => {
  document.querySelectorAll('audio').forEach((audio) => {
    audio.pause();
  })
})
