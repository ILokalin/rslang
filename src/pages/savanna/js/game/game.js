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
} from '../helper/constants';
import helper from '../helper/helper';

export default class Game {
  constructor() {
    this.startButton = gameStartButton;
    this.fallingWordElement = fallingWordElement;
    this.fallingWordText = fallingWordText;
    this.answersElements = answerElements;
    this.dataController = new DataController();
    this.health = health;
    this.level = 0;
    this.round = 0;
    this.height = 0;
    this.translates = [];
    this.currentWord = null;
    this.currentIntreval = null;
    this.currentDataSetLevel = null;
    this.currentDataSetRound = null;
    this.dataController.getUser().then(helper.renderUserName, helper.renderEmptyUserName);
    this.keyPressHandler = this.keyboardCheckAnswer.bind(this);
    this.createDataSetLevel();
    this.props = {
      dontKnowWords: [],
      knowWords: [],
    };
    this.startButton.addEventListener('click', this.startGame.bind(this));
    restartButton.addEventListener('click', this.showOptions.bind(this));
    answerContainer.addEventListener('click', this.mouseCheckAnswer.bind(this));
    roundOption.addEventListener('change', this.changeRound.bind(this));
    levelOption.addEventListener('change', this.changeLevel.bind(this));
  }

  startGame(e) {
    this.createRound();
    e.preventDefault();
    difficultMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameHeader.classList.remove('hidden');
  }

  changeRound(event) {
    this.round = +event.target.value - 1;
  }

  changeLevel(event) {
    this.level = +event.target.value - 1;
    this.createDataSetLevel();
  }

  stop() {
    clearInterval(this.currentIntreval);
    document.body.removeEventListener('keydown', this.keyPressHandler);
  }

  async createDataSetLevel() {
    this.currentDataSetLevel = await helper.getCardsbyApi(this.dataController, this.level);
  }

  async createDataSetRound() {
    this.currentDataSetRound = await this.currentDataSetLevel.slice(
      this.round * 100,
      this.round * 100 + 100,
    );
    this.currentDataSetRound.sort(() => Math.random() - 0.5);
  }

  async createWordsForRound() {
    await this.createDataSetRound();
    this.currentWord = await this.currentDataSetRound.pop();
    this.translates.push(this.currentWord.wordTranslate);
    for (let i = 0; i < 3; i += 1) {
      this.translates.push(this.currentDataSetRound.pop().wordTranslate);
    }
    this.translates.sort(() => Math.random() - 0.5);
  }

  startRound(immediately) {
    if (immediately) {
      this.createRound();
    } else {
      setTimeout(() => {
        this.createRound();
      }, 700);
    }
  }

  async createRound() {
    document.body.addEventListener('keydown', this.keyPressHandler);
    this.stopHighlight();
    await this.createWordsForRound();
    await this.renderRound();
    this.isFallWord();
  }

  renderLevel() {
    currentGameStage.innerHTML = `Round${this.level + 1}.${this.round + 1}`;
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
          this.startRound();
        }
      }
      this.height += 1;
      this.fallingWordElement.style.top = `${this.height}px`;
    }, 10);
  }

  async renderRound() {
    this.renderLevel();
    this.fallingWordText.innerHTML = this.currentWord.word;
    this.answersElements.forEach((answer, index) => {
      answer.setAttribute('key', index + 1);
      // eslint-disable-next-line no-param-reassign
      answer.innerHTML = `${index + 1} ${this.translates.pop()}`;
    });
    this.height = 0;
  }

  mouseCheckAnswer(event) {
    if (
      event.target.classList.contains('answer-options__item') &&
      event.target.innerText.slice(2) === this.currentWord.wordTranslate
    ) {
      helper.makeCorrectNoise();
      this.stop();
      this.props.knowWords.push(this.currentWord);
      if (this.level === 5 && this.round === 5) {
        this.showStat(true);
      } else if (this.round === 5) {
        this.level += 1;
        this.round = 0;
        this.createDataSetLevel();
        this.startRound(true);
      } else {
        this.round += 1;
        this.startRound(true);
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
        this.startRound();
      }
    }
  }

  keyboardCheckAnswer(event) {
    event.preventDefault();
    const checker = document.querySelector(`[key="${event.key}"]`);
    if (checker.textContent.slice(2) === this.currentWord.wordTranslate) {
      helper.makeCorrectNoise();
      this.props.knowWords.push(this.currentWord);
      this.stop();
      if (this.level === 5 && this.round === 5) {
        this.showStat(true);
      } else if (this.round === 5) {
        this.level += 1;
        this.round = 0;
        this.createDataSetLevel();
        this.startRound(true);
      } else {
        this.round += 1;
        this.startRound(true);
      }
    } else if (checker.textContent.slice(2) !== this.currentWord.wordTranslate) {
      checker.classList.add('highlight-error');
      helper.makeErrorNoise();
      this.props.dontKnowWords.push(this.currentWord);
      this.takeHealth();
      this.health -= 1;
      this.stop();
      if (this.health <= 0) {
        this.showStat();
      } else {
        this.highlightAnswer();
        this.startRound();
      }
    }
  }

  resetGame() {
    this.round = 0;
    this.level = 0;
    this.props = {
      dontKnowWords: [],
      knowWords: [],
    };
    this.translates = [];
    this.currentWord = null;
    this.currentIntreval = null;
    this.currentDataSetLevel = null;
    this.currentDataSetRound = null;
    this.health = health;
    this.restoreHealt();
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

  renderStatistic() {
    gameContainer.classList.add('hidden');
    gameHeader.classList.add('hidden');
    statistic.classList.remove('hidden');
    document.body.removeEventListener('keydown', this.keyPressHandler);
    this.stop();
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
    this.resetGame();
    this.createDataSetLevel();
  }

  showOptions() {
    statistic.classList.add('hidden');
    difficultMenu.classList.remove('hidden');
  }

  takeHealth() {
    hearts[this.health - 1].classList.add('filled');
  }

  restoreHealt() {
    hearts.forEach((heart) => heart.classList.remove('filled'));
  }
}
