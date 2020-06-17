import { store } from './storage';
import { fullStatPage } from './constants';
import { updateUserStatistics } from './userService';

const saveStatisticsToStore = (statistics) => {
  store.hints.isTranslationOn = +statistics.optional.isTranslationOn;
  store.hints.isPronounceOn = +statistics.optional.isPronounceOn;
  store.hints.isPictureOn = +statistics.optional.isPictureOn;
  store.isAutoPronounceOn = +statistics.optional.isAutoPronounceOn;
  store.level = statistics.optional.level;
  store.round = statistics.optional.round;
  store.passedRounds = (statistics.optional.passedRounds !== '0' && statistics.optional.passedRounds) ? statistics.optional.passedRounds.split(';') : [];
  store.iKnowPerRound = (statistics.optional.iKnowPerRound !== '0' && statistics.optional.iKnowPerRound) ? statistics.optional.iKnowPerRound.split(';') : [];
  store.dates = (statistics.optional.dates !== '0' && statistics.optional.dates) ? statistics.optional.dates.split(';') : [];
  localStorage.setItem('isTranslationOn', store.hints.isTranslationOn);
  localStorage.setItem('isPronounceOn', store.hints.isPronounceOn);
  localStorage.setItem('isPictureOn', store.hints.isPictureOn);
  localStorage.setItem('isAutoPronounceOn', store.isAutoPronounceOn);
  localStorage.setItem('level', store.level);
  localStorage.setItem('round', store.round);
  localStorage.setItem('passedRounds', JSON.stringify(store.passedRounds));
  localStorage.setItem('iKnowPerRound', JSON.stringify(store.iKnowPerRound));
  localStorage.setItem('dates', JSON.stringify(store.dates));
};

const sendStatisticsToBackEnd = async () => {
  const requestBody = {
    learnedWords: 0,
    optional: {
      isAutoPronounceOn: String(store.isAutoPronounceOn),
      isTranslationOn: String(store.hints.isTranslationOn),
      isPronounceOn: String(store.hints.isPronounceOn),
      isPictureOn: String(store.hints.isPictureOn),
      level: String(store.level),
      round: String(store.round),
      passedRounds: store.passedRounds.length !== 0 ? store.passedRounds.join(';') : '0',
      iKnowPerRound: store.iKnowPerRound.length !== 0 ? store.iKnowPerRound.join(';') : '0',
      dates: store.dates.length !== 0 ? store.dates.join(';') : '0',
    },
  };
  await updateUserStatistics(store.user.id, store.user.token, requestBody);
};

const sendInitialStatisticsToBackEnd = async () => {
  const requestBody = {
    learnedWords: 0,
    optional: {
      isAutoPronounceOn: '1',
      isTranslationOn: '1',
      isPronounceOn: '1',
      isPictureOn: '0',
      level: '1',
      round: '1',
      passedRounds: '0',
      iKnowPerRound: '0',
      dates: '0',
    },
  };
  await updateUserStatistics(store.user.id, store.user.token, requestBody);
};

// GLOBAL STATISTICS
const createRow = (round, index) => {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.insertAdjacentText('afterbegin', round);
  const td2 = document.createElement('td');
  td2.insertAdjacentText('afterbegin', store.dates[index]);
  const td3 = document.createElement('td');
  td3.insertAdjacentText('afterbegin', store.iKnowPerRound[index]);
  const td4 = document.createElement('td');
  td4.insertAdjacentText('afterbegin', 10 - +store.iKnowPerRound[index]);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  return tr;
};

const fillStatistics = () => {
  const tableBody = fullStatPage.querySelector('tbody');
  store.passedRounds.forEach((round, index) => {
    tableBody.appendChild(createRow(round, index));
  });
};

const clearStatistics = () => {
  const tableBody = fullStatPage.querySelector('tbody');
  tableBody.innerHTML = '';
};

const getDateString = () => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Date().toLocaleString('en-US', options);
};

const saveGlobalStatistics = (gameState) => {
  if (store.passedRounds.includes(`${store.level}.${store.round}`)) {
    const index = store.passedRounds.indexOf(`${store.level}.${store.round}`);
    store.iKnowPerRound[index] = gameState.know.length;
    store.dates[index] = getDateString();
  } else {
    store.passedRounds.push(`${store.level}.${store.round}`);
    store.iKnowPerRound.push(gameState.know.length);
    store.dates.push(getDateString());
  }
  localStorage.setItem('passedRounds', JSON.stringify(store.passedRounds));
  localStorage.setItem('iKnowPerRound', JSON.stringify(store.iKnowPerRound));
  localStorage.setItem('dates', JSON.stringify(store.dates));
  sendStatisticsToBackEnd();
};

// ROUND STATISTICS
const createStatisticRow = (word) => {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.className = 'col s1';
  td1.insertAdjacentHTML('afterbegin', `<i class="material-icons sound-icon" data-audio-src="https://raw.githubusercontent.com/jules0802/rslang-data/master/${word.audioExample}">volume_up</i>`);
  const td2 = document.createElement('td');
  td2.className = 'col s11';
  td2.insertAdjacentText('afterbegin', word.textExample);
  tr.appendChild(td1);
  tr.appendChild(td2);
  return tr;
};

const setRoundStatistics = (gameState) => {
  document.querySelector('.round-statistics-dontknow-number').innerText = gameState.dontknow.length;
  document.querySelector('.round-statistics-know-number').innerText = gameState.know.length;
  const dontKnowTable = document.querySelector('.dontknow-table tbody');
  const knowTable = document.querySelector('.know-table tbody');
  gameState.dontknow.forEach((word) => {
    dontKnowTable.appendChild(createStatisticRow(word));
  });
  gameState.know.forEach((word) => {
    knowTable.appendChild(createStatisticRow(word));
  });
};

const clearRoundStatistics = () => {
  document.querySelector('.dontknow-table tbody').innerHTML = '';
  document.querySelector('.know-table tbody').innerHTML = '';
};


export {
  fillStatistics, clearStatistics, saveStatisticsToStore, sendStatisticsToBackEnd,
  sendInitialStatisticsToBackEnd, saveGlobalStatistics,
  setRoundStatistics, clearRoundStatistics,
};
