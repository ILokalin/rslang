import { userNameElement, audio, preloader } from './constants';
import '../../assets/img/savanna-heart.svg';

const helper = {
  renderUserName(user) {
    userNameElement.innerText = `Hi, ${user.name}!`;
  },

  renderEmptyUserName() {
    userNameElement.innerText = '';
  },

  async getWordsByApi(dataController) {
    preloader.classList.remove('hidden');
    const dataSetForGame = [];
    const round1 = dataController.getWords({ group: 0, wordsPerPage: 600 }).then((data) => data);
    const round2 = dataController.getWords({ group: 1, wordsPerPage: 600 }).then((data) => data);
    const round3 = dataController.getWords({ group: 2, wordsPerPage: 600 }).then((data) => data);
    const round4 = dataController.getWords({ group: 3, wordsPerPage: 600 }).then((data) => data);
    const round5 = dataController.getWords({ group: 4, wordsPerPage: 600 }).then((data) => data);
    const round6 = dataController.getWords({ group: 5, wordsPerPage: 600 }).then((data) => data);
    const dataSet = Promise.all([round1, round2, round3, round4, round5, round6]).then(
      (data) => data,
    );
    (await dataSet).forEach((element) => {
      const round = [];
      round.push(
        element
          .slice(0, 100)
          .sort(() => Math.random() - 0.5)
          .splice(0, 5),
      );
      round.push(
        element
          .slice(100, 200)
          .sort(() => Math.random() - 0.5)
          .splice(0, 5),
      );
      round.push(
        element
          .slice(200, 300)
          .sort(() => Math.random() - 0.5)
          .splice(0, 5),
      );
      round.push(
        element
          .slice(300, 400)
          .sort(() => Math.random() - 0.5)
          .splice(0, 5),
      );
      round.push(
        element
          .slice(400, 500)
          .sort(() => Math.random() - 0.5)
          .splice(0, 5),
      );
      round.push(
        element
          .slice(500, 600)
          .sort(() => Math.random() - 0.5)
          .splice(0, 5),
      );
      dataSetForGame.push(round);
    });
    preloader.classList.add('hidden');
    return dataSetForGame;
  },

  async getTranslatesByApi(dataController) {
    preloader.classList.remove('hidden');
    const transtales = [];
    const dataSet = dataController
      .getWords({ group: 0, wordsPerPage: 600 })
      .then((data) => data.sort(() => Math.random() - 0.5));
    (await dataSet).forEach((element) => transtales.push(element.wordTranslate));
    preloader.classList.add('hidden');
    return transtales;
  },

  async getWordsRepeatByApi(dataController) {
    preloader.classList.remove('hidden');
    const repeatWords = dataController
      .userWordsGetAll(['onlearn', 'hard', 'deleted'])
      .then((data) => data[0].paginatedResults.sort(() => Math.random() - 0.5).slice(0, 36));
    preloader.classList.add('hidden');
    return repeatWords;
  },
  createStatElement(word, translate) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${word}</td>
                    <td>${translate}</td>`;
    return tr;
  },

  sendStatistic(dataController, wordsObject) {
    const winRate = Math.round(
      (wordsObject.knowWords.length /
        (wordsObject.dontKnowWords.length + wordsObject.knowWords.length)) *
        100,
    );

    dataController
      .setUserStatistics({
        savanna: {
          result: winRate,
          knownWords: wordsObject.knowWords.length,
          mistakeWords: wordsObject.dontKnowWords.length,
        },
      })
      .then((dataStat) => console.log(dataStat));
  },

  makeCorrectNoise() {
    audio.src = '../sound/savanna-correct.mp3';
  },

  makeErrorNoise() {
    audio.src = '../sound/savanna-error.mp3';
  },

  makeWinNoise() {
    audio.src = '../sound/savanna-win.mp3';
  },

  makeDefeatNoise() {
    audio.src = '../sound/savanna-defeat.mp3';
  },
};

export default helper;
