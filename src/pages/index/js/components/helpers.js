const cleanVocabulary = () => {
  document.querySelector('#vocabulary__on-learn').innerHTML = '';
  document.querySelector('#vocabulary__difficult').innerHTML = '';
  document.querySelector('#vocabulary__deleted').innerHTML = '';
}

const cleanStatisticsChart = () => {
  document.querySelector('.chart-container').innerHTML = '<canvas id="chart"></canvas><div id="chartjs-tooltip"><div id="chartjs-tooltip__text"></div></div>';
}

export const cleanStatisticsTable = () => {  
  const arr = [
    document.getElementById('stat-audiochallenge'),
    document.getElementById('stat-puzzle'),
    document.getElementById('stat-savanna'),
    document.getElementById('stat-speakit'),
    document.getElementById('stat-sprint'),
    document.getElementById('stat-matchit'),
  ]
  arr.forEach((element) => {
    element.querySelector('tbody').innerHTML = '';    
  });
}

export const cleanPage = () => {
  cleanVocabulary();
  cleanStatisticsChart();
  cleanStatisticsTable();
}