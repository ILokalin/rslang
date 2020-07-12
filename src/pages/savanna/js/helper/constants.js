const appStartButton = document.querySelector('.app-start');
const intro = document.querySelector('.intro');
const gameStartButton = document.querySelector('.startGame');
const restartButton = document.querySelector('.restart');
const currentGameStage = document.querySelector('.stage');
const hearts = document.querySelectorAll('.heart');
const gameContainer = document.querySelector('.game-container');
const gameHeader = document.querySelector('.game-header');
const soundButton = document.querySelector('.sound-switcher');
const fallingWordText = document.querySelector('.falling-word__item');
const fallingWordElement = document.querySelector('.falling-word');
const answerElements = document.querySelectorAll('.answer-options__item');
const answerContainer = document.querySelector('.answer-options');
const userNameElement = document.querySelector('.avatar__name');
const health = 5;
const statistic = document.querySelector('.statistic');
const errorCount = document.querySelector('.answers-invalid-title');
const errorTable = document.querySelector('.answers-invalid-items');
const knowCount = document.querySelector('.answers-valid-title');
const knowTable = document.querySelector('.answers-valid-items');
const levelOption = document.querySelector('.level');
const roundOption = document.querySelector('.round');
const audio = document.querySelector('.audio');
const repeatOption = document.querySelector('.repeat');
const levelAndRoundselectors = document.querySelectorAll('.game-option');
const statisticContainer = document.querySelector('.statistic-container');
const healtBar = document.querySelector('.healt-bar');
const menu = document.querySelector('.sidenav');
const soundIcon = document.querySelector('.sound-icon');
const nextRoundButton = document.querySelector('.next-round');
const popUpError = document.querySelector('.popup-error');
const mainContainer = document.querySelector('.main');
const refreshButton = document.querySelector('.refresh');

export {
  appStartButton,
  intro,
  gameStartButton,
  currentGameStage,
  hearts,
  gameContainer,
  gameHeader,
  soundButton,
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
  levelAndRoundselectors,
  statisticContainer,
  healtBar,
  menu,
  soundIcon,
  nextRoundButton,
  popUpError,
  mainContainer,
  refreshButton,
};
