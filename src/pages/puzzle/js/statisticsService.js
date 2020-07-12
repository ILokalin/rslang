import { store } from './storage';
import { dataController } from './constants';

const saveGlobalStatistics = async (gameState) => {
  const saveOptions = {
    puzzle: {
      result: gameState.know.length*10,
      round: store.playUserWords ? 'Ваши слова' : `Раунд ${store.level}.${store.round}.`,
      knownWords: gameState.know.length, 
      mistakeWords: gameState.dontknow.length,
    }
  }
  await dataController.setUserStatistics(saveOptions);  
};

const getStatistics = async () => {
  const response = await dataController.getUserStatistics();
  return response.puzzle.longTime;
}

export {
  saveGlobalStatistics, getStatistics,
};
