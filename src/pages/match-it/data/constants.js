export const DATA_PATH = 'https://raw.githubusercontent.com/anasidorovich/rslang-data/master';

const introPage = document.querySelector('.intro');
const startBtn = document.querySelector('.intro-btn');
const gameContainer = document.querySelector('.container');
const sideNavBurger = document.querySelector('.sidenav-trigger');
const gamePage = document.querySelector('.game-page');
const sideNavTriggerEl = document.querySelector('.sidenav-trigger');
const levelSelect = document.querySelector('.level-select select');
const roundSelect = document.querySelector('.round-select input');
const roundLabel = document.querySelector('.round-label');
const userName = document.querySelector('.avatar__name');
const errorMessage = document.querySelector('.error-text');
const userWords = document.querySelector('.user-words-checkbox');
const allCards = document.querySelector('.container__cards');
const allWords = document.querySelector('.container__words');

const WORD_INPUT = document.querySelector('.word-input');
const WORD_TRANSLATION = document.querySelector('.translation');
const LEVELS = document.querySelectorAll('.point');
const SPEAK_BTN = document.querySelector('.user-speech');
const SCORE = document.querySelector('.score');
const RESTART = document.querySelector('.restart');
const RESULTS_BTN = document.querySelector('.result');
const RESULTS = document.querySelector('.results');
const RETURN = document.querySelector('.return');
const NEW_GAME = document.querySelector('.new-game');
const ERRORS = document.querySelector('.errors-num');
const KNOW = document.querySelector('.success-num');
const RESULTS_ERRORS = document.querySelector('.errors-item');
const RESULTS_KNOW = document.querySelector('.success-item');
const ERRORS_MAX_COUNT = 10;
const speechRecognitionLanguage = 'en-US';

export {
  introPage,
  startBtn,
  gamePage,
  gameContainer,
  userName,
  roundSelect,
  roundLabel,
  levelSelect,
  userWords,
  allCards,
  allWords,
  ERRORS_MAX_COUNT,
};
