const gameContainer = document.querySelector('.game-container');
const userNameEl = document.querySelector('.avatar__name');
const difficultySelector = document.querySelector('.select-difficulty');
const logInBtn = document.querySelector('.login-btn');
const errorMessageEl = document.querySelector('.warning-text');
const warningMessageWindow = document.querySelector('.warning-window');
const warningMessageText = document.querySelector('.warning-description');
const warningMessageBtn = document.querySelector('.confirm-warning-btn');
const selectWordsWindow = document.querySelector('.select-words-window');
const ownWordsBtn = document.getElementById('own-words');
const allWordsBtn = document.getElementById('all-words');

export {
  gameContainer,
  userNameEl,
  difficultySelector,
  logInBtn,
  errorMessageEl,
  warningMessageWindow,
  warningMessageText,
  warningMessageBtn,
  selectWordsWindow,
  ownWordsBtn,
  allWordsBtn,
}
