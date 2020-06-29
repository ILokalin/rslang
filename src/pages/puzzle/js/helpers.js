import { store } from './storage';
import {
  gamePage, homePage, translateBtn, pronounceBtn, pictureBtn,
  roundsCount,  inputField, roundStatisticsPage, translation, fullStatPage,
} from './constants';

// eslint-disable-next-line
import { startRound, hidePaintingInfo, hideBackgroundPic } from './game';
import { setBackgroundToPuzzlePiece } from './canvas';


const checkIfUserIsSaved = () => {
  if (store.user) {
    // authorization.classList.add('hidden');
    homePage.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
  }
};

const handleRoundsPerLevel = () => {
  document.querySelector('.round-select input').setAttribute('max', roundsCount[store.level - 1]);
};

const checkCheckboxes = () => {
  const autoPronounceCheckbox = document.querySelector('.auto-pronounce-check input');
  const translateCheckbox = document.querySelector('.translate-checkbox');
  const pronounceCheckbox = document.querySelector('.pronounce-checkbox');
  const pictureCheckbox = document.querySelector('.picture-checkbox');

  if (store.isAutoPronounceOn) {
    autoPronounceCheckbox.setAttribute('checked', 'checked');
  }
  if (store.hints.isTranslationOn) {
    translateCheckbox.setAttribute('checked', 'checked');
    translateBtn.classList.remove('disabled');
  } else {
    translateBtn.classList.add('disabled');
  }
  if (store.hints.isPronounceOn) {
    pronounceCheckbox.setAttribute('checked', 'checked');
    pronounceBtn.classList.remove('disabled');
  } else {
    pronounceBtn.classList.add('disabled');
  }
  if (store.hints.isPictureOn) {
    pictureCheckbox.setAttribute('checked', 'checked');
    pictureBtn.classList.remove('disabled');
    pictureBtn.dataset.pictureOn = 1;
  } else {
    pictureBtn.classList.add('disabled');
    pictureBtn.dataset.pictureOn = 0;
  }
};

const playButtonHandler = async () => {
  gamePage.classList.remove('hidden');
  homePage.classList.add('hidden');
  checkCheckboxes();
  handleRoundsPerLevel();
  await startRound();
};

const selectLevelHandler = (event) => {
  store.level = event.target.value;
  localStorage.setItem('level', store.level);
  document.querySelector('.round-select input').classList.remove('disabled');
  handleRoundsPerLevel();
  // sendStatisticsToBackEnd();
};

const chooseRoundHandler = (event) => {
  store.round = event.target.value;
  if (store.passedRounds.includes(`${store.level}.${store.round}`)) {
    document.querySelector('.round-select input').setAttribute('style', 'background-color: grey;');
  } else {
    document.querySelector('.round-select input').setAttribute('style', 'background-color: white;');
  }
  // sendStatisticsToBackEnd();
  localStorage.setItem('round', store.round);
};

const toggleBtn = (el, isEnabled) => {
  if (isEnabled) {
    el.classList.remove('disabled');
  } else {
    el.classList.add('disabled');
  }
};

const checkBoxHandler = async (event) => {
  if (event.target.matches('input')) {
    const checkboxName = event.target.closest('label').innerText;
    const isChecked = +event.target.closest('label').querySelector('input').checked;

    switch (checkboxName) {
      case 'Translate': {
        store.hints.isTranslationOn = isChecked;
        localStorage.setItem('isTranslationOn', +isChecked);
        toggleBtn(translateBtn, isChecked);
        if (isChecked) {
          translation.classList.remove('hidden');
        } else {
          translation.classList.add('hidden');
        }
        break;
      }
      case 'Pronounce': {
        store.hints.isPronounceOn = isChecked;
        localStorage.setItem('isPronounceOn', +isChecked);
        toggleBtn(pronounceBtn, isChecked);
        break;
      }
      case 'Picture': {
        store.hints.isPictureOn = isChecked;
        localStorage.setItem('isPictureOn', +isChecked);
        toggleBtn(pictureBtn, isChecked);
        inputField.querySelector('.game-row').children.forEach((canvas) => {
          setBackgroundToPuzzlePiece(canvas, canvas.dataset.sx,
            canvas.dataset.sy, canvas.dataset.word, store.hints.isPictureOn);
        });
        break;
      }
      default: {
        store.isAutoPronounceOn = isChecked;
        localStorage.setItem('isAutoPronounceOn', +isChecked);
        break;
      }
    }
  }
};


export {
  playButtonHandler, selectLevelHandler, chooseRoundHandler, checkBoxHandler, 
  checkCheckboxes, handleRoundsPerLevel, 
  checkIfUserIsSaved,
};
