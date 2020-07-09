import { mySwiper, settings, dataController, soundBtn, preloaderController } from './constants';
import Training from './Training';
import {saveTrainingStatistics} from './helpers';

document.querySelector('.modal-more-btn').addEventListener('click', () => {
 mySwiper.train.continueTraining();
})

document.querySelector('.modal-done-more').addEventListener('click', () => {
  preloaderController.showPreloader();
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

soundBtn.addEventListener('click', () => {
  if (soundBtn.classList.contains('off')) {
    soundBtn.querySelector('i').innerText = 'volume_up';
    soundBtn.classList.remove('off');
    soundBtn.dataset.tooltip = 'Отключить звуки';
    settings.autoPlayEnabled = 1;
  } else {
    soundBtn.classList.add('off');
    document.querySelectorAll('audio').forEach((audio) => { audio.pause() });
    soundBtn.querySelector('i').innerText = 'volume_off';
    soundBtn.dataset.tooltip = 'Включить звуки';
    settings.autoPlayEnabled = 0;
  }
})

document.querySelector('.open-short-stat').addEventListener('click', () => {
  document.querySelector('.sidenav-trigger').click();
})
