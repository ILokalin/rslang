import book1 from '../data/book1';
import book2 from '../data/book2';
import book3 from '../data/book3';
import book4 from '../data/book4';
import book5 from '../data/book5';
import book6 from '../data/book6';
import {
  header,
  startMenu,
  gameContainer,
  gameData,
  appContainer,
  startButton,
} from '../helper/constants';

const game = {
  getRandomRoundCards: function getRandomRoundCards(level, round) {
    const dataSet = [book1, book2, book3, book4, book5, book6];
    const result = dataSet[level - 1].slice((round - 1) * 100, (round - 1) * 100 + 99);
    return result.sort(() => Math.random() - 0.5);
  },

  renderRoundGame: function renderRoundGame(dataSet) {
    gameContainer.innerHTML = '';
    const answers = [];
    const сardToGuess = dataSet.pop();
    const guessContainer = document.createElement('div');
    guessContainer.classList.add('game-savanna__question-container');
    gameData.wordContainer = сardToGuess;
    for (let i = 0; i < 3; i += 1) {
      answers.push(dataSet.pop().wordTranslate);
    }
    const wordToGuess = сardToGuess.wordTranslate;
    answers.push(wordToGuess);
    answers.sort(() => Math.random() - 0.5);
    guessContainer.innerHTML = `<p class="game-savanna__question-word">${сardToGuess.word}</p>`;
    gameContainer.appendChild(guessContainer);
    const startHeight = -20;
    game.moveGuessContainer(guessContainer, startHeight);
    const newAnswerContsainer = document.createElement('div');
    newAnswerContsainer.classList.add('game-savanna__answer-container');
    answers.forEach((word, index) => {
      const p = document.createElement('p');
      p.classList.add('game-savanna__answer-word');
      p.setAttribute('key', index + 1);
      p.innerText = `${index + 1} ${word}`;
      newAnswerContsainer.appendChild(p);
    });
    gameContainer.appendChild(newAnswerContsainer);
    gameContainer.classList.remove('hidden');
    header.classList.remove('hidden');
    startMenu.classList.add('hidden');
    newAnswerContsainer.addEventListener('click', game.checkAnswerWithMouse);
    document.body.addEventListener('keydown', game.checkAnswerWithKeyboard);
    console.log(dataSet);
  },

  moveGuessContainer: function moveGuessContainer(element, counter) {
    let height = counter;
    const moveWordToGuess = element;
    const interval = setInterval(() => {
      if (moveWordToGuess.style.top === '300px') {
        clearInterval(interval);
        game.hightlightAnswer();
        setTimeout(() => {
          gameData.errorWords.push(gameData.wordContainer);
          gameData.roundStreak = 0;
          gameData.health -= 1;
          if (gameData.health === 0) {
            game.renderStat();
          }
          game.renderRoundGame(gameData.currentCards);
        }, 500);
      }
      height += 10;
      moveWordToGuess.style.top = `${height}px`;
    }, 500);
  },

  hightlightAnswer: function hightlightAnswer() {
    const AnswerContsainer = document.querySelectorAll('.game-savanna__answer-word');
    AnswerContsainer.forEach((answer) => {
      if (answer.textContent.slice(2) === gameData.wordContainer.wordTranslate) {
        answer.classList.add('green');
      }
    });
  },

  checkAnswerWithKeyboard: function checkAnswerWithKeyboard(event) {
    event.preventDefault();
    const checkWord = document.querySelector(`[key="${event.key}"]`);
    console.log(checkWord.textContent);
    if (gameData.currentLevel === 6 && gameData.currentRound === 6) {
      game.renderStat();
      return;
    }
    if (checkWord.textContent.slice(2) === gameData.wordContainer.wordTranslate) {
      gameData.knowWords.push(gameData.wordContainer);
      if (gameData.roundStreak >= 7 && gameData.currentLevel !== 6) {
        gameData.currentLevel += 1;
        gameData.roundStreak = 0;
        gameData.currentCards = game.getRandomRoundCards(
          gameData.currentLevel,
          gameData.currentRound,
        );
      } else if (gameData.roundStreak >= 3) {
        gameData.currentRound += 1;
        gameData.currentCards = game.getRandomRoundCards(
          gameData.currentLevel,
          gameData.currentRound,
        );
      }
      gameData.roundStreak += 1;
      console.log('Угадал', gameData);
      game.renderRoundGame(gameData.currentCards);
    } else if (checkWord.textContent.slice(2) !== gameData.wordContainer.wordTranslate) {
      gameData.errorWords.push(gameData.wordContainer);
      gameData.roundStreak = 0;
      gameData.health -= 1;
      if (gameData.health === 0) {
        game.renderStat();
      } else {
        event.target.classList.add('fail');
        game.hightlightAnswer()
        setTimeout(() => {
          game.renderRoundGame(gameData.currentCards);
        }, 500);
      }
      console.log('НЕ угадал', gameData);
    }
  },

  checkAnswerWithMouse: function checkAnswerWithMouse(event) {
    if (gameData.currentLevel === 6 && gameData.currentRound === 6) {
      game.renderStat();
      return;
    }
    if (
      event.target.classList.contains('game-savanna__answer-word') &&
      event.target.innerText.slice(2) === gameData.wordContainer.wordTranslate
    ) {
      gameData.knowWords.push(gameData.wordContainer);
      if (gameData.roundStreak >= 7 && gameData.currentLevel !== 6) {
        gameData.currentLevel += 1;
        gameData.roundStreak = 0;
        gameData.currentCards = game.getRandomRoundCards(
          gameData.currentLevel,
          gameData.currentRound,
        );
      } else if (gameData.roundStreak >= 3) {
        gameData.currentRound += 1;
        gameData.currentCards = game.getRandomRoundCards(
          gameData.currentLevel,
          gameData.currentRound,
        );
      }
      gameData.roundStreak += 1;
      console.log('Угадал', gameData);
      game.renderRoundGame(gameData.currentCards);
    } else if (
      event.target.classList.contains('game-savanna__answer-word') &&
      event.target.innerText.slice(2) !== gameData.wordContainer.wordTranslate
    ) {
      gameData.errorWords.push(gameData.wordContainer);
      gameData.roundStreak = 0;
      gameData.health -= 1;
      if (gameData.health === 0) {
        game.renderStat();
      } else {
        event.target.classList.add('fail');
        game.hightlightAnswer();
        setTimeout(() => {
          game.renderRoundGame(gameData.currentCards);
        }, 500);
      }
      console.log('НЕ угадал', gameData);
    }
  },

  renderStat: function renderStat() {
    header.classList.add('hidden');
    gameContainer.classList.add('hidden');
    gameContainer.innerHTML = '';
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('results-container');
    resultContainer.innerHTML = `<div class="result">
                                  <p class="result-text">Выучено слов: ${gameData.knowWords.length}</p>
                                  <p class="result-text">На повторение: ${gameData.errorWords.length}</p>
                                </div>
                                <div class="btns">
                                  <button class="btn restart">Новая Игра</button>
                                  <button class="btn back">Назад</button>
                                </div>`;
    appContainer.appendChild(resultContainer);
    const restartButton = document.querySelector('.restart');
    const NewResultContainer = document.querySelector('.results-container');
    gameData.currentCards = [];
    gameData.wordContainer = [];
    gameData.currentRound = 1;
    gameData.currentLevel = 1;
    gameData.roundStreak = 0;
    gameData.health = 5;
    startButton.removeEventListener('click', game.startGame);
    restartButton.addEventListener('click', () => {
      game.startGame();
      appContainer.removeChild(NewResultContainer);
    });
  },

  startGame: function startGame() {
    gameData.currentCards = game.getRandomRoundCards(gameData.currentLevel, gameData.currentRound);
    game.renderRoundGame(gameData.currentCards);
  },
};
export default game;
