import {
  userName,
  levelSelect,
  roundSelect,
  LEVELS_MAX_COUNT,
  ROUNDS_MAX_COUNT,
  ERRORS_MAX_COUNT,
  results,
  errorMessage,
} from '../data/constants';

const Utils = {
  displayUserName: (userSettings) => {
    userName.innerText = `${userSettings.name}`;
  },

  getCurrentRound: () => {
    if (!localStorage.getItem('matchItGameRound')) {
      localStorage.setItem('matchItGameRound', '1.1');
    }
    return localStorage.getItem('matchItGameRound');
  },

  setCurrentRound: (round) => {
    localStorage.setItem('matchItGameRound', round);
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
    const level = parseInt(levelSelect.value, 10) - 1;
    const round = parseInt(roundSelect.value, 10) - 1;
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
    errorMessage.innerText = message;
    modal.open();
  },

  getCard: (id, image) =>
    `<div class="card-image">
       <img src="${image}" alt="card">
    </div>
    <div class="card-content hidden">
       <span class="card-title"></span>
    </div>
    `,

  getWordCard: (word, translation) =>
    `<span class="white-text truncate">${word}</span><span class="translation">${translation}</span>`,

  displayResults: () => {
    const cardsContent = document.querySelectorAll('.container__cards .draggable');
    cardsContent.forEach((item) => {
      const card = item;
      card.classList.add('results');
      if (card.success) {
        card.classList.add('success');
      } else {
        card.classList.add('error');
      }
    });
  },

  disableCardsTransfer: () => {
    const CARDS = document.querySelectorAll('.cards .draggable');
    CARDS.forEach((item) => {
      const card = item;
      card.style.pointerEvents = 'none';
    });
  },

  onReturnBtnClick: (e) => {
    results.classList.add('hidden');
    e.preventDefault();
  },

  goToNextRound: () => {
    const level = parseInt(levelSelect.value, 10);
    const round = parseInt(roundSelect.value, 10);
    if (round < ROUNDS_MAX_COUNT) {
      roundSelect.value = round + 1;
    } else if (level < LEVELS_MAX_COUNT) {
      levelSelect.value = level + 1;
      roundSelect.value = 1;
    } else {
      levelSelect.value = 1;
      roundSelect.value = 1;
    }
  },

  isUserWordsSelected: () => {
    return levelSelect.selectedOptions[0].value === '0';
  },

  goToTop: () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },

  storageHandle: ({ key }) => {
    if (key === 'isLogin') {
      window.location.reload();
    }
  },
};

export default Utils;
