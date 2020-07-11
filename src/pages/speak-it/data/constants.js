const DATA_PATH = 'https://raw.githubusercontent.com/anasidorovich/rslang-data/master';
const INTRO = document.querySelector('.intro');
const START_BTN = document.querySelector('.intro-btn');
const GAME_CONTAINER = document.querySelector('.container');
const CARDS_ITEMS = document.querySelector('.items');
const WORD_IMG = document.querySelector('.word-img');
const WORD_INPUT = document.querySelector('.word-input');
const WORD_TRANSLATION = document.querySelector('.translation');
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
const sideNavTriggerEl = document.querySelector('.sidenav-trigger');
const levelSelectEl = document.querySelector('.level-select select');
const roundSelectEl = document.querySelector('.round-select input');
const roundLabelEl = document.querySelector('.round-label');
const userNameEl = document.querySelector('.avatar__name');
const errorMessageEl = document.querySelector('.error-text');
const LEVELS_MAX_COUNT = 6;
const ROUNDS_MAX_COUNT = 60;
const DEFAULT_ROUND = '1.1';
const USER_DEFAULT_ROUND = '0.1';
const ATTEMPTS_PER_WORD = 3;
const SCORE_TOTAL_COUNT = 5;

export {
  DATA_PATH,
  INTRO,
  START_BTN,
  GAME_CONTAINER,
  CARDS_ITEMS,
  SCORE,
  SCORE_TOTAL_COUNT,
  ERRORS_MAX_COUNT,
  WORD_IMG,
  WORD_TRANSLATION,
  WORD_INPUT,
  SPEAK_BTN,
  RESULTS,
  RESULTS_BTN,
  RESTART,
  RETURN,
  NEW_GAME,
  ERRORS,
  RESULTS_ERRORS,
  KNOW,
  RESULTS_KNOW,
  LEVELS_MAX_COUNT,
  ROUNDS_MAX_COUNT,
  DEFAULT_ROUND,
  USER_DEFAULT_ROUND,
  ATTEMPTS_PER_WORD,
  speechRecognitionLanguage,
  sideNavTriggerEl,
  levelSelectEl,
  roundSelectEl,
  roundLabelEl,
  userNameEl,
  errorMessageEl,
};
