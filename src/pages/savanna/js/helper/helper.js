import book1 from '../data/book1';
import book2 from '../data/book2';
import book3 from '../data/book3';
import book4 from '../data/book4';
import book5 from '../data/book5';
import book6 from '../data/book6';
import {
  guessWord,
  answerContsainer,
  header,
  gameContainer,
  resultContainer,
  stat,
  gameData,
  audio,
} from './constants';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3|wav)$/);

// eslint-disable-next-line no-unused-vars
function makeRandomArr(a, b) {
  return Math.random() - 0.5;
}

const Helper = {
  getRandomRoundCards: (level, round) => {
    const dataSet = [book1, book2, book3, book4, book5, book6];
    const result = dataSet[level - 1].slice((round - 1) * 100, (round - 1) * 100 + 99);
    return result.sort(makeRandomArr);
  },

  renderRoundGame: (dataSet) => {
    const answers = [];
    const сardToGuess = dataSet.pop();
    gameData.wordContainer = сardToGuess;
    const wordToGuess = сardToGuess.wordTranslate;
    for (let i = 0; i < 3; i += 1) {
      answers.push(dataSet.pop().wordTranslate);
    }

    answers.push(wordToGuess);
    answers.sort(makeRandomArr);
    guessWord.innerHTML = сardToGuess.word;
    answerContsainer.innerHTML = '';
    answers.forEach((word, index) => {
      const p = document.createElement('p');
      p.classList.add('game-savanna__answer-word');
      p.innerText = `${index + 1} ${word}`;
      answerContsainer.appendChild(p);
    });
  },

  renderStat: () => {
    header.classList.add('hidden');
    gameContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    stat.innerHTML = `<p class="result-text">Выучено слов: ${gameData.knowWords.length}</p>
                        <p class="result-text">На повторение: ${gameData.errorWords.length}</p>`;
  },

  playSuccess: () => {
    audio.src = './assets/sound/success.wav';
  },
};

export default Helper;
