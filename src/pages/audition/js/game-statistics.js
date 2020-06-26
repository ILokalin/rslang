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
    const statisticBlock = document.createElement('div');
    statisticBlock.classList.add('statistic-element');
    document.body.append(statisticBlock);

    const gamePointsEl = document.createElement('span');
    gamePointsEl.classList.add('game-points-element');
    gamePointsEl.innerText = `У вас ${points} правильных ответов`;
    statisticBlock.append(gamePointsEl);

    if(answered) {
      const answeredBlock = document.createElement('div');

      answered.forEach((el) => this.createAnsweredWords(el, answeredBlock));
      statisticBlock.append(answeredBlock);
    }

    if(error) {
      const errorBlock = document.createElement('div');

      error.forEach((el) => this.createErrorWords(el, errorBlock));
      statisticBlock.append(errorBlock);
    }

    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('btn', 'new-game-btn');
    newGameBtn.innerText = 'Новая игра';
    statisticBlock.append(newGameBtn);

    const exitGameBtn = document.createElement('button');
    exitGameBtn.classList.add('btn', 'exit-game-btn');
    exitGameBtn.innerText = 'Выйти из игры';
    statisticBlock.append(exitGameBtn);
  }

  createAnsweredWords(word, block) {
    console.log(word);
  }

  createErrorWords(word, block) {
    console.log(word);
  }

}
