import { fullStatPage } from './constants';
import { getStatistics } from './statisticsService';

// GLOBAL STATISTICS

const createRow = (roundStat) => {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  const td4 = document.createElement('td');

  td1.insertAdjacentText('afterbegin', roundStat.round);  
  td2.insertAdjacentText('afterbegin', roundStat.date);  
  td3.insertAdjacentText('afterbegin', roundStat.knownWords.length); 
  td4.insertAdjacentText('afterbegin', roundStat.mistakeWords.length);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  return tr;
};



const fillStatistics = async () => {
  const tableBody = fullStatPage.querySelector('tbody');
  const longTermStatistics = await getStatistics();
  longTermStatistics.forEach((roundStat) => {
    tableBody.appendChild(createRow(roundStat));
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
  const td2 = document.createElement('td');

  td1.className = 'col s1';
  td2.className = 'col s11';

  td1.insertAdjacentHTML('afterbegin', `<i class="material-icons sound-icon" data-audio-src="https://raw.githubusercontent.com/jules0802/rslang-data/master/${word.audioExample}">volume_up</i>`);
  td2.insertAdjacentText('afterbegin', word.textExample);

  tr.appendChild(td1);
  tr.appendChild(td2);

  return tr;
};

const setRoundStatistics = (gameState) => {
  const dontKnowTable = document.querySelector('.dontknow-table tbody');
  const knowTable = document.querySelector('.know-table tbody');

  document.querySelector('.round-statistics-dontknow-number').innerText = gameState.dontknow.length;
  document.querySelector('.round-statistics-know-number').innerText = gameState.know.length;
  
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
