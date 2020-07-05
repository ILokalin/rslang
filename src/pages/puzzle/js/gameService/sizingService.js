import {
  painting, puzzleGrooveWidth,
} from '../constants';

const getGameRowWidth = () => document.querySelector('.game-row').offsetWidth;
const getGameRowHeight = () => painting.getBoundingClientRect().height * 0.1;

const getSizeOfPiece = (canvas, word) => {
  const gameResult = document.querySelector('.game-result');
  const ctx = canvas.getContext('2d');
  if (gameResult.offsetWidth < 500) {
    ctx.font = '0.7rem Montserrat';
  } else {
    ctx.font = '1rem Montserrat';
  }
  return ctx.measureText(word).width + puzzleGrooveWidth * 2;
};

const getLengthOfAllPieces = (arr) => arr.reduce((sum, element) => {
  const canvas = document.createElement('canvas');
  const estimatedSize = getSizeOfPiece(canvas, element);
  return sum + estimatedSize;
}, 0);

export {
  getLengthOfAllPieces, getSizeOfPiece, getGameRowWidth, getGameRowHeight,
};
