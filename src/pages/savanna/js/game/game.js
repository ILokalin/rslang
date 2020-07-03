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
  hearts,
  repeatOption,
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
    this.level = 0;
    this.round = 0;
    this.height = 0;
    this.translates = [];
    this.answers = [];
    this.currentWord = null;
    this.currentIntreval = null;
    this.currentDataSet = null;
    this.keyPressHandler = this.keyboardCheckAnswer.bind(this);
    this.props = {
      dontKnowWords: [],
      knowWords: [],
    };
    this.startGame = this.startGame.bind(this);
    gameStartButton.addEventListener('click', this.startGame);
    restartButton.addEventListener('click', this.showOptions.bind(this));
    answerContainer.addEventListener('click', this.mouseCheckAnswer.bind(this));
    roundOption.addEventListener('change', this.changeRound.bind(this));
    levelOption.addEventListener('change', this.changeLevel.bind(this));
    repeatOption.addEventListener('change', this.changeRepeatOption.bind(this));
    this.getUserData();
    this.createTranslates();
  }

  async getUserData() {
    this.dataController.getUser().then(this.trueLogin.bind(this), this.falseLogin.bind(this));
  }

  async trueLogin(data) {
    await this.createRepeatWordsDataSet();
    this.login = true;
    this.repeat = true;
    repeatOption.checked = true;
    helper.renderUserName(data);
    console.log(data);
  }

  async falseLogin() {
    await this.createNewWordsDataSet();
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
      await this.createRepeatWordsDataSet();
      this.repeat = true;
    } else {
      await this.createNewWordsDataSet();
      this.repeat = false;
    }
  }

  async createRepeatWordsDataSet() {
    this.currentDataSet = await helper.getWordsRepeatByApi(this.dataController);
  }

  async createNewWordsDataSet() {
    this.currentDataSet = await helper.getWordsByApi(this.dataController);
  }

  async createTranslates() {
    this.translates = await helper.getTranslatesByApi(this.dataController);
  }

  createRound(repeat) {
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
  }

  renderLevel(repeat) {
    if (repeat) {
      currentGameStage.innerHTML = `Repeat Words`;
    } else {
      currentGameStage.innerHTML = `Round${this.level + 1}.${this.round + 1}`;
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
        helper.makeErrorNoise();
        this.props.dontKnowWords.push(this.currentWord);
        this.takeHealth();
        this.health -= 1;
        this.stop();
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
      helper.makeCorrectNoise();
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
    } else if (
      event.target.classList.contains('answer-options__item') &&
      event.target.innerText.slice(2) !== this.currentWord.wordTranslate
    ) {
      helper.makeErrorNoise();
      event.target.classList.add('highlight-error');
      this.props.dontKnowWords.push(this.currentWord);
      this.takeHealth();
      this.stop();
      this.health -= 1;
      if (this.health <= 0) {
        this.showStat();
      } else {
        this.highlightAnswer();
        this.start();
      }
    }
  }

  keyboardCheckAnswer(event) {
    event.preventDefault();
    const checker = document.querySelector(`[key="${event.key}"]`);
    if (checker.textContent.slice(2) === this.currentWord.wordTranslate) {
      helper.makeCorrectNoise();
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
    } else if (checker.textContent.slice(2) !== this.currentWord.wordTranslate) {
      helper.makeErrorNoise();
      checker.classList.add('highlight-error');
      this.props.dontKnowWords.push(this.currentWord);
      this.takeHealth();
      this.stop();
      this.health -= 1;
      if (this.health <= 0) {
        this.showStat();
      } else {
        this.highlightAnswer();
        this.start();
      }
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
    hearts[this.health - 1].classList.add('filled');
  }

  showStat(win) {
    if (win) {
      setTimeout(() => {
        helper.makeWinNoise();
        this.renderStatistic();
      }, 1000);
    } else {
      setTimeout(() => {
        helper.makeDefeatNoise();
        this.renderStatistic();
      }, 1000);
    }
  }

  async renderStatistic() {
    gameContainer.classList.add('hidden');
    gameHeader.classList.add('hidden');
    statistic.classList.remove('hidden');
    errorTable.innerHTML = '';
    knowTable.innerHTML = '';
    errorCount.innerHTML = this.props.dontKnowWords.length;
    knowCount.innerHTML = this.props.knowWords.length;
    this.props.dontKnowWords.forEach((element) => {
      errorTable.appendChild(helper.createStatElement(element.word, element.wordTranslate));
    });
    this.props.knowWords.forEach((element) => {
      knowTable.appendChild(helper.createStatElement(element.word, element.wordTranslate));
    });
    this.resetGame(this.repeat);
    await this.sendStatistic();
  }

  async resetGame(repeat) {
    if (repeat) {
      await this.createRepeatWordsDataSet();
    } else {
      await this.createNewWordsDataSet();
    }
    await this.createTranslates();
    this.props = {
      dontKnowWords: [],
      knowWords: [],
    };
    this.currentWord = null;
    this.health = health;
    this.restoreHealt();
  }

  showOptions() {
    statistic.classList.add('hidden');
    difficultMenu.classList.remove('hidden');
  }

  restoreHealt() {
    hearts.forEach((heart) => heart.classList.remove('filled'));
  }

  sendStatistic() {
    const errors = [];
    const success = [];
    this.props.knowWords.forEach((element) => success.push(element.word));
    this.props.dontKnowWords.forEach((element) => errors.push(element.word));
    const winRate = Math.round((success.length / (errors.length + success.length)) * 100);

    console.log(winRate, errors, success);
    this.dataController
      .setUserStatistics({
        savanna: {
          result: winRate,
          knownWords: success,
          mistakeWords: errors,
        },
      })
      .then((dataStat) => console.log(dataStat));
  }
}
