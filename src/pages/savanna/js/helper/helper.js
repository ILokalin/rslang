import book1 from '../data/book1';
import book2 from '../data/book2';
import book3 from '../data/book3';
import book4 from '../data/book4';
import book5 from '../data/book5';
import book6 from '../data/book6';
// eslint-disable-next-line no-unused-vars
import { GUESSWORD, ANSWERCONTAINER, GAMEDATA, STAT, HEADER, GAMECONTAINER, INFO, GUESSCONTAINER } from './constants';


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

    renderRoundGame: (dataSet) => {
        const answers = []
        console.log('ДОБАВАИЛИ КАРТОЧКИ', dataSet[0]);
        const сardToGuess = dataSet[0].pop();
        console.log('ТЕКУЩЕЕ УГАДЫВАЕМОЕ СЛОВО', сardToGuess);
        GAMEDATA.wordContainer = сardToGuess;
        const wordToGuess = сardToGuess.wordTranslate;
        for (let i = 0; i < 3; i += 1) {
            answers.push(dataSet[0].pop().wordTranslate)
        }

        answers.push(wordToGuess);
        answers.sort(makeRandomArr);
        GUESSWORD.innerHTML = сardToGuess.word;
        ANSWERCONTAINER.innerHTML = '';
        answers.forEach(word => {
            const p = document.createElement('p');
            p.classList.add('main-savanna__answer-word');
            p.innerText = word;
            ANSWERCONTAINER.appendChild(p);
        })
    },
    renderStat: () => {
        HEADER.classList.add('hidden');
        GAMECONTAINER.classList.add('hidden');
        INFO.classList.remove('hidden');
        STAT.innerHTML = `<p class="result-text">Выучено слов: ${GAMEDATA.knowWords.length}</p>
                        <p class="result-text">На повторение: ${GAMEDATA.errorWords.length}</p>`;
    },
    moveGuessContainer: (px) => {
        GUESSCONTAINER.style.top = `${px}`;
    }

}

export default Helper;
