const appStartButton = document.querySelector('.app-start');
const intro = document.querySelector('.intro');
const difficultMenu = document.querySelector('.difficult');
const gameStartButton = document.querySelector('.startGame');
const currentGameStage = document.querySelector('.stage');
const healtBar = document.querySelector('.healt-bar');
const gameContainer = document.querySelector('.game-container');
const gameHeader = document.querySelector('.game-header');
const soundSwitcher = document.querySelector('.sound-switcher');
const fallingWordText = document.querySelector('.falling-word__item');
const fallingWordElement = document.querySelector('.falling-word');
const answerElements = document.querySelectorAll('.answer-options__item');
const answerContainer = document.querySelector('.answer-options');
const userNameElement = document.querySelector('.user-name');
const levelSelector = document.querySelector('.level');
const roundSelector = document.querySelector('.round');
const health = 5;

const gameData = {
  currentCards: [],
  count: 0,
  wordContainer: [],
  knowWords: [],
  errorWords: [],
  currentRound: 1,
  currentLevel: 1,
  roundStreak: 0,
  health: 5,
};

export {
  appStartButton,
  intro,
  difficultMenu,
  gameStartButton,
  currentGameStage,
  healtBar,
  gameData,
  gameContainer,
  gameHeader,
  soundSwitcher,
  fallingWordText,
  answerElements,
  answerContainer,
  health,
  fallingWordElement,
  userNameElement,
  levelSelector,
  roundSelector,
};
