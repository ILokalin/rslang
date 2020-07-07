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
const nextBtn = document.querySelector('.next');
const scoreLabel = document.querySelector('.score');
const errorMessage = document.querySelector('.error-text');
const defaultUser = 'Unknown';

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
  nextBtn,
  checkBtn,
  restartBtn,
  scoreLabel,
  errorMessage,
  defaultUser,
  DATA_PATH,
  LEVELS_MAX_COUNT,
  ROUNDS_MAX_COUNT,
  ERRORS_MAX_COUNT,
  DEFAULT_ROUND,
  USER_DEFAULT_ROUND,
};
