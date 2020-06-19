import book1 from '../data/book1';
import book2 from '../data/book2';
import book3 from '../data/book3';
import book4 from '../data/book4';
import book5 from '../data/book5';
import book6 from '../data/book6';


// eslint-disable-next-line no-unused-vars
function makeRandomArr(a, b) {
    return Math.random() - 0.5;
}


const Helper = {


    getRandomRoundCards: (level, round) => {
        const dataSet = [book1, book2, book3, book4, book5, book6];
        const result = dataSet[level - 1].filter(el => el.id > (round - 1) * 100 && el.id <= (round - 1) * 100 + 100);
        return result.sort(makeRandomArr);
    },


    getWordsToGuess: (roundCards) => {
        let WordsToGuess = [];
        let transtlateToWord = [];
        roundCards.forEach(element => {
            const { word, wordTranslate } = element;
            WordsToGuess.push(word);
            transtlateToWord.push(wordTranslate);
        });
        WordsToGuess = WordsToGuess.slice(0,10);
        const wrongTranslate = transtlateToWord.slice(10);
        transtlateToWord = transtlateToWord.slice(0,10);

        return { WordsToGuess , transtlateToWord, wrongTranslate};
    }
}

export default Helper;
