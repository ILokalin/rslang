import { fullStatPage } from './constants';
import { store } from './storage';

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
  clearStatistics, createRow, fillStatistics, clearRoundStatistics,
  setRoundStatistics, createStatisticRow,
};
