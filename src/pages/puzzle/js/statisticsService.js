import { store } from './storage';
import { dataController } from './constants';

const saveGlobalStatistics = async (gameState) => {
  const knownWords = [];
  const mistakeWords = [];

  gameState.know.forEach((word) => {
    knownWords.push(word.textExample);    
  });
  gameState.dontknow.forEach((word) => {
    mistakeWords.push(word.textExample);    
  });

  const saveOptions = {
    puzzle: {
      result: gameState.know.length*10,
      round: `Round ${store.level}.${store.round}.`,
      knownWords, 
      mistakeWords,     
    }
  }
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
