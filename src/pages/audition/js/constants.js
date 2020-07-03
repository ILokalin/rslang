const DATA_URL =  'https://raw.githubusercontent.com/mc-gorky/rslang-data/master';
const gameContainer = document.querySelector('.game-container');
const abortGameBtn = document.querySelector('.abort-game-btn');
const userNameEl = document.querySelector('.avatar__name');
const difficultySelector = document.querySelector('.select-difficulty');
const logInBtn = document.querySelector('.login-btn');
const errorMessageEl = document.querySelector('.warning-text');
const selectWordsWindow = document.querySelector('.select-words-window');
const ownWordsBtn = document.getElementById('own-words');
const allWordsBtn = document.getElementById('all-words');

export {
  DATA_URL,
  gameContainer,
  abortGameBtn,
  userNameEl,
  difficultySelector,
  logInBtn,
  errorMessageEl,
  selectWordsWindow,
  ownWordsBtn,
  allWordsBtn,
}
