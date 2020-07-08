import { DataController } from 'Service/DataController';
import {
  gameStartButton,
  restartButton,
  gameContainer,
  gameHeader,
  difficultMenu,
  fallingWordText,
  answerElements,
  answerContainer,
  health,
  currentGameStage,
  fallingWordElement,
  errorCount,
  errorTable,
  knowCount,
  knowTable,
  statistic,
  roundOption,
  levelOption,
  repeatOption,
  levelAndRoundselectors,
  statisticContainer,
  soundSwitcher,
  popupMenu,
  homeButton,
  resumeButton,
} from '../helper/constants';
import helper from '../helper/helper';

export default class Game {
  constructor() {
    this.fallingWordElement = fallingWordElement;
    this.fallingWordText = fallingWordText;
    this.answersElements = answerElements;
    this.dataController = new DataController();
    this.health = health;
    this.repeat = false;
    this.login = false;
    this.mute = false;
    this.isGame = false;
    this.level = 0;
    this.round = 0;
    this.height = 0;
    this.translates = [];
    this.answers = [];
    this.currentWord = null;
    this.currentIntreval = null;
    this.currentDataSet = null;
    this.keyPressHandler = this.keyboardCheckAnswer.bind(this);
    this.mouseClickHandler = this.mouseCheckAnswer.bind(this);
    this.props = {
      dontKnowWords: [],
      knowWords: [],
    };
    this.startGame = this.startGame.bind(this);
    gameStartButton.addEventListener('click', this.startGame);
    restartButton.addEventListener('click', this.showGameOptions.bind(this));
    roundOption.addEventListener('change', this.changeRound.bind(this));
    levelOption.addEventListener('change', this.changeLevel.bind(this));
    repeatOption.addEventListener('change', this.changeRepeatOption.bind(this));
    statisticContainer.addEventListener('click', this.playWord.bind(this));
    soundSwitcher.addEventListener('click', this.changeMute.bind(this));
    homeButton.addEventListener('click', this.showPopupMenu.bind(this));
    resumeButton.addEventListener('click', this.resumeGame.bind(this));
    helper.renredHearts();
    this.getUserData();
    this.createTranslates();
  }

  async getUserData() {
    this.dataController.getUser().then(this.trueLogin.bind(this), this.falseLogin.bind(this));
  }

  async trueLogin(data) {
    this.currentDataSet = await helper.getWordsRepeatByApi(this.dataController);
    repeatOption.checked = true;
    this.switchOption();
    this.repeat = true;
    if (!this.currentDataSet) {
      this.currentDataSet = await helper.getWordsByApi(this.dataController);
      this.repeat = false;
      repeatOption.checked = true;
      repeatOption.disabled = true;
      this.switchOption();
    }
    this.round = data.savanna.lastRound;
    this.level = data.savanna.lastLevel;
    this.login = true;
    helper.renderUserName(data);
  }

  async falseLogin() {
    this.currentDataSet = await helper.getWordsByApi(this.dataController);
    this.login = false;
    repeatOption.checked = false;
    repeatOption.disabled = true;
    helper.renderEmptyUserName();
  }

  changeRound(event) {
    this.round = +event.target.value - 1;
  }

  changeLevel(event) {
    this.level = +event.target.value - 1;
  }

  async changeRepeatOption() {
    this.login = repeatOption.checked;
    if (repeatOption.checked) {
      this.switchOption();
      this.currentDataSet = await helper.getWordsRepeatByApi(this.dataController);
      this.repeat = true;
    } else {
      this.switchOption();
      this.currentDataSet = await helper.getWordsByApi(this.dataController);
      this.repeat = false;
    }
  }

  switchOption() {
    levelAndRoundselectors.forEach((element) => {
      element.classList.toggle('disabled');
    });
  }

  async createTranslates() {
    this.translates = await helper.getTranslatesByApi(this.dataController);
  }

  createRound(repeat) {
    this.isGame = true;
    if (repeat) {
      this.currentWord = this.currentDataSet.pop();
    } else {
      this.currentWord = this.currentDataSet[this.level][this.round].pop();
    }
    this.answers.push(this.currentWord.wordTranslate);
    while (this.answers.length < 4) {
      if (this.translates.pop !== this.currentWord.wordTranslate) {
        this.answers.push(this.translates.pop());
      }
    }
    this.answers.sort(() => Math.random() - 0.5);
  }

  renderRound() {
    if (this.translates.length < 10) {
      this.createTranslates();
    }
    this.createRound(this.repeat);
    this.stopHighlight();
    this.isFallWord();
    this.renderLevel(this.repeat);
    this.fallingWordText.innerHTML = this.currentWord.word;
    this.answersElements.forEach((answer, index) => {
      answer.setAttribute('key', index + 1);
      // eslint-disable-next-line no-param-reassign
      answer.innerHTML = `${index + 1} ${this.answers.pop()}`;
    });
    this.height = 0;
    document.body.addEventListener('keydown', this.keyPressHandler);
    answerContainer.addEventListener('click', this.mouseClickHandler);
  }

  renderLevel(repeat) {
    if (repeat) {
      currentGameStage.innerHTML = `Повторение Слов`;
    } else {
      currentGameStage.innerHTML = `Раунд${this.level + 1}.${this.round + 1}`;
    }
  }

  startGame(e) {
    this.renderRound();
    e.preventDefault();
    difficultMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameHeader.classList.remove('hidden');
  }

  stop() {
    clearInterval(this.currentIntreval);
    document.body.removeEventListener('keydown', this.keyPressHandler);
    answerContainer.removeEventListener('click', this.mouseClickHandler);
  }

  start(immediately) {
    if (immediately) {
      this.renderRound();
    } else {
      setTimeout(() => {
        this.renderRound();
      }, 700);
    }
  }

  isFallWord() {
    this.currentIntreval = setInterval(() => {
      if (this.fallingWordElement.style.top === '600px') {
        this.stop();
        helper.makeErrorNoise();
        this.props.dontKnowWords.push(this.currentWord);
        this.takeHealth();
        this.health -= 1;
        if (this.health <= 0) {
          this.showStat();
        } else {
          this.highlightAnswer();
          this.start();
        }
      }
      this.height += 1;
      this.fallingWordElement.style.top = `${this.height}px`;
    }, 10);
  }

  mouseCheckAnswer(event) {
    if (
      event.target.classList.contains('answer-options__item') &&
      event.target.innerText.slice(2) === this.currentWord.wordTranslate
    ) {
      this.correctAnswer(this.mute);
    } else if (
      event.target.classList.contains('answer-options__item') &&
      event.target.innerText.slice(2) !== this.currentWord.wordTranslate
    ) {
      event.target.classList.add('highlight-error');
      this.wrongAnswer(this.mute);
    }
  }

  correctAnswer(mute) {
    this.isGame = false;
    if (!mute) {
      helper.makeCorrectNoise();
    }
    this.stop();
    this.props.knowWords.push(this.currentWord);
    if ((this.level === 5 && this.round === 5) || this.currentDataSet.length === 0) {
      this.showStat(true);
    } else if (this.round === 5) {
      this.level += 1;
      this.round = 0;
      this.start(true);
    } else {
      this.round += 1;
      this.start(true);
    }
  }

  wrongAnswer(mute) {
    this.isGame = false;
    if (!mute) {
      helper.makeErrorNoise();
    }
    this.props.dontKnowWords.push(this.currentWord);
    this.takeHealth();
    this.stop();
    this.health -= 1;
    this.highlightAnswer();
    if (this.health <= 0 || this.currentDataSet.length === 0) {
      this.showStat();
    } else {
      this.start();
    }
  }

  keyboardCheckAnswer(event) {
    try {
      event.preventDefault();
      const checker = document.querySelector(`[key="${event.key}"]`);
      if (checker.textContent.slice(2) === this.currentWord.wordTranslate) {
        this.correctAnswer(this.mute);
      } else if (checker.textContent.slice(2) !== this.currentWord.wordTranslate) {
        checker.classList.add('highlight-error');
        this.wrongAnswer(this.mute);
      }
    } catch (error) {
      console.log(error);
    }
  }

  highlightAnswer() {
    answerElements.forEach((answer) => {
      if (answer.textContent.slice(2) === this.currentWord.wordTranslate) {
        answer.classList.add('highlight-answer');
      }
    });
  }

  stopHighlight() {
    answerElements.forEach((answer) => {
      answer.classList.remove('highlight-answer', 'highlight-error');
    });
  }

  takeHealth() {
    const hearts = document.querySelectorAll('.heart');
    hearts[this.health - 1].classList.add('filled');
  }

  showStat(win) {
    if (win) {
      setTimeout(() => {
        helper.makeWinNoise(this.mute);
        this.renderStatistic();
      }, 1000);
    } else {
      setTimeout(() => {
        helper.makeDefeatNoise(this.mute);
        this.renderStatistic();
      }, 1000);
    }
  }

  async renderStatistic() {
    gameContainer.classList.add('hidden');
    gameHeader.classList.add('hidden');
    statistic.classList.remove('hidden');
    await this.renderValidWords();
    await this.renderInvalidWords();
    this.resetGame();
    helper.setUserOption(this.dataController, this.level, this.round);
    this.sendStatistic(this.login);
  }

  async renderValidWords() {
    knowTable.innerHTML = '';
    knowCount.innerHTML = `<span>ЗНАЮ:</span> ${this.props.knowWords.length}`;
    this.props.knowWords.forEach(async (item) => {
      const div = document.createElement('div');
      div.classList.add('answer');
      const span = document.createElement('span');
      span.classList.add('answer-audio');
      const audio = await this.dataController.getMaterials(item.audio);
      await span.setAttribute('data-audio', audio);
      span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>`;
      div.appendChild(span);
      div.innerHTML += `<div class="answer-eng">${item.word}</div>
                    <span class="answer-tr">— </span>
                    <div class="answer-trans">${item.wordTranslate}</div>`;
      knowTable.appendChild(div);
    });
  }

  async renderInvalidWords() {
    errorTable.innerHTML = '';
    errorCount.innerHTML = `<span>ОШИБОК:</span> ${this.props.dontKnowWords.length}`;
    this.props.dontKnowWords.forEach(async (item) => {
      const div = document.createElement('div');
      div.classList.add('answer');
      const span = document.createElement('span');
      span.classList.add('answer-audio');
      const audio = await this.dataController.getMaterials(item.audio);
      await span.setAttribute('data-audio', audio);
      span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>`;
      div.appendChild(span);
      div.innerHTML += `<div class="answer-eng">${item.word}</div>
                    <span class="answer-tr">— </span>
                    <div class="answer-trans">${item.wordTranslate}</div>`;
      errorTable.appendChild(div);
    });
  }

  playWord(event) {
    try {
      const span = event.target.closest('.answer-audio');
      if (span.getAttribute('data-audio')) {
        const audio = new Audio(span.getAttribute('data-audio'));
        audio.play();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async resetGame() {
    if (this.round === 5 && this.level === 5) {
      this.round = 0;
      this.level = 0;
    }
    this.props = {
      dontKnowWords: [],
      knowWords: [],
    };
    this.currentWord = null;
    this.health = health;
    this.restoreHealt();
  }

  async prepareNewGame(repeat) {
    if (repeat) {
      this.currentDataSet = await helper.getWordsRepeatByApi(this.dataController);
    } else {
      this.currentDataSet = await helper.getWordsByApi(this.dataController);
    }
    await this.createTranslates();
  }

  showGameOptions() {
    statistic.classList.add('hidden');
    difficultMenu.classList.remove('hidden');
    this.prepareNewGame(this.repeat);
  }

  restoreHealt() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart) => heart.classList.remove('filled'));
  }

  sendStatistic(login) {
    if (login) {
      helper.sendStatistic(this.dataController, this.props);
    }
  }

  changeMute() {
    this.mute = !this.mute;
  }

  showPopupMenu(e) {
    if (!this.isGame) {
      statistic.classList.add('hidden');
    }
    popupMenu.classList.remove('hidden');
    this.stop();
    e.preventDefault();
  }

  resumeGame() {
    if (this.isGame) {
      this.isFallWord();
      document.body.addEventListener('keydown', this.keyPressHandler);
    } else {
      statistic.classList.remove('hidden');
    }
    popupMenu.classList.add('hidden');
  }
}
