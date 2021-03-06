import { DataController } from 'Service/DataController';
import { ElementGen } from 'Src/service/DomGen/DomGen';
import { PreloaderController } from 'Service/PreloaderController';
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
const blockSeries = document.getElementById('series');
const timetVIew = document.getElementById('timer');
const timerWrap = document.getElementById('timer-wrap');
const timeWrapper = document.getElementById('timer-wrapper');
const statistickDispaly = document.getElementById('statistick');
const category = document.getElementById('statistick-words');
const scoreStatistick = document.getElementById('score-statistick');
const statistickRight = document.getElementById('answer-statistick--right');
const statistickWrong = document.getElementById('answer-statistick--wrong');
const soundOn = document.getElementById('sound-controll--on');
const soundOff = document.getElementById('sound-controll--off');
const discription = document.getElementById('discription');
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
const preloaderController = new PreloaderController();
const soundRight = new Audio();
soundRight.src = '/sound/correct.mp3';
const soundFolse = new Audio();
soundFolse.src = '/sound/failure.mp3';

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
let wrongWords = [];
let wrongRight = [];

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
    this.countRightAnswers = 0;
    this.countWrongAnswers = 0;
    this.counterGames = 0;
    this.soundControll = true;
  }

  playSoundAnswers() {
    soundOn.addEventListener('click', () => {
      soundOn.classList.add('hide');
      soundOff.classList.remove('hide');
      this.soundControll = false;
      localStorage.setItem('soundControllSprint', false);
    });

    soundOff.addEventListener('click', () => {
      soundOn.classList.remove('hide');
      soundOff.classList.add('hide');
      this.soundControll = true;
      localStorage.setItem('soundControllSprint', true);
    });

    if (localStorage.getItem('soundControllSprint') === 'false') {
      soundOn.click();
    }
  }

  playWrongSound() {
    soundFolse.play();
    soundRight.pause();
    soundRight.currentTime = 0.0;
  }

  playRightSound() {
    soundRight.play();
    soundFolse.pause();
    soundFolse.currentTime = 0.0;
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
      this.finalStatistics();
      this.choiceLevel();
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
    const indexWrongTranslateWord = Math.floor(Math.random() * words.length);
    return indexWrongTranslateWord === this.currentWordIndex
      ? this.wrongIndexTranslateWord()
      : indexWrongTranslateWord;
  }

  wrongAnswer() {
    const { one } = LevelViewInfo;
    gameContainer.classList.add('wrong-answer');
    setTimeout(() => gameContainer.classList.remove('wrong-answer'), timeAnswerResultVIew);
    this.countWrongAnswers += this.seriesPoint;
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
    wrongWords.push(words[this.currentWordIndex]);
    this.currentWordIndex += stepToNextWordIndex;
    if (this.soundControll) {
      this.playWrongSound();
    }
  }

  rightAnswer() {
    gameContainer.classList.add('right-answer');
    setTimeout(() => gameContainer.classList.remove('right-answer'), timeAnswerResultVIew);

    answerImage.classList.add('answer_img--right');
    setTimeout(() => answerImage.classList.remove('answer_img--right'), timeAnswerResultVIew);

    this.countRightAnswers += this.seriesPoint;
    wrongRight.push(words[this.currentWordIndex]);
    this.currentWordIndex += stepToNextWordIndex;

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
    if (this.soundControll) {
      this.playRightSound();
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
    statistickDispaly.classList.add('hide');
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
    this.countRightAnswers = 0;
    this.countWrongAnswers = 0;
    wrongWords = [];
    wrongRight = [];
  }

  controllGameCount() {
    while (category.firstChild) {
      category.removeChild(category.firstChild);
    }
  }

  stratButtonEvents() {
    startGameButton.addEventListener('click', () => {
      gameContainer.classList.remove('opasity');
      discription.classList.add('hide');
      this.controllGameCount();
      clearTimeout(this.timer);
      this.keyboardEvents();
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
      if (this.translateWordStatus) {
        this.wrongAnswer();
      } else {
        this.rightAnswer();
      }
      this.renderWords();
    });

    buttonRight.addEventListener('click', () => {
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
    preloaderController.showPreloader();
    if (level === 0 || level === '0') {
      dataController
        .userWordsGetAll(['onlearn'])
        .then(
          (value) => {
            words = [];
            const { paginatedResults } = value[0];
            paginatedResults.flat().map(({ _id, word, wordTranslate }) => {
              return words.push({ _id, word, wordTranslate });
            });
            preloaderController.hidePreloader();
          },
          (reason) => {
            answerImage.innerText = `${reason}`;
          },
        )
        .then(() => {
          if (words.length < minWordsForGameValue) {
            dropDownMenu[0].childNodes[0].style.pointerEvents = 'none';
            dropDownMenu[0].childNodes[1].click();
            dropDownMenuElement[1].click();
            dropDownMenu[0].childNodes[0].setAttribute('title', 'Недост изученных слов');
            dropDownMenuElement[0].innerHTML = 'Слова пользователя (недостаточно слов)';
          } else {
            dropDownMenu[0].childNodes[0].style.pointerEvents = 'auto';
            dropDownMenu[0].childNodes[0].removeAttribute('title');
            dropDownMenuElement[0].innerHTML = 'Слова пользователя';
          }
        });
    } else {
      dataController.getWords({ group: this.gameLevel - 1, page: 1, wordsPerPage: 200 }).then(
        (value) => {
          words = [];
          value.flat().map(({ id, word, wordTranslate }) => {
            return words.push({ _id: id, word, wordTranslate });
          });
          preloaderController.hidePreloader();
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
        this.getWordsForGame(this.gameLevel);
        startGameButton.classList.remove('hide');
        gameView.classList.add('hide');
        timerWrap.classList.remove('timer_line');
        timerWrap.remove();
        this.defaultGameValue();
        localStorage.setItem('levelSprint', this.gameLevel);
      });
    });
  }

  constrolLevelAfterReload() {
    if (
      localStorage.getItem('levelSprint') !== '0' &&
      localStorage.getItem('levelSprint') != null
    ) {
      this.gameLevel = localStorage.getItem('levelSprint');
    }
  }

  finalStatistics() {
    preloaderController.showPreloader();
    scoreStatistick.innerHTML = `Результат игры ${this.gameScore} очков`;
    statistickRight.innerHTML = `${this.countRightAnswers}`;
    statistickWrong.innerHTML = `${this.countWrongAnswers}`;

    statistickDispaly.classList.remove('hide');
    category.appendChild(this.renderWordsContainerColum(wrongRight, 1));

    category.appendChild(this.renderWordsContainerColum(wrongWords, 2));
    const optionsForStatistick = {
      sprint: {
        result: this.gameScore,
        knownWords: this.countRightAnswers,
        mistakeWords: this.countWrongAnswers,
      },
    };

    dataController
      .setUserStatistics(optionsForStatistick)
      .then(
        () => {
          preloaderController.hidePreloader();
        },
        () => {
          preloaderController.hidePreloader();
        },
      )
      .then(() => {
        this.choiceLevelAfterGame();
      });
  }

  init() {
    timerWrap.remove();
    this.playSoundAnswers();
    window.addEventListener('storage', this.storageHandle);
    dataController.getUser().then(
      (userSettings) => {
        avatarName.innerText = userSettings.name;
        this.gameLevel = 0;
        this.constrolLevelAfterReload();
        this.getWordsForGame(this.gameLevel);
        this.startGame();
        this.answerButtonsEvent();
        this.choiceLevel();
        dropDownMenu[0].childNodes[0].classList.remove('hide');
        dropDownMenu[0].childNodes[this.gameLevel].click();
        dropDownMenuElement[this.gameLevel].click();
        this.userStatus = true;
      },
      (rejectReport) => {
        avatarName.innerText = rejectReport.name;
        this.gameLevel = 1;
        this.constrolLevelAfterReload();
        this.choiceLevel();
        dropDownMenu[0].childNodes[0].classList.add('hide');
        dropDownMenu[0].childNodes[this.gameLevel].click();
        dropDownMenuElement[this.gameLevel].click();
        this.getWordsForGame(this.gameLevel);
        this.startGame();
        this.answerButtonsEvent();
        this.userStatus = false;
      },
    );
  }

  storageHandle({ key }) {
    if (key === 'isLogin') {
      document.location.reload(true);
    } else if (key === 'isLogin') {
      document.location.reload(true);
    }
  }

  renderWordsContainerColum(arrayWords, colum) {
    const ul = ElementGen(
      'ul',
      `on-learn__column${colum} collapsible col m6 l6 s12`,
      this.cardElem,
    );

    const titleUl = document.createElement('div');
    if (colum === 1) {
      titleUl.classList.add('words-statistick--right');
      titleUl.innerHTML = 'Знаю';
    } else {
      titleUl.classList.add('words-statistick--wrong');
      titleUl.innerHTML = 'Ошибки';
    }
    const uniqueArray = arrayWords.filter((item, pos) => {
      return arrayWords.indexOf(item) === pos;
    })
    ul.appendChild(titleUl);
    this.choiceLevel();
    uniqueArray.forEach((element) => {
      const word = element;
      dataController
        // eslint-disable-next-line no-underscore-dangle
        .getWordMaterials(element._id)
        .then((materialOfCard) => {
          word.image = materialOfCard.image;
          word.audio = materialOfCard.audio;
          word.audioExample = materialOfCard.audioExample;
          word.audioMeaning = materialOfCard.audioMeaning;
          word.transcription = materialOfCard.transcription;
          word.textMeaning = materialOfCard.textMeaning;
          word.textMeaningTranslate = materialOfCard.textMeaningTranslate;
          word.textExample = materialOfCard.textExample;
          word.textExampleTranslate = materialOfCard.textExampleTranslate;
        })
        .then(() => {
          const wordState = word;
          const li = ElementGen('li', 'vocabulary__word-container');
          li.appendChild(this.createHeader(wordState));
          li.appendChild(this.createBody(wordState));
          ul.appendChild(li);
          this.playSound(li);
        });
    });

    return ul;
  }

  createHeader(wordState) {
    const div = ElementGen('div', 'collapsible-header', this.cardElem);
    div.insertAdjacentHTML(
      'afterbegin',
      `<i data-source="${wordState.audio}" class="material-icons vocabulary-sound">volume_up</i>
                                        <span class="vocabulary__word">${wordState.word}</span>`,
    );
    return div;
  }

  createBody(wordState) {
    const div = ElementGen('div', 'collapsible-body', this.cardElem);
    div.insertAdjacentHTML(
      'afterbegin',
      `<div class="row">
                    <p class="col s6">${wordState.wordTranslate}</p>
                    <p class="col s6">${wordState.transcription}</p>
                  </div>
                  <img  src="${wordState.image}" alt="">
                  <div class="sentences">
                    <p>${wordState.textMeaning} <i class="material-icons vocabulary-sound" data-source="${wordState.audioMeaning}">volume_up</i></p>
                    <p>${wordState.textMeaningTranslate}</p>
                    <p>${wordState.textExample} <i data-source="${wordState.audioExample}" class="material-icons vocabulary-sound">volume_up</i></p>
                    <p>${wordState.textExampleTranslate}</p>
                  </div>
                  <div class="divider"></div>`,
    );
    return div;
  }

  playSound(el) {
    const vocabularySound = el.querySelectorAll('.vocabulary-sound');
    vocabularySound.forEach((element) =>
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        const sound = new Audio();
        sound.src = e.target.dataset.source;
        sound.play();
      }),
    );
  }

  choiceLevelAfterGame() {
    // eslint-disable-next-line no-undef
    M.AutoInit();
    const dropDownMenuSecond = document.querySelectorAll('.dropdown-content');
    const dropDownMenuElementSecond = dropDownMenuSecond[0].querySelectorAll('span');
    dropDownMenuElementSecond.forEach((el, index) => {
      el.setAttribute('data-id', index);
      el.addEventListener('click', (e) => {
        words = [];
        this.gameLevel = e.target.dataset.id;
        this.getWordsForGame(this.gameLevel);
        startGameButton.classList.remove('hide');
        gameView.classList.add('hide');
        timerWrap.classList.remove('timer_line');
        timerWrap.remove();
        this.defaultGameValue();
        localStorage.setItem('levelSprint', this.gameLevel);
        statistickDispaly.classList.add('hide');
      });
    });
    if (this.userStatus === false) {
      dropDownMenuSecond[0].childNodes[0].classList.add('hide');
      dropDownMenuSecond[0].childNodes[this.gameLevel].click();
      this.getWordsForGame(this.gameLevel);
    }
  }
}
