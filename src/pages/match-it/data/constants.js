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
const restartBtn = document.querySelector('.restart');
const checkBtn = document.querySelector('.result');
const nextBtn = document.querySelector('.next');
const scoreLabel = document.querySelector('.score');

const LEVELS_MAX_COUNT = 6;
const ROUNDS_MAX_COUNT = 66;
const ERRORS_MAX_COUNT = 9;

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
  userWords,
  allCards,
  allWords,
  LEVELS_MAX_COUNT,
  ROUNDS_MAX_COUNT,
  ERRORS_MAX_COUNT,
  nextBtn,
  checkBtn,
  restartBtn,
  scoreLabel,
};
