import book1 from './data/books/book1';
import book2 from './data/books/book2';
import book3 from './data/books/book3';
import book4 from './data/books/book4';
import book5 from './data/books/book5';
import book6 from './data/books/book6';

import paintings1 from './data/paintings/level1';
import paintings2 from './data/paintings/level2';
import paintings3 from './data/paintings/level3';
import paintings4 from './data/paintings/level4';
import paintings5 from './data/paintings/level5';
import paintings6 from './data/paintings/level6';
import { store } from './storage';
import {
  inputField, audio, translation, paintingInfo, miniature, miniatureInfo,
  linkToPainting, painting, roundsCount,
} from './constants';

// Sentence

const getWordsCount = (sentence) => sentence.split(' ').length;

const getWordsForRound = (level, round) => {
  const booksArr = [book1, book2, book3, book4, book5, book6];
  const [start, end] = [((round - 1) * 10), (((round - 1) * 10) + 10)];
  const wordsArr = booksArr[level - 1]
    .filter((el) => getWordsCount(el.textExample) <= 10).slice(start, end);
  return wordsArr;
};

const getSymbolsCount = (sentence) => sentence.split(' ').join('').length;

// Round

const getGameRound = () => `Round ${store.level}.${store.round}`;
const setGameRound = () => {
  document.querySelector('.game-header h4').innerText = getGameRound();
};
const setRound = () => {
  if (+store.round > roundsCount[store.level - 1]) {
    store.level = +store.level + 1;
    if (store.level > 6) {
      store.level = 1;
    }
    store.round = 1;
  } else {
    store.round = +store.round + 1;
  }
};

// Painting

const getLevelPaintingsCollection = () => [
  paintings1,
  paintings2,
  paintings3,
  paintings4,
  paintings5,
  paintings6,
][store.level - 1];

const getRoundPainting = () => {
  const id = `${store.level}_${String(store.round).length > 1 ? '' : '0'}${store.round}`;
  return getLevelPaintingsCollection().find((el) => el.id === id);
};

const getPaintingCutSrc = () => `https://raw.githubusercontent.com/jules0802/rslang_data_paintings/master/${getRoundPainting().cutSrc}`;
const getPaintingImageSrc = () => `https://raw.githubusercontent.com/jules0802/rslang_data_paintings/master/${getRoundPainting().imageSrc}`;

const setRoundPainting = (paintingObj) => {
  const cutSrc = getPaintingCutSrc();
  const longSrc = getPaintingImageSrc();
  painting.setAttribute('src', cutSrc);
  miniature.setAttribute('src', cutSrc);
  linkToPainting.setAttribute('href', longSrc);
};

const showBackgroundPic = () => { painting.style.zIndex = 1; };
const hideBackgroundPic = () => { painting.style.zIndex = -2000; };
const setPaintingInfo = () => {
  const paintingDetails = getRoundPainting();
  const text = `${paintingDetails.author} - ${paintingDetails.name} (${paintingDetails.year})`;
  paintingInfo.innerText = text;
  miniatureInfo.innerText = text;
};
const showPaintingInfo = () => {
  inputField.querySelector('.game-row').classList.add('hidden');
  paintingInfo.classList.remove('hidden');
};
const hidePaintingInfo = () => {
  paintingInfo.classList.add('hidden');
  inputField.querySelector('.game-row').classList.remove('hidden');
};
const isPaintingOpen = () => !paintingInfo.classList.contains('hidden');

// Sizes count

const getGameRowWidth = () => document.querySelector('.game-row').offsetWidth;
const getGameRowHeight = () => painting.getBoundingClientRect().height * 0.1;

const getSizeOfPiece = (canvas, word) => {
  const gameResult = document.querySelector('.game-result');
  const ctx = canvas.getContext('2d');
  if (gameResult.offsetWidth < 500) {
    ctx.font = '0.7rem Montserrat';
  }
  else {
    ctx.font = '1rem Montserrat';
  }  
  return ctx.measureText(word).width + 17 * 2;
};

const getLengthOfAllPieces = (arr) => arr.reduce((sum, element) => {
  const canvas = document.createElement('canvas');
  const estimatedSize = getSizeOfPiece(canvas, element);
  return sum + estimatedSize;
}, 0);


// Audio

const setAudioSrc = (word) => {
  const src = `https://raw.githubusercontent.com/jules0802/rslang-data/master/${word.audioExample}`;
  audio.setAttribute('src', src);
};

const playAudio = () => {
  audio.setAttribute('autoplay', true);
};

const autopronounce = () => {
  if (store.isAutoPronounceOn) {
    playAudio();
  }
};

const roundStatisticAudioHandler = (event) => {
  if (event.target.closest('.material-icons')) {
    audio.setAttribute('src', event.target.dataset.audioSrc);
    audio.play();
  }
};

// Translation

const setSentenceTranslation = (word) => { translation.innerText = word.textExampleTranslate; };
const showTranslation = () => { translation.classList.remove('hidden'); };
const hideTranslation = () => { translation.classList.add('hidden'); };

const connectSentenceWithHints = (word) => {
  setAudioSrc(word);
  setSentenceTranslation(word);
};


// other helpers

const shuffleArray = (array) => {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const connectPuzzles = (gameResults) => {
  gameResults.children.forEach((child, index) => {
    child.setAttribute('style', `left:-${(index * 17)}px;`);
  });
};


export {
  isPaintingOpen, hidePaintingInfo, showPaintingInfo, setPaintingInfo,
  hideBackgroundPic, showBackgroundPic, connectPuzzles, getLengthOfAllPieces,
  shuffleArray, getSymbolsCount, getGameRowWidth, getGameRowHeight, setRoundPainting,
  setGameRound, getWordsForRound, roundStatisticAudioHandler, autopronounce,
  connectSentenceWithHints, setSentenceTranslation, showTranslation, hideTranslation,
  getSizeOfPiece, setRound, getRoundPainting, getPaintingCutSrc, getPaintingImageSrc,
};
