import { DataController } from 'Service/DataController';
import { gameContainer } from './constants';

export default class AuditionGameStatistics {
  constructor(words, rounds, user, startNewGame) {
    this.dataController = new DataController();
    this.gameWords = words;
    this.roundsNumber = rounds;
    // eslint-disable-next-line no-unused-expressions
    this.resultMessage;
    this.user = user;
    this.startNewGame = startNewGame;
    this.getGameStatistics();
  }

  getGameStatistics() {
    const answeredWords = this.gameWords.filter((word) => word.answer);
    const errorWords = this.gameWords.filter((word) => !word.answer);
    const points = (answeredWords.length / this.roundsNumber) * 100;
    if (this.user) {
      this.saveGameStatistic(points, answeredWords, errorWords);
    } else {
      this.renderStatisticWindow(answeredWords, errorWords, points);
    }
  }

  saveGameStatistic(points, correct, error) {
    const options = {
      audition: {
        result: points,
        knownWords: correct.length,
        mistakeWords: error.length,
      },
    };

    this.dataController.setUserStatistics(options).then((statisticsAnswer) => {
      const {
        longTime,
        longTime: { length },
      } = statisticsAnswer.audition;
      const currentResult = longTime[length - 1].result;

      if (length > 1) {
        const previousResult = longTime[length - 2].result;
        if (currentResult > previousResult) {
          const result = currentResult - previousResult;
          this.resultMessage = `Ваш результат на ${result}% лучше, чем в предыдущую игру. Так держать!`;
        } else if (currentResult < previousResult) {
          const result = previousResult - currentResult;
          this.resultMessage = `Ваш результат на ${result}% хуже, чем в предыдущую игру. Попробуйте сыграть ещё раз!`;
        }
      } else {
        this.resultMessage = 'Ваша первая игра. Поздравляем!';
      }

      this.renderStatisticWindow(correct, error, points);
    });
  }

  renderStatisticWindow(answered, error, points) {
    gameContainer.innerHTML = '';

    const statisticBlock = document.createElement('div');
    statisticBlock.classList.add('statistic-block');
    gameContainer.append(statisticBlock);

    const gamePointsEl = document.createElement('p');
    gamePointsEl.classList.add('game-points-element');
    if (this.resultMessage) {
      gamePointsEl.innerText = `У вас ${points}% правильных ответов. ${this.resultMessage}`;
    } else {
      gamePointsEl.innerText = `У вас ${points}% правильных ответов.`;
    }
    statisticBlock.append(gamePointsEl);

    if (answered.length) {
      const answeredBlock = document.createElement('div');
      answeredBlock.innerHTML = `<p class="answered-words-label">Знаю <span class="answered-words-number">${answered.length}</span></p>`;
      answeredBlock.classList = 'answered-words-correct';

      answered.forEach((el) => this.createGameWords(el, answeredBlock));
      statisticBlock.append(answeredBlock);
    }

    if (error.length) {
      const errorBlock = document.createElement('div');
      errorBlock.innerHTML = `<p class="answered-words-label">Не знаю <span class="error-words-number">${error.length}</span></p>`;
      errorBlock.classList = 'answered-words-error';

      error.forEach((el) => this.createGameWords(el, errorBlock));
      statisticBlock.append(errorBlock);
    }

    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('btn', 'new-game-btn');
    newGameBtn.innerText = 'Новая игра';
    newGameBtn.addEventListener('click', this.startNewGame);
    statisticBlock.append(newGameBtn);

    const exitGameBtn = document.createElement('button');
    exitGameBtn.classList.add('btn', 'exit-game-btn');
    exitGameBtn.innerText = 'Выйти из игры';
    exitGameBtn.addEventListener('click', this.exitGame.bind(this));
    statisticBlock.append(exitGameBtn);
  }

  createGameWords(word, block) {
    const answeredWordEl = document.createElement('div');
    answeredWordEl.classList.add('answered-words-element');

    const audioEl = document.createElement('div');
    audioEl.classList.add('audio-element', 'small');
    audioEl.addEventListener('click', () => {
      word.audio.play();
    });
    answeredWordEl.append(audioEl);

    const answeredWord = document.createElement('p');
    answeredWord.classList.add('answered-word');
    answeredWord.innerText = word.word;
    answeredWord.addEventListener('click', () => {
      word.audio.play();
    });
    answeredWordEl.append(answeredWord);

    const answeredWordTranslation = document.createElement('p');
    answeredWordTranslation.classList.add('word-translation');
    answeredWordTranslation.innerText = word.wordTranslate;
    answeredWordEl.append(answeredWordTranslation);

    block.append(answeredWordEl);
  }

  exitGame() {
    window.location.href = '/';
  }
}
