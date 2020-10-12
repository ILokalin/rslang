import {
  WORD_TRANSLATION,
  WORD_INPUT,
  WORD_IMG,
  SCORE,
  SCORE_TOTAL_COUNT,
  RESULTS,
  ERRORS_MAX_COUNT,
  LEVELS_MAX_COUNT,
  ROUNDS_MAX_COUNT,
  CARDS_ITEMS,
  userNameEl,
  levelSelectEl,
  roundSelectEl,
  errorMessageEl,
} from '../data/constants';

const Utils = {
  displayUserName: (userSettings) => {
    userNameEl.innerText = userSettings.name;
  },

  getCurrentRound: () => {
    if (!localStorage.getItem('speakItGameRound')) {
      localStorage.setItem('speakItGameRound', '1.1');
    }
    return localStorage.getItem('speakItGameRound');
  },

  setCurrentRound: (round) => {
    localStorage.setItem('speakItGameRound', round);
  },

  getUserWordsForRound: async (dataController) => {
    let wordsArr;
    try {
      wordsArr = await dataController.userWordsGetAll(['onlearn']);
    } catch (err) {
      Utils.openModal(`API request failed with error: ${err.message}`);
    }
    return wordsArr;
  },

  getWordsForRound: async (dataController) => {
    const level = parseInt(levelSelectEl.value, 10) - 1;
    const round = parseInt(roundSelectEl.value, 10) - 1;
    let wordsArr;
    try {
      wordsArr = await dataController.getWords({
        wordsPerPage: ERRORS_MAX_COUNT,
        group: level,
        page: round,
      });
    } catch (err) {
      Utils.openModal(`API request failed with error: ${err.message}`);
    }
    return wordsArr;
  },

  openModal: (message) => {
    // eslint-disable-next-line no-undef
    const modal = M.Modal.getInstance(document.querySelector('.modal'));
    errorMessageEl.innerText = message;
    modal.open();
  },

  playAudio: (src) => {
    const audio = new Audio(src);
    audio.play();
  },

  getCard: (data) =>
    `<span class="audio-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg></span>
        <p class="word">${data.word}</p>
        <p class="transcription">${data.transcription}</p>
        <p class="translation">${data.wordTranslate}</p>`,

  cardClicked: (card) => {
    Utils.resetCards();
    card.classList.add('activeItem');
  },

  resetCardMinWidth(minHeight) {
    const height = CARDS_ITEMS.offsetHeight.toString();
    CARDS_ITEMS.style.minHeight = `${minHeight || height}px`;
  },

  resetCards: () => {
    const CARDS = document.querySelectorAll('.container .item');
    CARDS.forEach((card) => card.classList.remove('activeItem'));
  },

  resetMainCard: () => {
    WORD_IMG.src = WORD_IMG.dataset.src;
    WORD_TRANSLATION.innerText = WORD_TRANSLATION.dataset.text;
    WORD_INPUT.value = '';
    if (JSON.parse(localStorage.isStartSpeakIt) === true) {
      WORD_INPUT.classList.remove('none');
      WORD_TRANSLATION.classList.add('none');
    } else {
      WORD_INPUT.classList.add('none');
      WORD_TRANSLATION.classList.remove('none');
    }
  },

  disableCardClick: () => {
    const CARDS = document.querySelectorAll('.container .item');
    if (JSON.parse(localStorage.isStartSpeakIt) === true) {
      CARDS.forEach((item) => {
        const card = item;
        card.style.pointerEvents = 'none';
        card.classList.remove('activeItem');
      });
    } else {
      CARDS.forEach((item) => {
        const card = item;
        card.style.pointerEvents = 'auto';
      });
    }
  },

  onReturnBtnClick: (e) => {
    RESULTS.classList.add('hidden');
    e.preventDefault();
  },

  prepareScore: () => {
    SCORE.innerHTML = '';
    if (JSON.parse(localStorage.isStartSpeakIt) === true) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < SCORE_TOTAL_COUNT; i++) {
        SCORE.insertAdjacentHTML('beforeend', `<div class="star"></div>`);
      }
    }
  },

  decreaseScore: () => {
    SCORE.removeChild(SCORE.firstChild);
    return SCORE.children.length;
  },

  totalScore: () => {
    return SCORE.children.length;
  },

  goToTop: () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },

  validateRoundValue: () => {
    const round = parseInt(roundSelectEl.value, 10);
    if (round > ROUNDS_MAX_COUNT) {
      roundSelectEl.value = ROUNDS_MAX_COUNT;
    }
  },

  goToNextRound: () => {
    const level = parseInt(levelSelectEl.value, 10);
    const round = parseInt(roundSelectEl.value, 10);
    if (round < ROUNDS_MAX_COUNT) {
      roundSelectEl.value = round + 1;
    } else if (level < LEVELS_MAX_COUNT) {
      levelSelectEl.value = level + 1;
      roundSelectEl.value = 1;
    } else {
      levelSelectEl.value = 1;
      roundSelectEl.value = 1;
    }
  },

  isUserWordsSelected: () => {
    return levelSelectEl.selectedOptions[0].value === '0';
  },

  storageHandle: ({ key }) => {
    if (key === 'isLogin') {
      window.location.reload();
    }
  },
};

export default Utils;
