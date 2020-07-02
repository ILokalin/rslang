import './index.scss';
import 'materialize-css';
import { mySwiper, settings } from './components/constants';
import Training from './components/Training';

// eslint-disable-next-line no-undef
M.AutoInit();
console.log(settings);
if (settings.lastTrain !== new Date().toDateString()) {
  console.log(settings.lastTrain !== new Date().toDateString());
  const train = new Training(settings.newCardsPerDay, settings.cardsPerDay);
  mySwiper.train = train;
} else {
  // если тернировка на сегодня еще не закончена (total cards в настройках > чем тотал кардс в краткосрочной статистике)
  // то нужно создать тренировку const train = new Training( посчитать сколько осталось, посчитать сколько осталось);
  // если закончена - открываем модалку. 
  // eslint-disable-next-line no-undef
  const modal = M.Modal.getInstance(document.querySelector('.modal-done-for-today'));
  modal.open();
}


document.querySelector('.modal-more-btn').addEventListener('click', () => {
 mySwiper.train.continueTraining();
})

document.querySelector('.modal-done-more').addEventListener('click', () => {
  const train = new Training(settings.newCardsPerDay, settings.cardsPerDay);
  mySwiper.train = train;
})

