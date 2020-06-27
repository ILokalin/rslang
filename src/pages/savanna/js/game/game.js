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
    if ((this.level === 5 && this.round === 5) || this.round === 5) {
      console.log('МАКС ЛВЛ');
    }
    if (checker.textContent.slice(2) === this.currentWord.wordTranslate) {
      this.props.knowWords.push(this.currentWord);
      if (this.streak >= 7 && this.currentLevel !== 5) {
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

// const game = {
//   hight: HIGHT,
//   fallWordElement: null,
//   currentIntreval: null,
//   answerContainer: null,
//   clickHandler: null,
//   keyPressHandler: null,
//   resetHight() {
//     this.hight = HIGHT;
//   },
//   getRandomRoundCards: function getRandomRoundCards(level, round) {
//     const dataSet = [book1, book2, book3, book4, book5, book6];
//     const result = dataSet[level - 1].slice((round - 1) * 100, (round - 1) * 100 + 99);
//     return result.sort(() => Math.random() - 0.5);
//   },
//   start(immediately) {
//     if (immediately) {
//       this.renderRoundGame(gameData.currentCards);
//     } else {
//       setTimeout(() => {
//         this.renderRoundGame(gameData.currentCards);
//       }, 1000);
//     }
//   },

//   renderRoundGame(dataSet) {
//     gameData.height = -20;
//     gameContainer.innerHTML = '';
//     const answers = [];
//     this.fallWordElement = document.createElement('div');
//     this.fallWordElement.classList.add('game-savanna__question-container');
//     gameData.wordContainer = dataSet.pop();
//     for (let i = 0; i < 3; i += 1) {
//       answers.push(dataSet.pop().wordTranslate);
//     }
//     answers.push(gameData.wordContainer.wordTranslate);
//     answers.sort(() => Math.random() - 0.5);
//     this.fallWordElement.innerHTML = `<p class="game-savanna__question-word">${gameData.wordContainer.word}</p>`;
//     gameContainer.appendChild(this.fallWordElement);

//     this.answerContainer = document.createElement('div');
//     this.answerContainer.classList.add('game-savanna__answer-container');
//     answers.forEach((word, index) => {
//       const p = document.createElement('p');
//       p.classList.add('game-savanna__answer-word');
//       p.setAttribute('key', index + 1);
//       p.innerText = `${index + 1} ${word}`;
//       this.answerContainer.appendChild(p);
//     });
//     gameContainer.appendChild(this.answerContainer);
//     gameContainer.classList.remove('hidden');
//     header.classList.remove('hidden');
//     startMenu.classList.add('hidden');
//     this.initListeners();
//     this.answerContainer.addEventListener('click', this.clickHandler);
//     document.body.addEventListener('keydown', this.keyPressHandler);

//     game.moveGuessContainer();
//     console.log(dataSet);
//   },
//   initListeners() {
//     this.clickHandler = this.checkAnswerWithMouse.bind(this);
//     this.keyPressHandler = this.checkAnswerWithKeyboard.bind(this);
//   },
//   removeListeners() {
//     if (this.answerContainer) {
//       this.answerContainer.removeEventListener('click', this.keyPressHandler);
//     }
//     document.body.removeEventListener('keydown', this.keyPressHandler);
//   },
//   stop() {
//     clearInterval(this.currentIntreval);
//     this.removeListeners();
//     this.resetHight();
//   },

//   moveGuessContainer() {
//     this.currentIntreval = setInterval(() => {
//       if (this.fallWordElement.style.top === '600px') {
//         this.stop();
//         this.hightlightAnswer();
//         gameData.health -= 1;
//         if (gameData.health !== 0) {
//           this.start();
//         }
//       }
//       gameData.height += 1;
//       this.fallWordElement.style.top = `${gameData.height}px`;
//     }, 10);
//   },

//   hightlightAnswer() {
//     const AnswerContsainer = document.querySelectorAll('.game-savanna__answer-word');
//     AnswerContsainer.forEach((answer) => {
//       if (answer.textContent.slice(2) === gameData.wordContainer.wordTranslate) {
//         answer.classList.add('green');
//       }
//     });
//   },
//   hightlightUserAnswer() {},

//   checkAnswerWithKeyboard(event) {
//     event.preventDefault();
//     const checkWord = document.querySelector(`[key="${event.key}"]`);
//     console.log(checkWord.textContent);
//     if (gameData.currentLevel === 6 && gameData.currentRound === 6) {
//       game.renderStat();
//       this.stop();
//     }
//     if (checkWord.textContent.slice(2) === gameData.wordContainer.wordTranslate) {
//       gameData.knowWords.push(gameData.wordContainer);
//       if (gameData.roundStreak >= 7 && gameData.currentLevel !== 6) {
//         gameData.currentLevel += 1;
//         gameData.roundStreak = 0;
//         gameData.currentCards = game.getRandomRoundCards(
//           gameData.currentLevel,
//           gameData.currentRound,
//         );
//       } else if (gameData.roundStreak >= 3) {
//         gameData.currentRound += 1;
//         gameData.currentCards = game.getRandomRoundCards(
//           gameData.currentLevel,
//           gameData.currentRound,
//         );
//       }
//       gameData.roundStreak += 1;
//       console.log('Угадал', gameData);
//       this.stop();
//       this.start(true);
//     } else if (checkWord.textContent.slice(2) !== gameData.wordContainer.wordTranslate) {
//       gameData.errorWords.push(gameData.wordContainer);
//       gameData.roundStreak = 0;
//       gameData.health -= 1;
//       if (gameData.health === 0) {
//         game.renderStat();
//         this.stop();
//       } else {
//         event.target.classList.add('fail');
//         this.stop();
//         this.start();
//       }
//       console.log('НЕ угадал', gameData);
//     }
//   },

//   checkAnswerWithMouse(event) {
//     if (gameData.currentLevel === 6 && gameData.currentRound === 6) {
//       game.renderStat();
//       this.stop();
//       return;
//     }
//     if (
//       event.target.classList.contains('game-savanna__answer-word') &&
//       event.target.innerText.slice(2) === gameData.wordContainer.wordTranslate
//     ) {
//       gameData.knowWords.push(gameData.wordContainer);
//       if (gameData.roundStreak >= 7 && gameData.currentLevel !== 6) {
//         gameData.currentLevel += 1;
//         gameData.roundStreak = 0;
//         gameData.currentCards = game.getRandomRoundCards(
//           gameData.currentLevel,
//           gameData.currentRound,
//         );
//       } else if (gameData.roundStreak >= 3) {
//         gameData.currentRound += 1;
//         gameData.currentCards = game.getRandomRoundCards(
//           gameData.currentLevel,
//           gameData.currentRound,
//         );
//       }
//       gameData.roundStreak += 1;
//       console.log('Угадал', gameData);
//       this.stop();
//       this.start(true);
//     } else if (
//       event.target.classList.contains('game-savanna__answer-word') &&
//       event.target.innerText.slice(2) !== gameData.wordContainer.wordTranslate
//     ) {
//       gameData.errorWords.push(gameData.wordContainer);
//       gameData.roundStreak = 0;
//       gameData.health -= 1;
//       if (gameData.health === 0) {
//         this.stop();
//         game.renderStat();
//       } else {
//         event.target.classList.add('fail');
//         this.stop();
//         this.start();
//       }
//       console.log('НЕ угадал', gameData);
//     }
//   },

//   renderStat: function renderStat() {
//     header.classList.add('hidden');
//     gameContainer.classList.add('hidden');
//     gameContainer.innerHTML = '';
//     const resultContainer = document.createElement('div');
//     resultContainer.classList.add('results-container');
//     resultContainer.innerHTML = `<div class="result">
//                                   <p class="result-text">Выучено слов: ${gameData.knowWords.length}</p>
//                                   <p class="result-text">На повторение: ${gameData.errorWords.length}</p>
//                                 </div>
//                                 <div class="btns">
//                                   <button class="btn restart">Новая Игра</button>
//                                   <button class="btn back">Назад</button>
//                                 </div>`;
//     appContainer.appendChild(resultContainer);
//     const restartButton = document.querySelector('.restart');
//     const NewResultContainer = document.querySelector('.results-container');
//     gameData.currentCards = [];
//     gameData.wordContainer = [];
//     gameData.currentRound = 1;
//     gameData.currentLevel = 1;
//     gameData.roundStreak = 0;
//     gameData.health = 5;
//     startButton.removeEventListener('click', game.startGame);
//     restartButton.addEventListener('click', () => {
//       game.startGame();
//       appContainer.removeChild(NewResultContainer);
//     });
//   },

//   startGame: function startGame() {
//     gameData.currentCards = game.getRandomRoundCards(gameData.currentLevel, gameData.currentRound);
//     game.renderRoundGame(gameData.currentCards);
//   },
// };
// export default game;
