import { userNameElement, audio } from './constants';

const helper = {
  renderUserName(userSettings) {
    userNameElement.innerText = `Hi, ${userSettings.name}!`;
  },

  renderEmptyUserName() {
    userNameElement.innerText = '';
  },

  async getCardsbyApi(dataController, level) {
    const dataSet = await dataController.getWords({
      wordsPerPage: 600,
      group: level,
    });
    return dataSet.sort((a, b) => a.page - b.page);
  },
  createStatElement(word, translate) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${word}</td>
                    <td>${translate}</td>`;
    return tr;
  },

  makeCorrectNoise() {
    audio.src = '../sound/correct.mp3';
  },

  makeErrorNoise() {
    audio.src = '../sound/error.mp3';
  },

  makeWinNoise() {
    audio.src = '../sound/success.mp3';
  },

  makeDefeatNoise() {
    audio.src = '../sound/failure.mp3';
  }
};

export default helper;
