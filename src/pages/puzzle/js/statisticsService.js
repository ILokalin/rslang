import { store } from './storage';
import { dataController } from './constants';

const saveGlobalStatistics = (gameState) => {
  if (store.passedRounds.includes(`${store.level}.${store.round}`)) {
    const index = store.passedRounds.indexOf(`${store.level}.${store.round}`);
    store.iKnowPerRound[index] = gameState.know.length;
    store.dates[index] = new Date().toDateString();
  } else {
    store.passedRounds.push(`${store.level}.${store.round}`);
    store.iKnowPerRound.push(gameState.know.length);
    store.dates.push(new Date().toDateString());
  }
 // to save to stats store.stringifyStatistics()
};

export {
  saveGlobalStatistics,
};
