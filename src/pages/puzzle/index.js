import './index.scss';
import 'materialize-css';
import { store } from './js/storage';
import {
  playButtonHandler, selectLevelHandler, chooseRoundHandler, checkBoxHandler, 
   logoutHandler, checkIfUserIsSaved,
} from './js/helpers';
import {
 sideNav, logoutBtn,
} from './js/constants';
import { startRound } from './js/game';
import AuthPopup from 'Src/components/AuthPopup/AuthPopup.js';
import { DataController } from 'Service/DataController';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// eslint-disable-next-line no-undef
M.AutoInit();
const controller = new DataController();
controller.getUser().then((res) => {console.log(res)})
document.querySelector('.home-page__btn').addEventListener('click', playButtonHandler);
document.querySelector('select').addEventListener('change', selectLevelHandler);
document.querySelector('.round-select input').addEventListener('change', chooseRoundHandler);
document.querySelector('.hints').addEventListener('click', checkBoxHandler);
document.querySelector('.auto-pronounce-check').addEventListener('click', checkBoxHandler);
//document.querySelector('.register-btn').addEventListener('click', registerHandler);
// logInBtn.addEventListener('click', loginHandler);
// signUpBtn.addEventListener('click', signupHandler);
logoutBtn.addEventListener('click', logoutHandler);

const options = {
  onOpenStart() {
    store.prevRound = {
      level: store.level,
      round: store.round,
    };
  },
  onCloseEnd() {
    if (store.round !== store.prevRound.round || store.level !== store.prevRound.level) {
      startRound();
    }
  },
};
// eslint-disable-next-line
const sideNavInstance = M.Sidenav.init(sideNav, options);
