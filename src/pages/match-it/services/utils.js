import { levelSelect, roundSelect, errorMessage } from '../data/constants';

const Utils = {
  displayUserName: (userSettings) => {
    //userNameEl.innerText = `Hi, ${userSettings.name}!`;
  },

  displayEmptyUserName: () => {
    // userNameEl.innerText = '';
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
};

export default Utils;
