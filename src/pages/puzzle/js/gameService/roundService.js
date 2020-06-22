import { store } from '../storage';
import { roundsCount } from '../constants';

const getGameRound = () => `Round ${store.level}.${store.round}`;
const setGameRound = () => {
  document.querySelector('.game-header h4').innerText = getGameRound();
};
const setRound = () => {
  if (+store.round > roundsCount[store.level - 1]) {
    store.level = +store.level + 1;
    if (store.level > 6) {
      store.level = 1;
    }
    store.round = 1;
  } else {
    store.round = +store.round + 1;
  }
};

export {
  setGameRound, getGameRound, setRound,
};
