import AuditionGameStatistics from './game-statistics'
import { DataController } from 'Service/DataController';
import {
  DATA_URL,
  gameContainer,
  abortGameBtn,
  userNameEl,
  navigationMenuEl,
} from './constants'

export default class AuditionGame {
  constructor() {
    this.user = '';
    this.level = 0;
    this.round = 0;
    this.correctAnswers = 0;
    this.roundsData = [];
    this.dataController = new DataController();

    this.getUserData();
    this.addSelectDifficultyHandler();

    this.wordClickListener = this.checkAnswer.bind(this);
    this.showAnswerListener = this.showAnswer.bind(this);
    this.endRoundListener = this.endRound.bind(this);
    this.logInListener = this.getUserData.bind(this);
    this.addKeyboardHandler();

  }

  static getRandomNumber (max) {
      return Math.floor(Math.random() * Math.floor(max));
  }

  addKeyboardHandler() {
    document.addEventListener('keydown', this.keyboardHandler.bind(this));
  }

  keyboardHandler(e) {
    const { key } = e;
    if(key >= 1 && key <= 5) {
      const word = this.roundsData[this.round].wordTranslate;
      const selectedEl = document.querySelector (`.current-round [data-order="${key}"]`);
      const selectedAnswer = selectedEl.innerText.slice(3);

        if (selectedAnswer === word) {
          selectedEl.classList.add('correct');
          this.showAnswer();
          this.roundsData[this.round].answer = true;

        } else {
          selectedEl.classList.add('wrong');
          this.showAnswer();
          this.roundsData[this.round].answer = false;
        }
      }

      if(key === `Enter`) {
        const puzzledWord = document.querySelector('.current-round > .puzzled-word-element');
        if(puzzledWord.classList.contains ('answered')) {
          this.endRound();
        } else {
          this.showAnswer();
        }
      }
    }


  addSelectDifficultyHandler() {
    navigationMenuEl.addEventListener('click', this.selectDifficultyHandler.bind(this))
  }

  selectDifficultyHandler(e) {
    if (e.target.hasAttribute('data-id')) {
      const itemId = parseInt(e.target.getAttribute('data-id'), 10);
      this.level = itemId;
      this.startGame();
    }
  }

  getUserData() {
    this.dataController.getUser()
      .then(
        (userSettings) => {
          userNameEl.innerText = userSettings.name;
          this.user = userSettings.name;
          userNameEl.removeEventListener('click', this.logInListener);
          this.startGame();
        },
        (rejectReport) => {
          console.log(rejectReport);
          userNameEl.innerText = 'Log In';
          userNameEl.addEventListener('click', this.logInListener);
          this.startGame();
        }
      )
  }

  startGame() {
    this.round = 0;
    this.roundsData = [];
    gameContainer.innerHTML = '';

    if (this.user) {
      this.getUserWords();
    } else {
      const pages = this.generatePages();
      this.getWords(pages);
    }
  }

  getUserWords() {
    this.dataController.userWordsGetAll()
      .then(
        (response) => {
          const words = response;
          // this.createRoundsData(words);
          // this.createCurrentRoundPage();
          // this.createNextRoundPage();
          // this.startRound();
        },
        (rejectReport) => {
          console.log(rejectReport);
        }
      )
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
      roundData.audio = new Audio(`${DATA_URL}/${roundWords[0].audio}`);
      roundData.image = `${DATA_URL}/${roundWords[0].image}`;
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
    gameContainer.append(gameWrapper);

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
    data.translations.forEach((el, index) => this.writeWordsTranslations(el, index + 1, wordTranslationBlock));
    wordTranslationBlock.addEventListener('click', this.wordClickListener);
    gameWrapper.append(wordTranslationBlock);

    const checkAnswerBtn = document.createElement('button');
    checkAnswerBtn.classList.add('check-answer-btn');
    checkAnswerBtn.classList.add('btn');
    checkAnswerBtn.innerText = ('Я не знаю');
    checkAnswerBtn.addEventListener('click', this.showAnswerListener);
    gameWrapper.append(checkAnswerBtn);

    return gameWrapper;
  }

  writeWordsTranslations(el, order, block) {
    const wordTranslationEl = document.createElement('div');
    wordTranslationEl.classList.add('words-translations-element');
    wordTranslationEl.innerText = `${order}. ${el}`;
    wordTranslationEl.id = el;
    wordTranslationEl.setAttribute('data-order', order)
    block.append(wordTranslationEl);
  }

  showAnswer() {
    const word = this.roundsData[this.round].wordTranslate;
    const image = document.querySelector('.current-round > .word-image-element');
    const puzzledWord = document.querySelector('.current-round > .puzzled-word-element');
    const checkAnswerBtn = document.querySelector('.current-round > .check-answer-btn');
    const wordTranslationBlock = document.querySelector('.current-round > .words-translations-block');

    wordTranslationBlock.removeEventListener('click', this.wordClickListener);

    image.classList.add('answered');
    puzzledWord.classList.add('answered');
    this.roundsData[this.round].answer = false;

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
    const wordTranslationBlock = document.querySelector('.current-round > .words-translations-block');


    if (event.target.id) {
      wordTranslationBlock.removeEventListener('click', this.wordClickListener);

      if(event.target.id === word) {
        event.target.classList.add('correct');
        this.showAnswer();
        this.roundsData[this.round].answer = true;

      } else {
        event.target.classList.add('wrong');
        this.showAnswer();
        this.roundsData[this.round].answer = false;
      }
    }
  }

  startRound() {
    setTimeout(() => this.roundsData[this.round].audio.play(), 500);
  }

  nextRound() {
    this.round += 1;
    const currentRoundPage = document.querySelector('.game-wrapper.current-round');
    currentRoundPage.classList.remove('current-round');
    currentRoundPage.classList.add('previous-round');

    const nextRoundPage = document.querySelector('.game-wrapper.next-round');
    nextRoundPage.classList.remove('next-round');
    nextRoundPage.classList.add('current-round');

    if (this.round < 9) {
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
    new AuditionGameStatistics(this.roundsData);
  }
}


