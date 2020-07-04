import { store } from './storage';
import { dataController } from './constants';

const saveGlobalStatistics = async (gameState) => {
  const saveOptions = {
    puzzle: {
      result: gameState.know.length*10,
      round: store.playUserWords ? 'Your words' : `Round ${store.level}.${store.round}.`,
      knownWords: gameState.know.length, 
      mistakeWords: gameState.dontknow.length,
    }
  }
  console.log(saveOptions);
  await dataController.setUserStatistics(saveOptions);  
};

const getStatistics = async () => {
  const response = await dataController.getUserStatistics();
  console.log(response);
  return response.puzzle.longTime;
}

export {
  saveGlobalStatistics, getStatistics,
};
