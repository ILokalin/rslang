const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const backButton = document.querySelector('.back');
const guessWord = document.querySelector('.game-savanna__question-word');
const guessContainer = document.querySelector('.game-savanna__question-container');
const answerContsainer = document.querySelector('.game-savanna__answer-container');
const appContainer = document.querySelector('.app-savanna');
const header = document.querySelector('.header-savanna');
const startMenu = document.querySelector('.start-menu-container');
const gameContainer = document.querySelector('.game-savanna');
const resultContainer = document.querySelector('.results-container');
const stat = document.querySelector('.result');
const audio = document.querySelector('.audio');
const gameData = {
    currentCards: [],
    count: 0,
    wordContainer: [],
    knowWords: [],
    errorWords: [],
    currentRound: 5,
    currentLevel: 6,
    roundStreak: 0,
    health: 5,
}

export { startButton, restartButton, backButton, guessWord, guessContainer, answerContsainer, appContainer, header, startMenu, gameContainer, resultContainer, stat, audio, gameData };