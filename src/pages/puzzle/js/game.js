/* eslint-disable no-param-reassign */
import { store } from './storage';
// eslint-disable-next-line import/no-cycle
import { checkCheckboxes } from './helpers';
import {
  isPaintingOpen, hidePaintingInfo, showPaintingInfo, setPaintingInfo,
  hideBackgroundPic, showBackgroundPic, connectPuzzles, getLengthOfAllPieces,
  shuffleArray, getSymbolsCount, getGameRowWidth, getGameRowHeight, getRoundPainting,
  setRoundPainting, setGameRound, getWordsForRound, roundStatisticAudioHandler, autopronounce,
  connectSentenceWithHints, showTranslation, hideTranslation, getSizeOfPiece,
  setRound, getUserWordsForGame } from './gameService/gameService';
import {
  inputField, dontKnowBtn, checkBtn, continueBtn, resultsBtn, painting, audio, translation,
  translateBtn, pronounceBtn, pictureBtn, roundStatisticsPage, gamePage, fullStatPage, statBtn,
  puzzleGrooveWidth, dataController,
} from './constants';
import {
  drawPuzzlePiece, drawFirstPuzzlePiece, drawLastPuzzlePiece, drawCorrect,
  drawWrong, drawWhiteBorder, setBackgroundToPuzzlePiece,
} from './canvas';

import {
  saveGlobalStatistics,  
} from './statisticsService';

import {
  fillStatistics, clearStatistics, setRoundStatistics, clearRoundStatistics,
} from './statRenderingService';

let gameState = null;

const renderPuzzlesInInputField = (sentence) => {
  document.querySelector('.game-input .game-row').innerHTML = '';
  const regexp = /(<(\/?[^>]+)>)/g;
  sentence = sentence.replace(regexp, '');
  const symbolsCount = getSymbolsCount(sentence);  
  const arr = sentence.split(' ');
  const gameRowWidth = getGameRowWidth();
  const estimatedLength = getLengthOfAllPieces(arr) - puzzleGrooveWidth * (arr.length - 1);
  const estimatedHeight = getGameRowHeight();
  const currentRow = gameState.currentSentence + 1;
  const gameResults = document.querySelector(`.game-result .game-row:nth-child(${currentRow})`);
  gameResults.setAttribute('style', `height: ${estimatedHeight}px;`);

  gameResults.classList.add('droppable');

  let sx = 0;
  const sy = gameState.currentSentence * estimatedHeight;
  const canvases = [];

  arr.forEach((element, index) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'word';
    const lettersInWord = getSymbolsCount(element);
    const toAddtoEachPiece = ((gameRowWidth - estimatedLength) / symbolsCount) * lettersInWord;
    const estimatedSize = getSizeOfPiece(canvas, element);
    canvas.setAttribute('width', estimatedSize + toAddtoEachPiece);
    canvas.setAttribute('height', estimatedHeight);
    canvas.dataset.targetOrder = index;
    canvas.dataset.sx = sx;
    canvas.dataset.sy = sy;
    canvas.dataset.word = element;
    if (index === 0) {
      drawFirstPuzzlePiece(canvas, estimatedSize + toAddtoEachPiece - puzzleGrooveWidth);
    } else if (index === arr.length - 1) {
      drawLastPuzzlePiece(canvas, estimatedSize + toAddtoEachPiece - 1);
    } else {
      drawPuzzlePiece(canvas, estimatedSize + toAddtoEachPiece - puzzleGrooveWidth);
    }
    setBackgroundToPuzzlePiece(canvas, sx, sy, element, +pictureBtn.dataset.pictureOn);
    sx += estimatedSize + toAddtoEachPiece - puzzleGrooveWidth;
    canvases.push(canvas);
  });

  shuffleArray(canvases);
  canvases.forEach((canvas) => { document.querySelector('.game-input .game-row').appendChild(canvas); });
  connectPuzzles(inputField.querySelector('.game-row'));
};


function dragHandler(mousedownEvent) {
  const currentRow = gameState.currentSentence + 1;
  const gameResults = document.querySelector(`.game-result .game-row:nth-child(${currentRow})`);
  const shiftX = mousedownEvent.clientX - this.getBoundingClientRect().left;
  const shiftY = mousedownEvent.clientY - this.getBoundingClientRect().top;

  const onMouseMoveHandler = (mousemoveEvent) => {
    this.style.position = 'absolute';
    this.style.cursor = 'move';
    this.style.zIndex = 1000;
    document.body.append(this);
    this.style.left = `${mousemoveEvent.pageX - shiftX}px`;
    this.style.top = `${mousemoveEvent.pageY - shiftY}px`;
  };

  document.addEventListener('mousemove', onMouseMoveHandler);

  this.addEventListener('mouseup', (mouseupEvent) => {
    this.style.cursor = 'pointer';
    this.style.zIndex = 'auto';
    ;
    const target = gameResults.getBoundingClientRect();
    const current = inputField.querySelector('.game-row').getBoundingClientRect();
    const coordX = mouseupEvent.clientX;
    const coordY = mouseupEvent.clientY;
    this.style.position = 'relative';
    this.style.top = 'auto';
    this.style.left = 'auto';
    if (coordX >= target.left && coordX <= target.right
      && coordY >= target.top && coordY <= target.bottom) {
      if (!gameResults.children.length) {
        gameResults.appendChild(this);
      } else {
        // check if draggable on child
        const childrenAtLeftSide = Array.from(gameResults.children)
          .filter((child) => child.getBoundingClientRect().x < coordX);
        if (childrenAtLeftSide.length !== 0) {
          childrenAtLeftSide[childrenAtLeftSide.length - 1].insertAdjacentElement('afterend', this);
        } else {
          gameResults.insertAdjacentElement('afterbegin', this);
          this.dataset.currentOrder = 0;
        }
      }
      // check if draggable inside input field
    } else if (coordX >= current.left && coordX <= current.right
      && coordY >= current.top && coordY <= current.bottom) {
          gameResults.appendChild(this);                
      } else {
      inputField.querySelector('.game-row').appendChild(this);
    }
    connectPuzzles(gameResults);
    connectPuzzles(inputField.querySelector('.game-row'));
    // check if words left
    if (inputField.querySelector('.game-row').children.length === 0) {
      gameResults.setAttribute('style', `${gameResults.getAttribute('style')}justify-content: end;`);
      checkBtn.classList.remove('hidden');
      dontKnowBtn.classList.add('hidden');
      gameResults.classList.remove('droppable');
    }
    this.removeAttribute('data-is-moved');
    document.removeEventListener('mousemove', onMouseMoveHandler);
  });
}

const playNextSentence = async () => {
  checkCheckboxes();
  console.log(gameState.words);
  const word = gameState.words[gameState.currentSentence];
  const sentence = word.textExample;
  renderPuzzlesInInputField(sentence);
  connectSentenceWithHints(word);
  if (store.hints.isTranslationOn) {
    showTranslation();
  } else {
    hideTranslation();
  }
  autopronounce();
  inputField.querySelectorAll('.word').forEach((el) => {
    el.addEventListener('mousedown', dragHandler);
  });
};

// Hints buttons

translateBtn.addEventListener('click', () => {
  if (translation.classList.contains('hidden')) {
    showTranslation();
  } else {
    hideTranslation();
  }
});

pronounceBtn.addEventListener('click', () => {
  audio.play();
});

pictureBtn.addEventListener('click', () => {
  if (+pictureBtn.dataset.pictureOn === 1) {
    pictureBtn.dataset.pictureOn = 0;
  } else {
    pictureBtn.dataset.pictureOn = 1;
  }
  inputField.querySelector('.game-row').children.forEach((canvas) => {
    setBackgroundToPuzzlePiece(canvas, canvas.dataset.sx,
      canvas.dataset.sy, canvas.dataset.word, +pictureBtn.dataset.pictureOn);
  });
});

// Round begin


const startRound = async () => {
  document.querySelectorAll('.game-row').forEach((el) => {
    el.innerHTML = '';
    el.classList.remove('droppable');
    el.classList.remove('hidden');
  });
  clearRoundStatistics();
  gameState = {
    words: store.playUserWords ? await getUserWordsForGame() : await getWordsForRound(store.level, store.round),
    currentSentence: 0,
    know: [],
    dontknow: [],
  };
  
  setGameRound(); 

  setRoundPainting();
  setPaintingInfo();
  
  painting.onload = async () => {
    document.querySelector('.game-result').setAttribute('style', `height: ${painting.clientHeight}px`);
   await playNextSentence();
  };
  pictureBtn.dataset.pictureOn = store.hints.isPictureOn;
  hideTranslation();
  checkBtn.classList.add('hidden');
  continueBtn.classList.add('hidden');
  dontKnowBtn.classList.remove('hidden');
  resultsBtn.classList.add('hidden');
};

const goToNextRound = () => {
  hideBackgroundPic();
  hidePaintingInfo();
  roundStatisticsPage.classList.add('hidden');
  fullStatPage.classList.add('hidden');
  gamePage.classList.remove('hidden');
  if (!store.playUserWords) {
    setRound();
  }  
// TODO send to settings round and level;
console.log(store.stringifySettings());
  dataController.setUserOptions({puzzle: store.stringifySettings()}).then(async () => { 
    await startRound();
  });  
};

// Footer buttons

const dontKnowHandler = () => {
  const currentRow = gameState.currentSentence + 1;
  const word = gameState.words[gameState.currentSentence];
  const array = Array.from(inputField.querySelector('.game-row').children);
  const gameResults = document.querySelector(`.game-result .game-row:nth-child(${currentRow})`);

  gameResults.children.forEach((child) => { array.push(child); });
  array.sort((a, b) => a.dataset.targetOrder - b.dataset.targetOrder);
  array.forEach((el) => {
    el.removeEventListener('mousedown', dragHandler);
    setBackgroundToPuzzlePiece(el, el.dataset.sx, el.dataset.sy, el.dataset.word, 1);
    drawWhiteBorder(el);
    audio.play();
    showTranslation();
    gameResults.appendChild(el);
  });
  connectPuzzles(gameResults);
  gameResults.setAttribute('style', `${gameResults.getAttribute('style')}justify-content: end;`);
  gameState.dontknow.push(word);
};

dontKnowBtn.addEventListener('click', () => {
  dontKnowHandler();
  dontKnowBtn.classList.add('hidden');
  continueBtn.classList.remove('hidden');
});

continueBtn.addEventListener('click', async () => {
  const currentRow = gameState.currentSentence + 1;
  const gameResults = document.querySelector(`.game-result .game-row:nth-child(${currentRow})`);
  gameResults.children.forEach((word) => { drawWhiteBorder(word); });
  if (gameState.currentSentence < 9) {
    gameState.currentSentence += 1;
    await playNextSentence();
    continueBtn.classList.add('hidden');
    dontKnowBtn.classList.remove('hidden');
  } else {
    await saveGlobalStatistics(gameState);
    if (isPaintingOpen()) {
      goToNextRound();
    } else {
      showBackgroundPic();
      showPaintingInfo();
      resultsBtn.classList.remove('hidden');
      setRoundStatistics(gameState);
    }
  }
});

checkBtn.addEventListener('click', () => {
  const currentRow = gameState.currentSentence + 1;
  const gameResults = document.querySelector(`.game-result .game-row:nth-child(${currentRow})`);

  let wrong = 0;
  gameResults.children.forEach((word, index) => {
    if (+word.dataset.targetOrder === index) {
      drawCorrect(word);
    } else {
      wrong += 1;
      drawWrong(word);
    }
  });
  if (wrong) {
    dontKnowBtn.classList.remove('hidden');
  } else {
    gameResults.children.forEach((el) => {
      el.removeEventListener('mousedown', dragHandler);
      setBackgroundToPuzzlePiece(el, el.dataset.sx, el.dataset.sy, el.dataset.word, 1);
    });
    showTranslation();
    audio.play();
    const word = gameState.words[gameState.currentSentence];
    gameState.know.push(word);
    continueBtn.classList.remove('hidden');
  }
  checkBtn.classList.add('hidden');
});

resultsBtn.addEventListener('click', () => {
  roundStatisticsPage.classList.remove('hidden');
  gamePage.classList.add('hidden');
  roundStatisticsPage.addEventListener('click', roundStatisticAudioHandler);
});


document.querySelector('.round-statistic-continue-btn').addEventListener('click', () => {
  goToNextRound();
});

document.querySelector('.full-statistic-continue-btn').addEventListener('click', () => {
  goToNextRound();
});

statBtn.addEventListener('click', async () => {
  fullStatPage.classList.remove('hidden');
  roundStatisticsPage.classList.add('hidden');
  clearStatistics();
  await fillStatistics();
});


export { startRound, setRound };
