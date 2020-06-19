export default class AuditionGame {
  constructor () {
    this.user = localStorage.getItem('user') || 'Dick McDickennson';
    this.level = 0;
    this.round = 0;
    this.currentWordsTranslations = [];
    this.currentPuzzledWord = {};
    this.nextWordsTranslations = [];
    this.nextPuzzledWord = {};
    this.startGame();
    this.correctWords = [];
    this.errorWords = [];
  }

  static getRandomNumber (max) {
      return Math.floor(Math.random() * Math.floor(max));
  }

  getPuzzledWord () {
    const pageNumber = AuditionGame.getRandomNumber(29);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${this.level}&page=${pageNumber}`
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        const randomNumber = AuditionGame.getRandomNumber(19);
        this.currentPuzzledWord.word = result[randomNumber].word;
        this.currentPuzzledWord.wordTranslate = result[randomNumber].wordTranslate;
        this.currentPuzzledWord.audio = new Audio(result[randomNumber].audio.replace('files', 'sound'));
        this.currentPuzzledWord.image = result[randomNumber].image.replace('files', 'img');
      })
      .then(() => this.currentWordsTranslations.push(this.currentPuzzledWord.wordTranslate))
      .then(() => setTimeout(() => this.currentPuzzledWord.audio.play(), 1000))
      .then(() => this.getCurrentWordsTranslations())
  }

  getCurrentWordsTranslations () {
    const pageNumber = AuditionGame.getRandomNumber(29);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${this.level}&page=${pageNumber}`
    fetch(url)
      .then((res) => res.json())
      .then ((result) => {
        while (this.currentWordsTranslations.length < 5) {
          const randomNumber = AuditionGame.getRandomNumber(19);
          const word = result[randomNumber].wordTranslate;
          if(!this.currentWordsTranslations.includes(word)) {
            this.currentWordsTranslations.push(word);
          }
        }
        this.currentWordsTranslations.sort(() => Math.random() - Math.random());
      })
      .then(() => this.writeRoundData())
  }

  getNextWordsTranslations () {
    const pageNumber = AuditionGame.getRandomNumber(29);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${this.level}&page=${pageNumber}`
    fetch(url)
      .then((res) => res.json())
      .then ((result) => {
        while (this.nextWordsTranslations.length < 5) {
          const randomNumber = AuditionGame.getRandomNumber(19);
          const word = result[randomNumber].wordTranslate;
          if(!this.nextWordsTranslations.includes(word)) {
            this.nextWordsTranslations.push(word);
          }
        }
        this.nextWordsTranslations.sort(() => Math.random() - Math.random());
      })
  }

  getRoundData () {
    this.getPuzzledWord();

    if (this.round < 9) {
      // this.nextPuzzledWord = this.getPuzzledWord();
      // // this.nextWordsTranslations.push(this.nextPuzzledWord.wordTranslate);
      // this.getNextWordsTranslations();
      // this.writeNextRoundData();
    }
  }

  writeRoundData() {
    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game-wrapper');
    document.body.append(gameWrapper);

    const wordImageEl = document.createElement('div');
    wordImageEl.classList.add('word-image-element');
    wordImageEl.style.backgroundImage = `url(${this.currentPuzzledWord.image})`;
    gameWrapper.append(wordImageEl);

    const audioEl = document.createElement('div');
    audioEl.classList.add('audio-element');
    audioEl.addEventListener('click', () => {
      this.currentPuzzledWord.audio.play();
    })
    gameWrapper.append(audioEl);

    const puzzledWordEl = document.createElement('div');
    puzzledWordEl.classList.add('puzzled-word-element');
    puzzledWordEl.innerText = this.currentPuzzledWord.word;
    gameWrapper.append(puzzledWordEl);

    const wordTranslationBlock = document.createElement('div');
    wordTranslationBlock.classList.add('words-translations-block');
    this.currentWordsTranslations.forEach((el) => this.writeWordsTranslations(el, wordTranslationBlock))
    wordTranslationBlock.addEventListener('click', this.checkAnswer.bind(this))
    gameWrapper.append(wordTranslationBlock);
  }

  writeWordsTranslations(el, block) {
    const wordTranslationEl = document.createElement('div');
    wordTranslationEl.classList.add('words-translations-element')
    wordTranslationEl.innerText = el;
    block.append(wordTranslationEl);
  }

  checkAnswer(event) {
    if(event.target.innerText === this.currentPuzzledWord.wordTranslate) {
      console.log( this.currentPuzzledWord.wordTranslate)
      event.target.classList.add('correct')
    } else {
      event.target.classList.add('wrong')
    }
  }

  startGame() {
    this.round = 0;
    document.body.innerHTML = '';
    this.getRoundData();

  }

  nextRound () {
    this.round += 1;
    this.getRoundData();
  }


  endRoundHandler () {
    if (this.round = 10) {
      this.endGame();
    }

    this.nextRound ();
  }
}
