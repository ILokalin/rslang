import { userName, levelSelect, roundSelect, ERRORS_MAX_COUNT } from '../data/constants';

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
      //Utils.openModal(`API request failed with error: ${err.message}`);
    }
    return wordsArr;
  },

  getCard: (id, word, image) =>
    `<div class="card-image">
       <img src="${image}" alt="card">
    </div>
    <div class="card-content">
       <span class="card-title">${word}</span>
    </div>
    `,

  getWordCard: (word) =>
    `<div class="card-image">
       <img src="../img/blank.jpg" alt="empty">
     </div>
     <div class="card-content">
       <span class="card-title">${word}</span>
     </div>
  `,

  disableCardDragging: () => {
    const CARDS = document.querySelectorAll('.cards draggable');
    CARDS.forEach((item) => {
      const card = item;
      card.classList.remove('draggable');
    });
    /*if (JSON.parse(localStorage.isStart) === true) {
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
      }*/
  },

  updateUserStatistics: async (userId, token, statistics) => {},
};

export default Utils;
