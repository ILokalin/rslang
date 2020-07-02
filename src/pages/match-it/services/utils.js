import {
  userName,
  levelSelect,
  roundSelect,
  LEVELS_MAX_COUNT,
  ROUNDS_MAX_COUNT,
  ERRORS_MAX_COUNT,
} from '../data/constants';

const Utils = {
  displayUserName: (userSettings) => {
    userName.innerText = `${userSettings.name}`;
  },

  displayEmptyUserName: () => {
    //userNameEl.innerText = '';
  },

  getUserWordsOption: () => {
    if (!JSON.parse(localStorage.matchItGameUseUserWords || 'false')) {
      localStorage.matchItGameUseUserWords = true;
    }
    return JSON.parse(localStorage.matchItGameUseUserWords);
  },

  setUserWordsOption: (value) => {
    localStorage.matchItGameUseUserWords = value;
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
      wordsArr = await dataController.userWordsGetAll(['deleted']);
    } catch (err) {
      //Utils.openModal(`API request failed with error: ${err.message}`);
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
      //Utils.openModal(`API request failed with error: ${err.message}`);
    }
    return wordsArr;
  },

  getCard: (id, image) =>
    `<div class="card-image">
       <img src="${image}" alt="card">
    </div>
    <div class="card-content hidden">
       <span class="card-title"></span>
    </div>
    `,

  getWordCard: (word) => `<span class="white-text truncate">${word}</span>`,

  displayResults: () => {
    const cardsContent = document.querySelectorAll('.card-content');
    cardsContent.forEach((item) => {
      const card = item;
      card.classList.add('results');
      card.classList.remove('hidden');
    });
  },

  disableCardsTransfer: () => {
    const CARDS = document.querySelectorAll('.cards .draggable');
    CARDS.forEach((item) => {
      const card = item;
      card.style.pointerEvents = 'none';
    });
  },

  goToNextRound: () => {
    const currentRound = Utils.getCurrentRound().split('.');
    let [level, round] = currentRound;
    level = parseInt(level, 10);
    round = parseInt(round, 10);
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

  updateUserStatistics: async (userId, token, statistics) => {},
};

export default Utils;
