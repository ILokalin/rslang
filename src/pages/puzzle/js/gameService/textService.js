import {dataController} from '../constants';
import { openModal } from '../modal';
import { shuffle } from '../helpers';
import { store } from '../storage';

const getWordsCount = (sentence) => sentence.split(' ').length;

const getWordsForRound = async (level, round) => {
  const options = {
    group: level-1,
    page: round-1,
    wordsPerExampleSentenceLTE: 10,
    wordsPerPage: 10,
  }
  const wordsArr = await dataController.getWords(options); 
  return wordsArr;
}

const getUserWordsForGame = async () => {
  const wordsArr = await dataController.userWordsGetAll(['onlearn', 'hard', 'deleted']);  
  let res = wordsArr['0'].paginatedResults.filter((el) => el.wordsPerExampleSentence <= 10);
  if (res.length < 10) {
    openModal('Для игры со словами пользователя недостаточно слов. Выберите уровень и раунд в меню для игры со всеми словами. Так же вы можете вернуться на главную страницу и потренироваться, чтобы пополнить свой словарь.');
    store.playUserWords = 0;
  } 
  else {
    shuffle(res);
    res = res.slice(0, 10);  
    return res;
  }
}


const getSymbolsCount = (sentence) => sentence.split(' ').join('').length;

export { getWordsCount, getWordsForRound, getSymbolsCount, getUserWordsForGame };
