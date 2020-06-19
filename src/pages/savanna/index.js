import './index.scss';
import Helper from './js/helper/helper';

const cards = Helper.getRandomRoundCards(1, 1);
console.log(cards);
const wordsToGuess = Helper.getWordsToGuess(cards);

console.log(wordsToGuess);





require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);