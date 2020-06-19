export const DATA_PATH = 'https://raw.githubusercontent.com/anasidorovich/rslang-data/master';

const INTRO = document.querySelector('.intro');
const START_BTN = document.querySelector('.intro-btn');
const GAME_CONTAINER = document.querySelector('.container');
const CARDS_ITEMS = document.querySelector('.items');
const WORD_IMG = document.querySelector('.word-img');
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
const WIN = document.querySelector('.win-wrapper');
const RESULTS_WINDOW = document.querySelector('.results');
const RESULTS_ERRORS = document.querySelector('.errors');
const RESULTS_KNOW = document.querySelector('.success');
const ERRORS_MAX_COUNT = 10;

export {
  INTRO,
  START_BTN,
  GAME_CONTAINER,
  CARDS_ITEMS,
  LEVELS,
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
};
