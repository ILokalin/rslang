import { userNameElement, audio, healtBar, health, menu, roundOption } from './constants';
import '../../assets/img/savanna-heart.svg';

const helper = {
  renderUserName(user) {
    userNameElement.innerText = `${user.name}`;
  },

  renderEmptyUserName() {
    userNameElement.innerText = '';
  },

  async getWordsByApi(dataController, level, round) {
    const words = await dataController.getWords({ group: level, page: round }).then((data) => data);
    return words.sort(() => Math.random() - 0.5);
  },

  async getTranslatesByApi(dataController) {
    const transtales = [];
    const dataSet = dataController
      .getWords({ group: 0, wordsPerPage: 600 })
      .then((data) => data.sort(() => Math.random() - 0.5));
    (await dataSet).forEach((element) => transtales.push(element.wordTranslate));
    return transtales;
  },

  async getWordsRepeatByApi(dataController) {
    let repeatWords = await dataController
      .userWordsGetAll(['onlearn', 'hard', 'deleted'])
      .then((data) => data[0].paginatedResults);
    if (repeatWords.length < 10) {
      repeatWords = null;
    }
    return repeatWords;
  },

  play(src) {
    const audioWord = new Audio(src);
    audioWord.play();
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

  setUserOption(dataController, level, round) {
    dataController
      .setUserOptions({ savanna: { lastLevel: level, lastRound: round } })
      .then((data) => console.log(data));
  },

  makeCorrectNoise() {
    audio.src = '../sound/savanna-correct.mp3';
  },

  makeErrorNoise() {
    audio.src = '../sound/savanna-error.mp3';
  },

  makeWinNoise(mute) {
    if (!mute) {
      audio.src = '../sound/savanna-win.mp3';
    }
  },

  makeDefeatNoise(mute) {
    if (!mute) {
      audio.src = '../sound/savanna-defeat.mp3';
    }
  },
  renredHearts() {
    for (let index = 0; index < health; index += 1) {
      const heart = document.createElement('span');
      heart.innerHTML = `<svg height="20pt" viewBox="0 -20 480 480" width="20pt" xmlns="http://www.w3.org/2000/svg">
      <path class="heart"
        d="m348 8c-44.773438.003906-86.066406 24.164062-108 63.199219-21.933594-39.035157-63.226562-63.195313-108-63.199219-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s232-120 232-292c0-68.480469-55.519531-132-124-132zm0 0"
        fill="#ff6243" />
      <path
        d="m348 0c-43 .0664062-83.28125 21.039062-108 56.222656-24.71875-35.183594-65-56.1562498-108-56.222656-70.320312 0-132 65.425781-132 140 0 72.679688 41.039062 147.535156 118.6875 216.480469 35.976562 31.882812 75.441406 59.597656 117.640625 82.625 2.304687 1.1875 5.039063 1.1875 7.34375 0 42.183594-23.027344 81.636719-50.746094 117.601563-82.625 77.6875-68.945313 118.726562-143.800781 118.726562-216.480469 0-74.574219-61.679688-140-132-140zm-108 422.902344c-29.382812-16.214844-224-129.496094-224-282.902344 0-66.054688 54.199219-124 116-124 41.867188.074219 80.460938 22.660156 101.03125 59.128906 1.539062 2.351563 4.160156 3.765625 6.96875 3.765625s5.429688-1.414062 6.96875-3.765625c20.570312-36.46875 59.164062-59.054687 101.03125-59.128906 61.800781 0 116 57.945312 116 124 0 153.40625-194.617188 266.6875-224 282.902344zm0 0"
        fill="#3e3d42" /></svg>`;
      healtBar.appendChild(heart);
    }
  },
  renderNeedMoreWords() {
    const li = document.createElement('li');
    li.innerHTML = `<a class="subheader">Недостаточно слов для повтора.</a>`;
    menu.appendChild(li);
  },
  renderRepeatDontWork() {
    const li = document.createElement('li');
    li.innerHTML = `<a class="subheader">Повторение слов недоступно, залогиньтесь.</a>`;
    menu.appendChild(li);
  },
  renderCurrentRoundInOption(value) {
    roundOption.value = value + 1;
  },
  renderCurrentLevelInOption(value) {
    const levelOptionList = document.querySelector('.dropdown-content');
    console.log(levelOptionList);
    levelOptionList.children.forEach((child) => child.classList.remove('selected'));
    levelOptionList.children[value + 1].classList.add('selected');
  },
};

export default helper;
