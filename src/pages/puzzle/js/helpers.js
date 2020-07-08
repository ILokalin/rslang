/* eslint-disable no-plusplus */
import { store } from './storage';
import {
  gamePage, homePage, translateBtn, pronounceBtn, pictureBtn,
  roundsCount,  inputField, roundStatisticsPage, translation, fullStatPage, dataController,
} from './constants';
// eslint-disable-next-line
import { startRound, hidePaintingInfo, hideBackgroundPic } from './game';
import { setBackgroundToPuzzlePiece } from './canvas';

const handleRoundsPerLevel = () => {
  document.querySelector('.round-select input').setAttribute('max', roundsCount[store.level - 1]);
};

const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const checkCheckboxes = () => {
  const autoPronounceCheckbox = document.querySelector('.auto-pronounce-check input');
  const playUserWords = document.querySelector('.user-words-checkbox');
  const translateCheckbox = document.querySelector('.translate-checkbox');
  const pronounceCheckbox = document.querySelector('.pronounce-checkbox');
  const pictureCheckbox = document.querySelector('.picture-checkbox');

  if (store.isAutoPronounceOn) {
    autoPronounceCheckbox.setAttribute('checked', 'checked');
  }
  if (store.playUserWords) {
    playUserWords.setAttribute('checked', 'checked');
    document.querySelector('.level-select input').setAttribute('disabled', 'disabled');
    document.querySelector('.round-select input').setAttribute('disabled', 'disabled');
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

const selectLevelHandler = async (event) => {
  store.level = event.target.value;
  await dataController.setUserOptions({puzzle: store.stringifySettings()});
  document.querySelector('.round-select input').classList.remove('disabled');
  handleRoundsPerLevel();
};

const chooseRoundHandler = async (event) => {
  store.round = event.target.value;
  await dataController.setUserOptions({puzzle: store.stringifySettings()});
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
      case 'Перевод': {
        store.hints.isTranslationOn = isChecked;
        toggleBtn(translateBtn, isChecked);
        if (isChecked) {
          translation.classList.remove('hidden');
        } else {
          translation.classList.add('hidden');
        }
        break;
      }
      case 'Произношение': {
        store.hints.isPronounceOn = isChecked;
        toggleBtn(pronounceBtn, isChecked);
        break;
      }
      case 'Картинка': {
        store.hints.isPictureOn = isChecked;
        toggleBtn(pictureBtn, isChecked);
        inputField.querySelector('.game-row').children.forEach((canvas) => {
          setBackgroundToPuzzlePiece(canvas, canvas.dataset.sx,
            canvas.dataset.sy, canvas.dataset.word, store.hints.isPictureOn);
        });
        break;
      }
      case 'Автопроизношение': {
        store.isAutoPronounceOn = isChecked;
        break;
      }
      default: {
        store.playUserWords = isChecked;
        if (isChecked) {
          document.querySelector('.level-select input').setAttribute('disabled', 'disabled');
          document.querySelector('.round-select input').setAttribute('disabled', 'disabled');
        } else {
          document.querySelector('.level-select input').removeAttribute('disabled');
          document.querySelector('.round-select input').removeAttribute('disabled');
        }
        break;
      }
    }
    await dataController.setUserOptions({puzzle: store.stringifySettings()});
  }
};


export {
  playButtonHandler, selectLevelHandler, chooseRoundHandler, checkBoxHandler, 
  checkCheckboxes, handleRoundsPerLevel, getRandomInteger, shuffle,
};
