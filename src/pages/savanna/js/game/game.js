import { DataController } from 'Service/DataController';
import {
  gameStartButton,
  gameContainer,
  gameHeader,
  difficultMenu,
  fallingWordText,
  answerElements,
  answerContainer,
  health,
  currentGameStage,
  fallingWordElement,
} from '../helper/constants';
import helper from '../helper/helper';

export default class Game {
  constructor() {
    this.startButton = gameStartButton;
    this.startButton.addEventListener('click', this.startGame.bind(this));
    this.currentIntreval = null;
    this.fallingWordElement = fallingWordElement;
    this.fallingWordText = fallingWordText;
    this.answersElements = answerElements;
    this.dataController = new DataController();
    this.health = health;
    this.streak = 0;
    this.level = 0;
    this.round = 0;
    this.height = 0;
    this.translates = [];
    this.currentWord = null;
    this.currentDataSet = null;
    this.dataController.getUser().then(helper.renderUserName, helper.renderEmptyUserName);
    this.createDataSetByApi();
    this.createRound();
    this.props = {
      dontKnowWords: [],
      knowWords: [],
    };
    answerContainer.addEventListener('click', this.mouseCheckAnswer.bind(this));
  }

  startGame(e) {
    this.dataController.getUser().then((data) => console.log(data));
    this.renderLevel();
    document.body.addEventListener('keydown', this.keyboardCheckAnswer.bind(this));
    this.isFallWord();
    e.preventDefault();
    difficultMenu.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameHeader.classList.remove('hidden');
  }

  async createDataSetByApi() {
    this.currentDataSet = await helper.getCardsbyApi(this.dataController, this.level, this.round);
  }

  async createRound() {
    await this.createDataSetByApi();
    await this.renderRound(this.currentDataSet);
  }

  renderLevel() {
    currentGameStage.innerHTML = `Round${this.level + 1}.${this.round + 1}`;
  }

  isFallWord() {
    this.currentIntreval = setInterval(() => {
      if (this.fallingWordElement.style.top === '600px') {
        clearInterval(this.currentIntreval);
      }
      this.height += 1;
      this.fallingWordElement.style.top = `${this.height}px`;
    }, 10);
  }

  async renderRound(dataSet) {
    this.renderLevel();
    this.currentWord = await dataSet.pop();
    this.fallingWordText.innerHTML = this.currentWord.word;
    this.translates.push(this.currentWord.wordTranslate);
    for (let i = 0; i < 3; i += 1) {
      this.translates.push(dataSet.pop().wordTranslate);
    }
    this.translates.sort(() => Math.random() - 0.5);
    this.answersElements.forEach((answer, index) => {
      answer.setAttribute('key', index + 1);
      // eslint-disable-next-line no-param-reassign
      answer.innerHTML = `${index + 1} ${this.translates.pop()}`;
    });
    this.height = 0;
  }

  mouseCheckAnswer(event) {
    if (this.level === 5 && this.round === 5) {
      console.log('МАКС ЛВЛ');
    }
    if (
      event.target.classList.contains('answer-options__item') &&
      event.target.innerText.slice(2) === this.currentWord.wordTranslate
    ) {
      this.props.knowWords.push(this.currentWord);
      if ((this.streak >= 7 && this.currentLevel !== 5) || this.round === 5) {
        this.level += 1;
        this.round = 0;
        this.streak = 0;
        this.createDataSetByApi();
      } else if (this.streak >= 3) {
        this.round += 1;
        this.createDataSetByApi();
      }
      this.streak += 1;
      this.renderRound(this.currentDataSet);
    } else if (
      event.target.classList.contains('answer-options__item') &&
      event.target.innerText.slice(2) !== this.currentWord.wordTranslate
    ) {
      this.props.dontKnowWords.push(this.currentWord);
      this.streak = 0;
      this.health -= 1;
      if (this.health <= 0) {
        console.log('ЖИЗНИ КОНЧИЛИСЬ');
      } else {
        this.renderRound(this.currentDataSet);
      }
    }
  }

  keyboardCheckAnswer(event) {
    event.preventDefault();
    const checker = document.querySelector(`[key="${event.key}"]`);
    if (this.level === 5 && this.round === 5) {
      console.log('МАКС ЛВЛ');
    }
    if (checker.textContent.slice(2) === this.currentWord.wordTranslate) {
      this.props.knowWords.push(this.currentWord);
      if ((this.streak >= 7 && this.currentLevel !== 5) || this.round === 5) {
        this.level += 1;
        this.round = 0;
        this.streak = 0;
        this.createDataSetByApi();
      } else if (this.streak >= 3) {
        this.round += 1;
        this.createDataSetByApi();
      }
      this.streak += 1;
      this.renderRound(this.currentDataSet);
    } else if (checker.textContent.slice(2) !== this.currentWord.wordTranslate) {
      this.props.dontKnowWords.push(this.currentWord);
      this.streak = 0;
      this.health -= 1;
      if (this.health <= 0) {
        console.log('ЖИЗНИ КОНЧИЛИСЬ');
      } else {
        this.renderRound(this.currentDataSet);
      }
    }
  }
}
