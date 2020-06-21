const STARTBTN = document.querySelector('.start');
const RESTARTBTN = document.querySelector('.restart');
const BACKBTN = document.querySelector('.back');
const GUESSWORD = document.querySelector('.main-savanna__question-word');
const GUESSCONTAINER = document.querySelector('.main-savanna__question-container');
const ANSWERCONTAINER = document.querySelector('.main-savanna__answer-container');
const HEADER = document.querySelector('.header-savanna');
const STARTMENU = document.querySelector('.start-menu-container');
const GAMECONTAINER = document.querySelector('.main-savanna');
const ANSWERS = document.querySelectorAll('.main-savanna__answer-word');
const INFO = document.querySelector('.results-container');
const STAT = document.querySelector('.result');
const GAMEDATA = {
    currentCards: [],
    count: 0,
    wordContainer: [],
    knowWords: [],
    errorWords: [],
    currentRound: 1,
    currentLevel: 1,
    roundStreak: 0,
    health: 5,
}

export { STARTBTN, BACKBTN, GUESSWORD, ANSWERCONTAINER, HEADER, STARTMENU, GAMECONTAINER, ANSWERS, GAMEDATA, INFO, RESTARTBTN, STAT, GUESSCONTAINER };