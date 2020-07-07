import AuditionGameStatistics from './game-statistics'
import { DataController } from 'Service/DataController';
import {
  gameContainer,
  userNameEl,
  difficultySelector,
  logInBtn,
  errorMessageEl,
  selectWordsWindow,
  ownWordsBtn,
  allWordsBtn,
} from './constants';

export default class AuditionGame {
  constructor() {
    this.user = '';
    this.level = 0;
    this.round = 0;
    this.roundsNumber = 10;
    this.roundsData = [];
    this.dataController = new DataController();

    this.getUserData();
    this.addSelectDifficultyHandler();

    this.wordClickListener = this.checkAnswer.bind(this);
    this.showAnswerListener = this.showAnswer.bind(this);
    this.endRoundListener = this.endRound.bind(this);
    this.logInListener = this.getUserData.bind(this);
    this.keyboardNumbersListener = this.keyboardNumbersHandler.bind(this);
    this.keyboardEnterListener = this.keyboardEnterHandler.bind(this);
  }

  static openModal(message)  {
    const modal = M.Modal.getInstance(document.querySelector('.modal'));
    errorMessageEl.innerText = message;
    modal.open();
  }

  static getRandomNumber (max) {
      return Math.floor(Math.random() * Math.floor(max));
  }

  addKeyboardHandler() {
    document.addEventListener('keydown', this.keyboardNumbersListener);
    document.addEventListener('keydown', this.keyboardEnterListener);
  }

  keyboardNumbersHandler(e) {
    const { key } = e;

    if (key >= 1 && key <= 5) {
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
    }

  keyboardEnterHandler(e) {
    const { key } = e;

    if (key === `Enter`) {
      const puzzledWord = document.querySelector('.current-round > .puzzled-word-element');
      
      if (puzzledWord.classList.contains ('answered')) {
        this.endRound();
      } else {
        this.showAnswer();
      }
    }
  }


  addSelectDifficultyHandler() {
    difficultySelector.addEventListener('change', this.selectDifficultyHandler.bind(this))
  }

  selectDifficultyHandler(e) {
    this.level = e.target.value;
    this.startGame();
  }

  getUserData() {
    this.dataController.getUser()
      .then(
        (userSettings) => {
          this.user = userSettings.name;
          userNameEl.innerText = this.user;
          this.startGame();
        },
        (rejectReport) => {
          logInBtn.classList.remove('hidden');
          logInBtn.addEventListener('click', this.logInListener);
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
      this.playWithAllWords();
    }
  }

  getUserWords() {
    this.dataController.userWordsGetAll(['onlearn'])
      .then(
        (response) => {
          const words = response[0].paginatedResults;

          if (words.length < 10) {
            const message = 'Вы не выучили достаточное количество слов для игры. Игра начнется со всеми словами.'
            
            AuditionGame.openModal(message);
            this.playWithAllWords();
          } else {
            this.showSelectWordsWindow(words);
          }
        },
        (rejectReport) => {
          const message = `API request failed with error: ${rejectReport.message}`;

          AuditionGame.openModal(message);
        }
      )
  }

  showSelectWordsWindow(words) {
    selectWordsWindow.classList.remove('hidden');
    
    ownWordsBtn.onclick = () => {
      this.playWithOwnWords(words);
      selectWordsWindow.classList.add('hidden');
    };

    allWordsBtn.onclick = () => {
      this.playWithAllWords();
      selectWordsWindow.classList.add('hidden');
    };
  }

  playWithOwnWords(words) {
    words.sort(() => Math.random() - Math.random());

    if (words.length < 10) {
      this.roundsNumber = Math.floor(words.length/5);
    }

    const trigger= document.querySelector('.dropdown-trigger');
    trigger.disabled = true;
    this.createRoundsData(words);
    this.createCurrentRoundPage();
    this.createNextRoundPage();
    this.addKeyboardHandler();
    this.startRound();
  }

  playWithAllWords() {
    const pages = this.generatePages();

    this.getWords(pages);
  }

  generatePages() {
    const pages = [];

    while (pages.length < 3) {
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
        this.addKeyboardHandler();
        this.startRound();
      })
      .catch((err) => {
        const message = `API request failed with error: ${err.message}`
        AuditionGame.openModal(message);
      })
  }

  createRoundsData(words) {
    while (this.roundsData.length < this.roundsNumber) {
      const roundWords = words.splice(0, 5);
      const roundData = {};
      roundData.word = roundWords[0].word;
      roundData.wordTranslate = roundWords[0].wordTranslate;
      roundData.id = '';
      
      if (roundWords[0].id) {
        roundData.id = roundWords[0].id;
      } else if (roundWords[0]._id) {
        roundData.id = roundWords[0]._id;
      }
  
      roundData.audio = new Audio();
      roundData.image = new Image();

      this.dataController.getWordMaterials(roundData.id)
        .then((materialOfCard) => {
          roundData.image.src = materialOfCard.image;
          roundData.audio.src = materialOfCard.audio
          });
      
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
    data.image.classList.add('word-image');
    wordImageEl.appendChild(data.image);
    gameWrapper.append(wordImageEl);

    const puzzledWordEl = document.createElement('div');
    puzzledWordEl.classList.add('puzzled-word-element');
    puzzledWordEl.innerText = data.word;
    gameWrapper.append(puzzledWordEl);

    const audioEl = document.createElement('div');
    audioEl.classList.add('audio-element');
    audioEl.addEventListener('click', () => {
      data.audio.play();
    });
    gameWrapper.append(audioEl);

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
    document.removeEventListener('keydown', this.keyboardNumbersListener);

    image.classList.add('answered');
    puzzledWord.classList.add('answered');
    this.roundsData[this.round].answer = false;

    if (this.round === this.roundsNumber - 1) {
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
    document.removeEventListener('keydown', this.keyboardListener);

    if (event.target.id) {
      wordTranslationBlock.removeEventListener('click', this.wordClickListener);

      if (event.target.id === word) {
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
    
    document.addEventListener('keydown', this.keyboardNumbersListener);
    this.changeBackground();
  }

  nextRound() {
    this.round += 1;
    const currentRoundPage = document.querySelector('.game-wrapper.current-round');
    currentRoundPage.classList.remove('current-round');
    currentRoundPage.classList.add('previous-round');

    const nextRoundPage = document.querySelector('.game-wrapper.next-round');
    nextRoundPage.classList.remove('next-round');
    nextRoundPage.classList.add('current-round');

    if (this.round < this.roundsNumber - 1) {
      this.createNextRoundPage();
    }

    this.startRound();
  }

  endRound() {
    if (this.round === this.roundsNumber - 1) {
      this.endGame();
    } else {
      this.nextRound();
    }
  }

  endGame() {
    new AuditionGameStatistics(this.roundsData, this.user, this.startGame.bind(this));
  }

  changeBackground() {
    const percent = (this.round + 1) / this.roundsNumber * 100;
    const gradient = `linear-gradient(90deg,#3fccbf,#e0f2f1 ${percent}%)`;

    document.body.style.background = gradient;
  }
}


