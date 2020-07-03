import './index.scss';
import 'materialize-css';
import { store } from './js/storage';
import {
  playButtonHandler, selectLevelHandler, chooseRoundHandler, checkBoxHandler, 
  checkIfUserIsSaved, checkCheckboxes,
} from './js/helpers';
import {
 sideNav, dataController
} from './js/constants';
import { startRound } from './js/game';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// eslint-disable-next-line no-undef
const whoIsGameFor = () => {
  dataController.getUser().then(
    (userSettings) => {
      console.log('We have user', userSettings);
      if (userSettings.puzzle) {
        store.setUserSettings(userSettings.puzzle);
        checkCheckboxes();
      } 
    },
    (rejectReport) => {
      console.log('User canceled');    
    },
  );
};

whoIsGameFor();

M.AutoInit();

document.querySelector('.home-page__btn').addEventListener('click', playButtonHandler);
document.querySelector('select').addEventListener('change', selectLevelHandler);
document.querySelector('.round-select input').addEventListener('change', chooseRoundHandler);
document.querySelector('.hints').addEventListener('click', checkBoxHandler);
document.querySelector('.auto-pronounce-check').addEventListener('click', checkBoxHandler);

const options = {
  onOpenStart() {
    store.prevRound = {
      level: store.level,
      round: store.round,
    };
  },
  async onCloseEnd() {
    if (store.round !== store.prevRound.round || store.level !== store.prevRound.level) {
      await startRound();
    }
  },
};
// eslint-disable-next-line
const sideNavInstance = M.Sidenav.init(sideNav, options);
