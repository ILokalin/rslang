import { ElementGen } from 'Src/service/DomGen/DomGen';

const renderAudioChallengeStats = (fullStatObj) => {
  const tBody = document.querySelector('#stat-audiochallenge tbody');
  const stats = fullStatObj.audition.longTime;
  stats.forEach((roundStat) => {
    const tr = ElementGen('tr', '', tBody);
    const td1 = ElementGen('td', '', tr);
    const td2 = ElementGen('td', '', tr);

    td1.insertAdjacentText('afterbegin', roundStat.date);
    td2.insertAdjacentText('afterbegin', roundStat.result);
  });
};

const renderPuzzleStats = (fullStatObj) => {
  const tBody = document.querySelector('#stat-puzzle tbody');
  const stats = fullStatObj.puzzle.longTime;
  stats.forEach((roundStat) => {
    const tr = ElementGen('tr', '', tBody);
    const td1 = ElementGen('td', '', tr);
    const td2 = ElementGen('td', '', tr);
    const td3 = ElementGen('td', '', tr);
    const td4 = ElementGen('td', '', tr);
    const td5 = ElementGen('td', '', tr);

    td1.insertAdjacentText('afterbegin', roundStat.round);
    td2.insertAdjacentText('afterbegin', roundStat.date);
    td3.insertAdjacentText('afterbegin', roundStat.result);
    td4.insertAdjacentText('afterbegin', roundStat.knownWords);
    td5.insertAdjacentText('afterbegin', roundStat.mistakeWords);
  });
};

const renderSavannaStats = (fullStatObj) => {
  const tBody = document.querySelector('#stat-savanna tbody');
  const stats = fullStatObj.savanna.longTime;
  stats.forEach((roundStat) => {
    const tr = ElementGen('tr', '', tBody);
    const td1 = ElementGen('td', '', tr);
    const td2 = ElementGen('td', '', tr);
    const td3 = ElementGen('td', '', tr);
    const td4 = ElementGen('td', '', tr);

    td1.insertAdjacentText('afterbegin', roundStat.date);
    td2.insertAdjacentText('afterbegin', roundStat.result);
    td3.insertAdjacentText('afterbegin', roundStat.knownWords);
    td4.insertAdjacentText('afterbegin', roundStat.mistakeWords);
  });
};

const renderSprintStats = (fullStatObj) => {
  const tBody = document.querySelector('#stat-sprint tbody');
  const stats = fullStatObj.sprint.longTime;
  stats.forEach((roundStat) => {
    const tr = ElementGen('tr', '', tBody);
    const td1 = ElementGen('td', '', tr);
    const td2 = ElementGen('td', '', tr);
    const td3 = ElementGen('td', '', tr);
    const td4 = ElementGen('td', '', tr);

    td1.insertAdjacentText('afterbegin', roundStat.date);
    td2.insertAdjacentText('afterbegin', roundStat.result);
    td3.insertAdjacentText('afterbegin', roundStat.knownWords);
    td4.insertAdjacentText('afterbegin', roundStat.mistakeWords);
  });
};

const renderSpeakItStats = (fullStatObj) => {
  const tBody = document.querySelector('#stat-speakit tbody');
  const stats = fullStatObj['speak-it'].longTime;
  stats.forEach((roundStat) => {
    const tr = ElementGen('tr', '', tBody);
    const td1 = ElementGen('td', '', tr);
    const td2 = ElementGen('td', '', tr);
    const td3 = ElementGen('td', '', tr);
    const td4 = ElementGen('td', '', tr);
    const td5 = ElementGen('td', '', tr);

    td1.insertAdjacentText('afterbegin', roundStat.round);
    td2.insertAdjacentText('afterbegin', roundStat.date);
    td3.insertAdjacentText('afterbegin', roundStat.result);
    td4.insertAdjacentText('afterbegin', roundStat.knownWords);
    td5.insertAdjacentText('afterbegin', roundStat.mistakeWords);
  });
};

const renderMatchItStats = (fullStatObj) => {
  const tBody = document.querySelector('#stat-matchit tbody');
  const stats = fullStatObj['match-it'].longTime;
  stats.forEach((roundStat) => {
    const tr = ElementGen('tr', '', tBody);
    const td1 = ElementGen('td', '', tr);
    const td2 = ElementGen('td', '', tr);
    const td3 = ElementGen('td', '', tr);
    const td4 = ElementGen('td', '', tr);
    const td5 = ElementGen('td', '', tr);

    td1.insertAdjacentText('afterbegin', roundStat.round);
    td2.insertAdjacentText('afterbegin', roundStat.date);
    td3.insertAdjacentText('afterbegin', roundStat.result);
    td4.insertAdjacentText('afterbegin', roundStat.knownWords);
    td5.insertAdjacentText('afterbegin', roundStat.mistakeWords);
  });
};

export const renderTable = (fullStatObj) => {
  renderAudioChallengeStats(fullStatObj);
  renderPuzzleStats(fullStatObj);
  renderSavannaStats(fullStatObj);
  renderMatchItStats(fullStatObj);
  renderSprintStats(fullStatObj);
  renderSpeakItStats(fullStatObj);
};
