const appStartButton = document.querySelector('.app-start');
const intro = document.querySelector('.intro');
const difficultMenu = document.querySelector('.difficult');
const gameStartButton = document.querySelector('.startGame');
const restartButton = document.querySelector('.restart');
const currentGameStage = document.querySelector('.stage');
const hearts = document.querySelectorAll('.heart');
const gameContainer = document.querySelector('.game-container');
const gameHeader = document.querySelector('.game-header');
const soundSwitcher = document.querySelector('.sound-switcher');
const fallingWordText = document.querySelector('.falling-word__item');
const fallingWordElement = document.querySelector('.falling-word');
const answerElements = document.querySelectorAll('.answer-options__item');
const answerContainer = document.querySelector('.answer-options');
const userNameElement = document.querySelector('.user-name');
const health = 5;
const statistic = document.querySelector('.statistic');
const errorCount = document.querySelector('.error-count ');
const errorTable = document.querySelector('.error-table');
const knowCount = document.querySelector('.know-count');
const knowTable = document.querySelector('.know-table');
const levelOption = document.querySelector('.level');
const roundOption = document.querySelector('.round');
const audio = document.querySelector('.audio');
const repeatOption = document.querySelector('.repeat');
const preloader = document.querySelector('.preloader-background');
const levelAndRoundselectors = document.querySelectorAll('.game-option');

export {
  appStartButton,
  intro,
  difficultMenu,
  gameStartButton,
  currentGameStage,
  hearts,
  gameContainer,
  gameHeader,
  soundSwitcher,
  fallingWordText,
  answerElements,
  answerContainer,
  health,
  fallingWordElement,
  userNameElement,
  errorCount,
  knowCount,
  errorTable,
  knowTable,
  statistic,
  restartButton,
  levelOption,
  roundOption,
  audio,
  repeatOption,
  preloader,
  levelAndRoundselectors,
};
