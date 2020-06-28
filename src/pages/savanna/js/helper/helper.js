import { userNameElement, roundOption } from './constants';

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
  changeRoundOption() {
    roundOption.addEventListener('change', (event) => {
      console.log('changed', event);
    });
  },
};

export default helper;
