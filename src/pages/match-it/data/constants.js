const DATA_PATH = 'https://raw.githubusercontent.com/anasidorovich/rslang-data/master';
const LEVELS_MAX_COUNT = 6;
const ROUNDS_MAX_COUNT = 66;
const ERRORS_MAX_COUNT = 9;
const DEFAULT_ROUND = '1.1';
const USER_DEFAULT_ROUND = '0.1';

const introPage = document.querySelector('.intro');
const startBtn = document.querySelector('.intro-btn');
const gameContainer = document.querySelector('.container');
const sideNavBurger = document.querySelector('.sidenav-trigger');
const gamePage = document.querySelector('.game-page');
const levelSelect = document.querySelector('.level-select select');
const roundSelect = document.querySelector('.round-select input');
const roundLabel = document.querySelector('.round-label');
const userName = document.querySelector('.avatar__name');
const allCards = document.querySelector('.container__cards');
const allWords = document.querySelector('.container__words');
const restartBtn = document.querySelector('.restart');
const checkBtn = document.querySelector('.result');
const returnBtn = document.querySelector('.return');
const nextBtn = document.querySelector('.next');
const scoreLabel = document.querySelector('.score');
const results = document.querySelector('.game-results');
const errorMessage = document.querySelector('.error-text');
const errorsLabel = document.querySelector('.errors-num');
const knowsLabel = document.querySelector('.success-num');
const resultsErrors = document.querySelector('.errors-item');
const resultsKnows = document.querySelector('.success-item');

export {
  introPage,
  startBtn,
  sideNavBurger,
  gamePage,
  gameContainer,
  userName,
  roundSelect,
  roundLabel,
  levelSelect,
  allCards,
  allWords,
  returnBtn,
  nextBtn,
  checkBtn,
  restartBtn,
  scoreLabel,
  results,
  errorMessage,
  errorsLabel,
  knowsLabel,
  resultsErrors,
  resultsKnows,
  DATA_PATH,
  LEVELS_MAX_COUNT,
  ROUNDS_MAX_COUNT,
  ERRORS_MAX_COUNT,
  DEFAULT_ROUND,
  USER_DEFAULT_ROUND,
};
