import { store } from './storage';

const saveStatisticsToStore = (statistics) => {
  store.setHints({
    isTranslationOn: +statistics.optional.isTranslationOn,
    isPronounceOn: +statistics.optional.isPronounceOn,
    isPictureOn: +statistics.optional.isPictureOn,
  });
  store.setIsAutoPronounceOn(+statistics.optional.isAutoPronounceOn);
  store.setLevel(statistics.optional.level);
  store.setRound(statistics.optional.round);
  store.setPassedRounds((statistics.optional.passedRounds !== '0' && statistics.optional.passedRounds)
    ? statistics.optional.passedRounds.split(';') : []);
  store.setIKnowPerRound((statistics.optional.iKnowPerRound !== '0' && statistics.optional.iKnowPerRound)
    ? statistics.optional.iKnowPerRound.split(';') : []);
  store.setDates((statistics.optional.dates !== '0' && statistics.optional.dates)
    ? statistics.optional.dates.split(';') : []);
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
};


export {
  saveStatisticsToStore, saveGlobalStatistics,
};
