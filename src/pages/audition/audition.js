export default class AuditionGame {
  constructor () {
    this.user = localStorage.getItem('user') || 'Dick McDickennson';
    this.level = 0;
    this.wordsTranslations = [];
    this.puzzledWord = this.getPuzzledWord();
    console.log(this.wordsTranslations);
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
        const puzzledWord = {};
        puzzledWord.word = result[randomNumber].word;
        puzzledWord.wordTranslate = result[randomNumber].wordTranslate;
        puzzledWord.audio = result[randomNumber].audio;
        puzzledWord.image = result[randomNumber].image;
        console.log(puzzledWord);
        this.wordsTranslations.push(puzzledWord.wordTranslate);
        return puzzledWord;
      })
      .then(() => this.getWordsTranslations())
  }

  getWordsTranslations () {
    const pageNumber = AuditionGame.getRandomNumber(29);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${this.level}&page=${pageNumber}`
    fetch(url)
      .then((res) => res.json())
      .then ((result) => {
        while (this.wordsTranslations.length < 5) {
          const randomNumber = AuditionGame.getRandomNumber(19);
          const word = result[randomNumber].wordTranslate;
          if(!this.wordsTranslations.includes(word)) {
            this.wordsTranslations.push(word);
          }
        }
        this.wordsTranslations.sort(() => Math.random() - Math.random());
      })
  }
}
