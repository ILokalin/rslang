import {dataController} from '../constants';
import {openModal} from '../modal';

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
  const res = wordsArr.filter((el) => el.wordsPerExampleSentence <= 10);
  console.log('wordsArr', wordsArr);
  console.log('res', res);
  if (res.length < 10) {
    openModal('Для игры со словами пользователя недостаточно слов. Выберите уровень и раунд или нажмите Оk для игры со всеми словами. Так же вы можете вернуться на главную страницу и потренироваться, чтобы пополнить свой словарь.')
  } 
  else {
    return res;
  }
}


const getSymbolsCount = (sentence) => sentence.split(' ').join('').length;

export { getWordsCount, getWordsForRound, getSymbolsCount, getUserWordsForGame };
