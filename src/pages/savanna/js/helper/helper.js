import { userNameElement, levelSelector, roundSelector } from './constants';

const helper = {
  renderUserName(userSettings) {
    userNameElement.innerText = `Hi, ${userSettings.name}!`;
  },

  renderEmptyUserName() {
    userNameElement.innerText = '';
  },
  getLevelFromOptions() {
    console.log (+levelSelector.value)
    console.log (typeof +levelSelector.value)
    return +levelSelector.value;
  },
  getRoundFromOptions() {
    console.log (+roundSelector.value)
    console.log (typeof +roundSelector.value)
    return +roundSelector.value;
  },
  async getCardsbyApi(dataController, level, round) {
    const dataSet = await dataController.getWords({
      wordsPerPage: 100,
      group: level,
      page: round,
    });
    return dataSet.sort(() => Math.random() - 0.5);
  },
};

export default helper;
