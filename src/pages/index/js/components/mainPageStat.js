export const renderShortTermStat = (settings) => {  
  const shortTermStat = JSON.parse(localStorage.getItem('stat'));
  console.log(shortTermStat);
  if (shortTermStat) {
    document.querySelector('.statistics__new-words-num').innerText = shortTermStat.newWords;
    document.querySelector('.statistics__repeated-words').innerText = shortTermStat.totalCards - shortTermStat.newWords;
    document.querySelector('.statistics__total-cards').innerText = shortTermStat.totalCards;
    document.querySelector('.statistics__correct-in-row').innerText = shortTermStat.longestChain;
    document.querySelector('.sc-max').innerText = settings.cardsPerDay;
    document.querySelector('.sc-value').innerText = shortTermStat.totalCards;
    const angle =  Math.round((180 * (shortTermStat.totalCards || 0) / settings.cardsPerDay * 100) / 100) ;
    document.querySelector('.sc-percentage').setAttribute('style', `transform: rotate(${angle}deg);`);
  }
  if (settings) {
    document.querySelector('.plan__new').innerText = settings.newCardsPerDay;
    document.querySelector('.plan_repeat').innerText = settings.cardsPerDay - settings.newCardsPerDay;
    document.querySelector('.plan__total').innerText = settings.cardsPerDay;
  }  
}