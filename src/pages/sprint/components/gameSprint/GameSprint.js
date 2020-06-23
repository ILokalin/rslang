import { DataController } from '../../../../service/DataController';

const startGameButton = document.getElementById('controls_start-btn');
const scoreView = document.getElementById('score');
const gameView = document.getElementById('game');
const wordView = document.getElementById('studied-word');
const wordTranslateView = document.getElementById('studied-word--translated');
const seriesPoinMultiplayVIew = document.getElementById('point-multiplay-text');
const seriesRightAnswerView = document.querySelectorAll('#corect-answer');
const answerImage = document.getElementById('answer_img');
const buttonWrong = document.getElementById('wrong-btn');
const buttonRight = document.getElementById('right-btn');
const blockSeries = document.getElementById('series');
const timetVIew = document.getElementById('timer');
const timerWrap = document.getElementById('timer-wrap');
const timeWrapper = document.getElementById('timer-wrapper');
const seriesImage = document.getElementById('series-image');
const stepToNextWordIndex = 1;
const defaultGameScoreValue = 0;
const timeAnswerResultVIew = 200;
const poinForNextLevel = 4;
const seriesViewDefaulltBackgraundColor = 'white';
const seriesImageDefaultBackgraundColor = 'linear-gradient(40deg, rgb(210, 239, 26), rgb(178, 231, 12));';
const LevelViewInfo = {
  one: {
    color: seriesViewDefaulltBackgraundColor,
    seriesText: '',
    levelText: 'Уровень 1',
    levelPoints: 10,
  },
  two: {
    color: 'linear-gradient(40deg,#00bf82,#0099ae',
    seriesText: '+20 очков за слово',
    levelText: 'Уровень 2',
    levelPoints: 20,
  },
  three: {
    color: 'linear-gradient(40deg,#ffd86f,#fc6262)',
    seriesText: '+40 очков за слово',
    levelText: 'Уровень 3',
    levelPoints: 40,
  },
  four: {
    color: 'linear-gradient(40deg,#df1fe2,#fc6262)',
    seriesText: '+80 очков за слово',
    levelText: 'Уровень 4',
    levelPoints: 80,
  },
};
const clearTextValue = '';
const words = [];

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
  }

  updateTime(gameTime) {
    timetVIew.innerText = this.currentGameTime;
    if (this.currentGameTime > this.stopGameTime) {
      setTimeout(() => {
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
    const indexWrongTranslateWord = Math.floor(Math.random() * (words.length - 1 - 0 + 1)) + 0;
    return indexWrongTranslateWord === this.currentWordIndex
      ? this.wrongIndexTranslateWord()
      : indexWrongTranslateWord;
  }

  wrongAnswer() {
    const {one} = LevelViewInfo;
    gameView.classList.add('wrong');
    setTimeout(() => gameView.classList.remove('wrong'), timeAnswerResultVIew);
    this.seriesRightAnswer = this.startSeriesPoint;
    GameSprint.removeRightSeriesViewPoint();
    this.defaultLeavelView();
    this.poinForRightAnswer = one.levelPoints;
    blockSeries.style.background = one.color;
    seriesPoinMultiplayVIew.innerText = one.levelText;

    answerImage.classList.add('answer_img--wrong');
    setTimeout(() => answerImage.classList.remove('answer_img--wrong'), timeAnswerResultVIew);
  }

  rightAnswer() {
    gameView.classList.add('right');
    setTimeout(() => gameView.classList.remove('right'), timeAnswerResultVIew);

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
    const {one, two, three ,four} = LevelViewInfo;

    this.levelPointScore += 1;
    GameSprint.removeRightSeriesViewPoint();

    switch (this.levelPointScore) {
      case 1:
        blockSeries.style.background = one.color;
        this.poinForRightAnswer = one.levelPoints;
        seriesPoinMultiplayVIew.innerText = one.seriesText;
        seriesImage.innerText = one.levelText;
        seriesImage.style.background = one.color;
        break;
      case 2:
        blockSeries.style.background = two.color;
        this.poinForRightAnswer = two.levelPoints;
        seriesPoinMultiplayVIew.innerText = two.seriesText;
        seriesImage.innerText = two.levelText;
        seriesImage.style.background = two.color;
        break;
      case 3:
        blockSeries.style.background = three.color;
        this.poinForRightAnswer = three.levelPoints;
        seriesPoinMultiplayVIew.innerText = three.seriesText;
        seriesImage.innerText = three.levelText;
        seriesImage.style.background = three.color;
        break;
      default:
        blockSeries.style.background = four.color;
        this.poinForRightAnswer = four.levelPoints;
        seriesPoinMultiplayVIew.innerText = four.seriesText;
        seriesImage.innerText = four.levelText;
        seriesImage.style.background = four.color;
    }
    this.seriesRightAnswer = this.startSeriesPoint;
  }

  defaultLeavelView() {
    this.levelPointScore = 1;
    blockSeries.style.background = seriesViewDefaulltBackgraundColor;
    seriesImage.innerText = 'Уровень 1';
    seriesImage.style.background = seriesImageDefaultBackgraundColor;
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
      this.defaultGameValue();
      this.gameScore = defaultGameScoreValue;

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

  static getWordsForGame() {
    const dataController = new DataController();
    Promise.all([
      dataController.getWords({ group: 0, page: 0 }),
      dataController.getWords({ group: 0, page: 1 }),
      dataController.getWords({ group: 0, page: 2 }),
      dataController.getWords({ group: 0, page: 3 }),
      dataController.getWords({ group: 0, page: 4 }),
    ]).then(
      (value) => {
        value.flat().map(({ word, wordTranslate }) => {
          return words.push({ word, wordTranslate });
        });
      },
      (reason) => {
        answerImage.innerText = `${reason}`;
      },
    );
  }

  init() {
    this.startGame();
    this.answerButtonsEvent();
    GameSprint.getWordsForGame();
  }
}
