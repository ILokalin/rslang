const INTRO = document.querySelector('.intro');
const START_BTN = document.querySelector('.intro-btn');
const GAME_CONTAINER = document.querySelector('.container');
const CARDS_ITEMS = document.querySelector('.items');
const WORD_IMG = document.querySelector('.word-img');
const WORD_INPUT = document.querySelector('.images input');
const LEVELS = document.querySelectorAll('.point');
const SPEAK_BTN = document.querySelector('.user-speech');
const SCORE = document.querySelector('.score');
const RESTART = document.querySelector('.restart');
const RESULTS = document.querySelector('.result');
const RETURN = document.querySelector('.return');
const NEW_GAME = document.querySelector('.new-game');
const WIN = document.querySelector('.win-wrapper');
const RESULTS_WINDOW = document.getElementById('results');
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
  WORD_INPUT,
};
