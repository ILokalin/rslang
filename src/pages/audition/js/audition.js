import AuditionGameStatistics from './game-statistics'

export default class AuditionGame {
  constructor() {
    this.user = localStorage.getItem('user') || 'Dick McDickennson';
    this.level = 0;
    this.round = 0;
    this.roundsData = [];

    this.startGame();

    this.correctWords = [];
    this.errorWords = [];
    this.wordClickListener = this.checkAnswer.bind(this);
    this.showAnswerListener = this.showAnswer.bind(this);
    this.endRoundListener = this.endRound.bind(this);
  }

  static getRandomNumber (max) {
      return Math.floor(Math.random() * Math.floor(max));
  }

  startGame() {
    this.round = 0;
    document.body.innerHTML = '';

    const pages = this.generatePages();
    this.getWords(pages);
  }

  generatePages() {
    const pages = [];

    while(pages.length < 3) {
      const page = AuditionGame.getRandomNumber(29);

      if (!pages.includes(page)) {
        pages.push(page);
      }
    }

    return pages;
  }

  fetchWords(pageNumber) {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${this.level}&page=${pageNumber}`;

    return fetch(url);
  }


  getWords(pages) {
    Promise.all(pages.map(page => this.fetchWords(page)))
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(result => {
        const words = [].concat(...result).sort(() => Math.random() - Math.random());

        this.createRoundsData(words);
        this.createCurrentRoundPage();
        this.createNextRoundPage();
        this.startRound();
      })
      .catch(() => {
        // TODO redirect to err page or display err message
        alert('Something went wrong. Try later');
      })
  }

  createRoundsData(words) {
    while (this.roundsData.length < 10) {
      const roundWords = words.splice(0, 5);
      const roundData = {};

      roundData.word = roundWords[0].word;
      roundData.wordTranslate = roundWords[0].wordTranslate;
      roundData.audio = new Audio(roundWords[0].audio.replace('files', 'sound'));
      roundData.image = roundWords[0].image.replace('files', 'img');
      roundData.translations = roundWords.map((word) => word.wordTranslate);

      roundData.translations.sort(() => Math.random() - Math.random());

      this.roundsData.push(roundData);
    }
  }

  createCurrentRoundPage () {
    const roundData = this.roundsData[this.round];
    const wrapper = this.createRoundPage(roundData);

    wrapper.classList.add('current-round')
  }

  createNextRoundPage () {
    const roundData = this.roundsData[this.round + 1];
    const wrapper = this.createRoundPage(roundData);

    wrapper.classList.add('next-round')
  }

  createRoundPage(data) {

    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game-wrapper');
    document.body.append(gameWrapper);

    const wordImageEl = document.createElement('div');
    wordImageEl.classList.add('word-image-element');
    wordImageEl.style.backgroundImage = `url(${data.image})`;
    gameWrapper.append(wordImageEl);

    const audioEl = document.createElement('div');
    audioEl.classList.add('audio-element');
    audioEl.addEventListener('click', () => {
      data.audio.play();
    });
    gameWrapper.append(audioEl);

    const puzzledWordEl = document.createElement('div');
    puzzledWordEl.classList.add('puzzled-word-element');
    puzzledWordEl.innerText = data.word;
    gameWrapper.append(puzzledWordEl);

    const wordTranslationBlock = document.createElement('div');
    wordTranslationBlock.classList.add('words-translations-block');
    data.translations.forEach((el) => this.writeWordsTranslations(el, wordTranslationBlock));
    wordTranslationBlock.addEventListener('click', this.wordClickListener);
    gameWrapper.append(wordTranslationBlock);

    const checkAnswerBtn = document.createElement('button');
    checkAnswerBtn.classList.add('check-answer-btn');
    checkAnswerBtn.innerText = ('Я не знаю');
    checkAnswerBtn.addEventListener('click', this.showAnswerListener);
    gameWrapper.append(checkAnswerBtn);

    return gameWrapper;
  }

  writeWordsTranslations(el, block) {
    const wordTranslationEl = document.createElement('div');
    wordTranslationEl.classList.add('words-translations-element');
    wordTranslationEl.innerText = el;
    wordTranslationEl.id = el;
    block.append(wordTranslationEl);
  }

  showAnswer() {
    const image = document.querySelector('.word-image-element');
    const word = document.querySelector('.puzzled-word-element');
    const checkAnswerBtn = document.querySelector('.check-answer-btn');

    image.classList.add('answered');
    word.classList.add('answered');

    if (this.round === 9) {
      checkAnswerBtn.innerText = ('Конец игры');
    } else {
      checkAnswerBtn.innerText = ('Следующий вопрос');
    }

    checkAnswerBtn.removeEventListener('click', this.showAnswerListener)
    checkAnswerBtn.addEventListener('click', this.endRoundListener)
  }

  checkAnswer(event) {
    const word = this.roundsData[this.round].wordTranslate;
    const wordTranslationBlock = document.querySelector('.words-translations-block');

    if (event.target.id) {
      if(event.target.id === word) {
        event.target.classList.add('correct');
        this.correctWords.push(word);

      } else {
        event.target.classList.add('wrong');
        this.errorWords.push(word);
      }
    }

    wordTranslationBlock.removeEventListener('click', this.wordClickListener);
  }

  startRound() {
    setTimeout(() => this.roundsData[this.round].audio.play(), 500);
  }

  nextRound() {
    this.round += 1;
    const currentRoundPage = document.querySelector('.game-wrapper.current-round');
    currentRoundPage.classList.remove('current-round');
    currentRoundPage.classList.add('previous-round');


    if (this.round < 9) {
      const nextRoundPage = document.querySelector('.game-wrapper.next-round');
      nextRoundPage.classList.remove('next-round');
      nextRoundPage.classList.add('current-round');
      this.createNextRoundPage();
    }

    this.startRound();

  }

  endRound() {
    if (this.round === 9) {
      this.endGame();
    } else {
      this.nextRound();
    }
  }

  endGame() {
    new AuditionGameStatistics (this.correctWords, this.errorWords)
  }
}


