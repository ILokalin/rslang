import {dataController} from '../constants';

const getWordsCount = (sentence) => sentence.split(' ').length;

const getWordsForRound = async (level, round) => {
  const options = {
    group: level,
    page: round,
    wordsPerExampleSentenceLTE: 10,
    wordsPerPage: 10,
  }
  const wordsArr = await dataController.getWords(options);  
  return wordsArr;
}

const getSymbolsCount = (sentence) => sentence.split(' ').join('').length;

export { getWordsCount, getWordsForRound, getSymbolsCount };
