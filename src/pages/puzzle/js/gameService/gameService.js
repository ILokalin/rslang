/* eslint-disable import/no-cycle */
import { puzzleGrooveWidth } from '../constants';
import {
  isPaintingOpen,
  hidePaintingInfo,
  showPaintingInfo,
  setPaintingInfo,
  hideBackgroundPic,
  showBackgroundPic,
  setRoundPainting,
  getPaintingCutSrc,
  getPaintingImageSrc,
  getRoundPainting,
} from './paintingService';
import { roundStatisticAudioHandler, autopronounce } from './audioService';
import {
  getLengthOfAllPieces,
  getSizeOfPiece,
  getGameRowWidth,
  getGameRowHeight,
} from './sizingService';
import { setGameRound, setRound } from './roundService';
import {
  setSentenceTranslation,
  showTranslation,
  hideTranslation,
  connectSentenceWithHints,
} from './translationService';
import { getWordsForRound, getSymbolsCount, getUserWordsForGame } from './textService';

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
    child.setAttribute('style', `left:-${index * puzzleGrooveWidth}px;`);
  });
};

export {
  isPaintingOpen,
  hidePaintingInfo,
  showPaintingInfo,
  setPaintingInfo,
  hideBackgroundPic,
  showBackgroundPic,
  connectPuzzles,
  getLengthOfAllPieces,
  shuffleArray,
  getSymbolsCount,
  getGameRowWidth,
  getGameRowHeight,
  setRoundPainting,
  setGameRound,
  getWordsForRound,
  roundStatisticAudioHandler,
  autopronounce,
  connectSentenceWithHints,
  setSentenceTranslation,
  showTranslation,
  hideTranslation,
  getSizeOfPiece,
  setRound,
  getRoundPainting,
  getPaintingCutSrc,
  getPaintingImageSrc,
  getUserWordsForGame,
};
