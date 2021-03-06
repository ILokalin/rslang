import './index.scss';
import 'materialize-css';
import { store } from './js/storage';
import {
  playButtonHandler,
  selectLevelHandler,
  chooseRoundHandler,
  checkBoxHandler,
  storageHandle,
} from './js/helpers';
import { sideNav } from './js/constants';
import { startRound } from './js/game';
import { whoIsGameFor } from './js/userService';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// eslint-disable-next-line no-undef
M.AutoInit();

whoIsGameFor();

document.querySelector('.home-page__btn').addEventListener('click', playButtonHandler);
document.querySelector('select').addEventListener('change', selectLevelHandler);
document.querySelector('.round-select input').addEventListener('change', chooseRoundHandler);
document.querySelector('.hints').addEventListener('click', checkBoxHandler);
document.querySelector('.auto-pronounce-check').addEventListener('click', checkBoxHandler);
document.querySelector('.user-words-checkbox').addEventListener('click', checkBoxHandler);
window.addEventListener('storage', storageHandle);

const options = {
  onOpenStart() {
    store.prevRound = {
      level: store.level,
      round: store.round,
      playUserWords: store.playUserWords,
    };
  },
  async onCloseEnd() {
    if (
      store.round !== store.prevRound.round ||
      store.level !== store.prevRound.level ||
      store.playUserWords !== store.prevRound.playUserWords
    ) {
      await startRound();
    }
  },
};
// eslint-disable-next-line
const sideNavInstance = M.Sidenav.init(sideNav, options);
