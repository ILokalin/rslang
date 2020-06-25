import book1 from '../data/book1';
import book2 from '../data/book2';
import book3 from '../data/book3';
import book4 from '../data/book4';
import book5 from '../data/book5';
import book6 from '../data/book6';

import {} from './constants';

const helper = {
  getRandomRoundCards(level, round) {
    const dataSet = [book1, book2, book3, book4, book5, book6];
    const result = dataSet[level - 1].slice((round - 1) * 100, (round - 1) * 100 + 99);
    return result.sort(() => Math.random() - 0.5);
  },
};

export default helper;
