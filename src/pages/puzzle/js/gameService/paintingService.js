import paintings1 from '../data/paintings/level1';
import paintings2 from '../data/paintings/level2';
import paintings3 from '../data/paintings/level3';
import paintings4 from '../data/paintings/level4';
import paintings5 from '../data/paintings/level5';
import paintings6 from '../data/paintings/level6';
import { store } from '../storage';
import {
  inputField, paintingInfo, miniature, miniatureInfo, linkToPainting, painting, roundsCount,
} from '../constants';
import {getRandomInteger} from '../helpers';

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

const getRandomPainting = () => {
  const collectionsArray = [
    paintings1,
    paintings2,
    paintings3,
    paintings4,
    paintings5,
    paintings6,
  ];
  const randomLevel = getRandomInteger(1, 6);
  const randomRound = getRandomInteger(1, roundsCount[randomLevel-1]);
  const id = `${randomLevel}_${String(randomRound).length > 1 ? '' : '0'}${randomRound}`;
  return collectionsArray[randomLevel-1].find((el) => el.id === id);
}

const getPaintingCutSrc = () => `https://raw.githubusercontent.com/jules0802/rslang_data_paintings/master/${getRoundPainting().cutSrc}`;
const getPaintingImageSrc = () => `https://raw.githubusercontent.com/jules0802/rslang_data_paintings/master/${getRoundPainting().imageSrc}`;

const setRoundPainting = () => {
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

export {
  isPaintingOpen, hidePaintingInfo, getLevelPaintingsCollection,
  showPaintingInfo, setPaintingInfo, hideBackgroundPic, showBackgroundPic,
  setRoundPainting, getPaintingCutSrc, getPaintingImageSrc, getRoundPainting,
  getRandomPainting,
};
