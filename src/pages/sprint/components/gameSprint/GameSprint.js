import { DataController } from 'Service/DataController';
// eslint-disable-next-line no-undef
M.AutoInit();

const startGameButton = document.getElementById('controls_start-btn');
const scoreView = document.getElementById('score');
const gameContainer = document.getElementById('container');
const gameView = document.getElementById('game');
const wordView = document.getElementById('studied-word');
const wordTranslateView = document.getElementById('studied-word--translated');
const seriesPoinMultiplayVIew = document.getElementById('point-multiplay-text');
const seriesRightAnswerView = document.querySelectorAll('#corect-answer');
const answerImage = document.getElementById('answer_img');
const buttonWrong = document.getElementById('wrong-btn');
const buttonRight = document.getElementById('right-btn');
const preload = document.getElementById('preload');
const blockSeries = document.getElementById('series');
const timetVIew = document.getElementById('timer');
const timerWrap = document.getElementById('timer-wrap');
const timeWrapper = document.getElementById('timer-wrapper');
const stepToNextWordIndex = 1;
const defaultGameScoreValue = 0;
const timeAnswerResultVIew = 200;
const poinForNextLevel = 4;
const minWordsForGameValue = 150;
const seriesViewDefaulltBackgraundColor = 'white';
const parrotYellow = document.getElementById('parrot-yellow');
const parrotBrown = document.getElementById('parrot-brown');
const parrotPink = document.getElementById('parrot-pink');
const avatarName = document.getElementById('avatar__name');
const dropDownMenu = document.querySelectorAll('.dropdown-content');
const dropDownMenuElement = dropDownMenu[0].querySelectorAll('span');
const dataController = new DataController();
const LevelViewInfo = {
  one: {
    color: seriesViewDefaulltBackgraundColor,
    seriesText: '',
    levelPoints: 10,
  },
  two: {
    color: 'linear-gradient(40deg,#00bf82,#0099ae',
    seriesText: '+20 очков за слово',
    levelPoints: 20,
  },
  three: {
    color: 'linear-gradient(40deg,#ffd86f,#fc6262)',
    seriesText: '+40 очков за слово',
    levelPoints: 40,
  },
  four: {
    color: 'linear-gradient(40deg,#df1fe2,#fc6262)',
    seriesText: '+80 очков за слово',
    levelPoints: 80,
  },
};
const clearTextValue = '';
let words = [];

export default class GameSprint {
  constructor(score) {
    this.gameTime = 60;
    this.currentGameTime = 0;
    this.stopGameTime = 0;
    this.stepTime = 1;
    this.currentWordIndex = 0;
    this.seriesRightAnswer = 0;
    this.seriesPoint = 1;
    this.startSeriesPoint = 0;
    this.levelPointScore = 1;
    this.poinForRightAnswer = 10;
    this.gameScore = score;
    this.gameLevel = 1;
  }

  updateTime(gameTime) {
    timetVIew.innerText = this.currentGameTime;
    if (this.currentGameTime > this.stopGameTime) {
      this.timer = setTimeout(() => {
        this.updateTime(this.currentGameTime);
      }, 1000);
    } else {
      startGameButton.classList.remove('hide');
      gameView.classList.add('hide');
      timerWrap.classList.remove('timer_line');
    }
    this.currentGameTime = gameTime - this.stepTime;
  }

  renderWords() {
    wordView.innerHTML = words[this.currentWordIndex].word;
    this.renderTranslateWord(Math.round(Math.random()));
  }

  renderTranslateWord(translationStatus) {
    if (translationStatus) {
      wordTranslateView.innerHTML = words[this.currentWordIndex].wordTranslate;
    } else {
      wordTranslateView.innerHTML = words[this.wrongIndexTranslateWord()].wordTranslate;
    }
    this.translateWordStatus = translationStatus;
  }

  wrongIndexTranslateWord() {
    const indexWrongTranslateWord = Math.floor(Math.random() * (words.length));
    return indexWrongTranslateWord === this.currentWordIndex
      ? this.wrongIndexTranslateWord()
      : indexWrongTranslateWord;
  }

  wrongAnswer() {
    const { one } = LevelViewInfo;
    gameContainer.classList.add('wrong-answer');
    setTimeout(() => gameContainer.classList.remove('wrong-answer'), timeAnswerResultVIew);
    this.seriesRightAnswer = this.startSeriesPoint;
    GameSprint.removeRightSeriesViewPoint();
    this.defaultLeavelView();
    this.poinForRightAnswer = one.levelPoints;
    blockSeries.style.background = one.color;
    seriesPoinMultiplayVIew.innerText = one.levelText;

    answerImage.classList.add('answer_img--wrong');
    setTimeout(() => answerImage.classList.remove('answer_img--wrong'), timeAnswerResultVIew);
    seriesRightAnswerView[0].classList.remove('hide');
    seriesRightAnswerView[2].classList.remove('hide');
    seriesRightAnswerView[1].classList.remove('series_answer--right-final');
  }

  rightAnswer() {
    gameContainer.classList.add('right-answer');
    setTimeout(() => gameContainer.classList.remove('right-answer'), timeAnswerResultVIew);

    answerImage.classList.add('answer_img--right');
    setTimeout(() => answerImage.classList.remove('answer_img--right'), timeAnswerResultVIew);

    this.gameScore += this.poinForRightAnswer;
    scoreView.innerHTML = `${this.gameScore}`;
    this.seriesRightAnswer += this.seriesPoint;
    if (this.seriesRightAnswer < poinForNextLevel) {
      for (let i = 0; i <= this.seriesRightAnswer - 1; i += 1) {
        seriesRightAnswerView[i].classList.add('series_answer--right');
      }
    } else {
      this.transitionOnNextLevel();
    }
  }

  static removeRightSeriesViewPoint() {
    for (let i = 0; i <= seriesRightAnswerView.length - 1; i += 1) {
      seriesRightAnswerView[i].classList.remove('series_answer--right');
    }
  }

  transitionOnNextLevel() {
    const { one, two, three, four } = LevelViewInfo;

    this.levelPointScore += 1;
    GameSprint.removeRightSeriesViewPoint();

    switch (this.levelPointScore) {
      case 1:
        blockSeries.style.background = one.color;
        this.poinForRightAnswer = one.levelPoints;
        seriesPoinMultiplayVIew.innerText = one.seriesText;
        break;
      case 2:
        blockSeries.style.background = two.color;
        this.poinForRightAnswer = two.levelPoints;
        seriesPoinMultiplayVIew.innerText = two.seriesText;
        parrotYellow.classList.remove('hide');
        break;
      case 3:
        blockSeries.style.background = three.color;
        this.poinForRightAnswer = three.levelPoints;
        seriesPoinMultiplayVIew.innerText = three.seriesText;
        parrotBrown.classList.remove('hide');
        break;
      default:
        blockSeries.style.background = four.color;
        this.poinForRightAnswer = four.levelPoints;
        seriesPoinMultiplayVIew.innerText = four.seriesText;
        parrotPink.classList.remove('hide');
        seriesRightAnswerView[0].classList.add('hide');
        seriesRightAnswerView[2].classList.add('hide');
        seriesRightAnswerView[1].classList.add('series_answer--right-final');
    }
    this.seriesRightAnswer = this.startSeriesPoint;
  }

  defaultLeavelView() {
    this.levelPointScore = 1;
    blockSeries.style.background = seriesViewDefaulltBackgraundColor;
    parrotYellow.classList.add('hide');
    parrotBrown.classList.add('hide');
    parrotPink.classList.add('hide');
  }

  static startTimerView() {
    timerWrap.remove();
    timeWrapper.appendChild(timerWrap);
  }

  defaultGameValue() {
    this.currentGameTime = this.gameTime;
    this.currentWordIndex = 0;
    this.seriesRightAnswer = 0;
    this.seriesPoint = 1;
    this.startSeriesPoint = 0;
    this.poinForRightAnswer = 10;
  }

  stratButtonEvents() {
    startGameButton.addEventListener('click', () => {
      clearTimeout(this.timer);
      this.keyboardEvents();
      this.defaultGameValue();
      this.gameScore = defaultGameScoreValue;
      console.log(words);
      words.sort(() => Math.random() - 0.5);

      blockSeries.style.background = seriesViewDefaulltBackgraundColor;
      seriesPoinMultiplayVIew.innerText = clearTextValue;
      scoreView.innerHTML = `${this.gameScore}`;
      this.defaultLeavelView();

      GameSprint.removeRightSeriesViewPoint();
      GameSprint.startTimerView();

      startGameButton.classList.add('hide');
      gameView.classList.remove('hide');

      this.updateTime(this.currentGameTime);
      this.renderWords();
    });
  }

  startGame() {
    timerWrap.remove();
    this.stratButtonEvents();
  }

  answerButtonsEvent() {
    buttonWrong.addEventListener('click', () => {
      this.currentWordIndex += stepToNextWordIndex;

      if (this.translateWordStatus) {
        this.wrongAnswer();
      } else {
        this.rightAnswer();
      }
      this.renderWords();
    });

    buttonRight.addEventListener('click', () => {
      this.currentWordIndex += stepToNextWordIndex;

      if (this.translateWordStatus) {
        this.rightAnswer();
      } else {
        this.wrongAnswer();
      }
      this.renderWords();
    });
  }

  keyboardEvents() {
    document.addEventListener('keydown', (e) => {
      if (this.currentGameTime > this.stopGameTime) {
        if (e.keyCode === 37) {
          buttonWrong.click();
        } else if (e.keyCode === 39) {
          buttonRight.click();
        }
      }
    });
  }

  getWordsForGame(level) {
    preload.classList.remove('hide');
    if (level === '0') {
      dataController.userWordsGetAll(['onlearn'])
        .then(
          (value) => {
            const { paginatedResults } = value[0];
            paginatedResults.flat().map(({ word, wordTranslate }) => {
              preload.classList.add('hide');
              return words.push({ word, wordTranslate });
            });
          },
          (reason) => {
            answerImage.innerText = `${reason}`;
          },
        ).then(() => {
          if (words.length < minWordsForGameValue) {
            dropDownMenu[0].childNodes[0].style.pointerEvents = 'none';
            dropDownMenu[0].childNodes[1].click();
            dropDownMenu[0].childNodes[0].setAttribute('title', 'Недост изученных слов')
            dropDownMenuElement[0].innerHTML = 'Слова пользователя (недостаточно слов)'
          } else {
            dropDownMenu[0].childNodes[0].style.pointerEvents = 'auto';
            dropDownMenu[0].childNodes[0].removeAttribute('title')
            dropDownMenuElement[0].innerHTML = 'Слова пользователя'
          }
        })
    }
    else {
      console.log(this.gameLevel);
      dataController.getWords({ group: this.gameLevel - 1, page: 1, wordsPerPage: 200 })
        .then(
          (value) => {
            value.flat().map(({ word, wordTranslate }) => {
              preload.classList.add('hide');
              return words.push({ word, wordTranslate });
            });
          },
          (reason) => {
            answerImage.innerText = `${reason}`;
          },
        );
    }
  }

  choiceLevel() {
    dropDownMenuElement.forEach((el, index) => {
      el.setAttribute('data-id', index);
      el.addEventListener('click', (e) => {
        words = [];
        this.gameLevel = e.target.dataset.id;
        console.log(this.gameLevel);
        this.getWordsForGame(this.gameLevel);
        startGameButton.classList.remove('hide');
        gameView.classList.add('hide');
        timerWrap.classList.remove('timer_line');
        timerWrap.remove();
        this.defaultGameValue();
        localStorage.setItem('level', this.gameLevel);
      })
    })
  }

  constrolLevelAfterReload() {
    if (localStorage.getItem('level') && localStorage.getItem('level')) {
      this.gameLevel = localStorage.getItem('level');
    }
  }

  init() {
    timerWrap.remove();
    dataController.getUser().then(
      (userSettings) => {
        avatarName.innerText = userSettings.name;
        this.gameLevel = 0;
        this.constrolLevelAfterReload();
        preload.classList.remove('hide');
        this.getWordsForGame(this.gameLevel);
        this.startGame();
        this.answerButtonsEvent();
        this.choiceLevel();
        dropDownMenu[0].childNodes[0].classList.remove('hide');
        dropDownMenu[0].childNodes[this.gameLevel].click();
      },
      (rejectReport) => {
        console.log(rejectReport);
        this.constrolLevelAfterReload();
        this.getWordsForGame(this.gameLevel);
        this.startGame();
        this.answerButtonsEvent();
        this.choiceLevel();
        dropDownMenu[0].childNodes[0].classList.add('hide');
        dropDownMenu[0].childNodes[this.gameLevel].click();
      },
    );
  }

}
