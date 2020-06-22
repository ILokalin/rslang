import ServerAPI from '../server';

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
    const num = Math.floor(Math.random() * (words.length - 1 - 0 + 1)) + 0;
    return num === this.currentWordIndex ? this.wrongIndexTranslateWord() : num;
  }

  wrongAnswer() {
    gameView.classList.add('wrong');
    setTimeout(() => gameView.classList.remove('wrong'), 200);
    this.seriesRightAnswer = this.startSeriesPoint;
    GameSprint.removeRightSeriesViewPoint();
    this.defaultLeavelView();
    this.poinForRightAnswer = 10;
    blockSeries.style.background = 'white';
    seriesPoinMultiplayVIew.innerText = '';

    answerImage.classList.add('answer_img--wrong');
    setTimeout(() => answerImage.classList.remove('answer_img--wrong'), 200);
  }

  rightAnswer() {
    gameView.classList.add('right');
    setTimeout(() => gameView.classList.remove('right'), 200);

    answerImage.classList.add('answer_img--right');
    setTimeout(() => answerImage.classList.remove('answer_img--right'), 200);

    this.gameScore += this.poinForRightAnswer;
    scoreView.innerHTML = `${this.gameScore}`;
    this.seriesRightAnswer += this.seriesPoint;
    if (this.seriesRightAnswer < 4) {
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
    this.levelPointScore += 1;
    GameSprint.removeRightSeriesViewPoint();
    switch (this.levelPointScore) {
      case 1:
        blockSeries.style.background = 'white';
        this.poinForRightAnswer = 10;
        seriesPoinMultiplayVIew.innerText = '';
        seriesImage.innerText = 'Уровень 1';
        seriesImage.style.background = 'green';
        break;
      case 2:
        blockSeries.style.background = 'linear-gradient(40deg,#00bf82,#0099ae)';
        this.poinForRightAnswer = 20;
        seriesPoinMultiplayVIew.innerText = '+20 очков за слово';
        seriesImage.innerText = 'Уровень 2';
        seriesImage.style.background = 'linear-gradient(40deg,#00bf82,#0099ae)';
        break;
      case 3:
        blockSeries.style.background = 'linear-gradient(40deg,#ffd86f,#fc6262)';
        this.poinForRightAnswer = 40;
        seriesPoinMultiplayVIew.innerText = '+40 очков за слово';
        seriesImage.innerText = 'Уровень 3';
        seriesImage.style.background = 'linear-gradient(40deg,#ffd86f,#fc6262)';
        break;
      default:
        blockSeries.style.background = 'linear-gradient(40deg,#df1fe2,#fc6262)';
        this.poinForRightAnswer = 80;
        seriesPoinMultiplayVIew.innerText = '+80 очков за слово';
        seriesImage.innerText = 'Уровень 4';
        seriesImage.style.background = 'linear-gradient(40deg,#df1fe2,#fc6262)';
    }
    this.seriesRightAnswer = this.startSeriesPoint;
  }

  defaultLeavelView() {
    this.levelPointScore = 1;
    blockSeries.style.background = 'white';
    seriesImage.innerText = 'Уровень 1';
    seriesImage.style.background = 'green';
  }

  static startTimerView() {
    timerWrap.remove();
    timeWrapper.appendChild(timerWrap);
  }

  startGame() {
    timerWrap.remove();
    blockSeries.style.background = 'white';
    seriesPoinMultiplayVIew.innerText = '';
    startGameButton.addEventListener('click', () => {
      words.sort(() => Math.random() - 0.5);
      console.log(words);
      this.gameScore = 0;
      scoreView.innerHTML = `${this.gameScore}`;
      GameSprint.startTimerView();
      startGameButton.classList.add('hide');
      gameView.classList.remove('hide');
      this.defaultLeavelView();
      GameSprint.removeRightSeriesViewPoint();

      this.currentGameTime = this.gameTime;
      this.currentWordIndex = 0;
      this.seriesRightAnswer = 0;
      this.seriesPoint = 1;
      this.startSeriesPoint = 0;
      this.poinForRightAnswer = 10;

      this.updateTime(this.currentGameTime);
      this.renderWords();
    });
  }

  answerButtonsEvent() {
    buttonWrong.addEventListener('click', () => {
      this.currentWordIndex += 1;
      if (this.translateWordStatus) {
        this.wrongAnswer();
      } else {
        this.rightAnswer();
      }
      this.renderWords();
    });

    buttonRight.addEventListener('click', () => {
      this.currentWordIndex += 1;
      if (this.translateWordStatus) {
        this.rightAnswer();
      } else {
        this.wrongAnswer();
      }
      this.renderWords();
    });
  }

  // async init() {
  //   const ser = new ServerAPI(); // TODO
  //   const wordsServer = await ser.getWords();
  //   wordsServer.map(({ word, wordTranslate }) => {
  //     return words.push({ word, wordTranslate })
  //   });
  //   console.log(words);
  //   this.startGame();
  //   this.answerButtonsEvent();
  // }

  init() {
    const ser = new ServerAPI(); // TODO
    const wordsServer = ser.getWords();
    wordsServer.then((data) =>
      data.map(({ word, wordTranslate }) => {
        words.push({ word, wordTranslate });
        return ser.getWords();
      }),
    );
    // .then((data2) =>
    //   data2.map(({ word, wordTranslate }) => {
    //     words.push({ word, wordTranslate });
    //     return words;
    //   }),
    // );

    //   wordsServer.then((data) => data.map(({ word, wordTranslate }) => {
    //     words.push({ word, wordTranslate })
    //     return ser.getWords(1, 1)
    //  })).then ((data2) => data2.map(({ word, wordTranslate }) => {
    //    console.log(data2);
    //   words.push({ word, wordTranslate });
    //   return words}));
    this.startGame();
    this.answerButtonsEvent();
  }
}
