import AuditionGame from './audition';
import {
  gameContainer,
} from './constants'

export default class AuditionGameStatistics {
  constructor (words) {
    this.gameWords = words;
    this.getGameStatistics();
  }

  getGameStatistics() {
    const answeredWords = this.gameWords.filter((word) => word.answer);
    const errorWords = this.gameWords.filter((word) => !word.answer);
    const gamePoints = answeredWords.length;

    this.renderStatisticWindow(answeredWords, errorWords, gamePoints);
  }

  renderStatisticWindow(answered, error, points) {
    gameContainer.innerHTML = '';

    const statisticBlock = document.createElement('div');
    statisticBlock.classList.add('statistic-block');
    gameContainer.append(statisticBlock);

    const gamePointsEl = document.createElement('span');
    gamePointsEl.classList.add('game-points-element');
    gamePointsEl.innerText = `У вас ${points} правильных ответов`;
    statisticBlock.append(gamePointsEl);

    if(answered.length) {
      console.log(answered)
      const answeredBlock = document.createElement('div');
      answeredBlock.innerHTML = `Знаю <span class="answered-words-number">${answered.length}</span>`;

      answered.forEach((el) => this.createGameWords(el, answeredBlock));
      statisticBlock.append(answeredBlock);
    }

    if(answered.length) {
      const errorBlock = document.createElement('div');
      errorBlock.innerHTML = `Не знаю <span class="error-words-number">${error.length}</span>`;

      error.forEach((el) => this.createGameWords(el, errorBlock));
      statisticBlock.append(errorBlock);
    }

    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('btn', 'new-game-btn');
    newGameBtn.innerText = 'Новая игра';
    newGameBtn.addEventListener('click', () => {
      gameContainer.innerHTML = '';
      new AuditionGame();
    });
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

    const answeredWord = document.createElement('span');
    answeredWord.classList.add('answered-word');
    answeredWord.innerText = word.word;
    answeredWord.addEventListener('click', () => {
      word.audio.play();
    });
    answeredWordEl.append(answeredWord);

    const answeredWordTranslation =  document.createElement('span');
    answeredWordTranslation.classList.add('word-translation');
    answeredWordTranslation.innerText = word.wordTranslate;
    answeredWordEl.append(answeredWordTranslation);

    block.append(answeredWordEl);
  }


  exitGame() {
    window.location.href='/';
  }

}
