import book1 from '../data/books/book1';
import book2 from '../data/books/book2';
import book3 from '../data/books/book3';
import book4 from '../data/books/book4';
import book5 from '../data/books/book5';
import book6 from '../data/books/book6';

const getWordsCount = (sentence) => sentence.split(' ').length;

const getWordsForRound = (level, round) => {
  const booksArr = [book1, book2, book3, book4, book5, book6];
  const [start, end] = [((round - 1) * 10), (((round - 1) * 10) + 10)];
  const wordsArr = booksArr[level - 1]
    .filter((el) => getWordsCount(el.textExample) <= 10).slice(start, end);
  return wordsArr;
};

const getSymbolsCount = (sentence) => sentence.split(' ').join('').length;

export { getWordsCount, getWordsForRound, getSymbolsCount };
