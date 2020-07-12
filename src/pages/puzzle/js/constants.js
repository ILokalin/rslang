import { DataController } from 'Service/DataController/DataController';
import { PreloaderController } from 'Service/PreloaderController';

const gamePage = document.querySelector('.game-page');
const homePage = document.querySelector('.home-page');
const translateBtn = document.querySelector('.translate-btn');
const pronounceBtn = document.querySelector('.pronounce-btn');
const pictureBtn = document.querySelector('.picture-btn');
const inputField = document.querySelector('.game-input');
const dontKnowBtn = document.querySelector('.dontknow-btn');
const checkBtn = document.querySelector('.check-btn');
const continueBtn = document.querySelector('.continue-btn');
const resultsBtn = document.querySelector('.results-btn');
const painting = document.querySelector('.painting');
const audio = document.querySelector('audio');
const translation = document.querySelector('.sentence-translation');
const paintingInfo = inputField.querySelector('.painting-info');
const sideNav = document.querySelector('.sidenav');
const roundsCount = [45, 41, 40, 29, 29, 25];
const errorMsg = document.querySelector('.error-message');
const miniature = document.querySelector('.miniature-painting');
const miniatureInfo = document.querySelector('.miniature-painting-info');
const linkToPainting = document.querySelector('.link-to-painting');
const roundStatisticsPage = document.querySelector('.round-statistics-page');
const fullStatPage = document.querySelector('.full-stat-page');
const statBtn = document.querySelector('.statistic-btn');
const puzzleGrooveWidth = 17;
const dataController = new DataController();
const preloaderController = new PreloaderController();
const paintingUrl = 'https://raw.githubusercontent.com/jules0802/rslang_data_paintings/master/';

export {
  gamePage,
  homePage,
  translateBtn,
  pronounceBtn,
  pictureBtn,
  inputField,
  dontKnowBtn,
  checkBtn,
  continueBtn,
  resultsBtn,
  painting,
  audio,
  translation,
  paintingInfo,
  sideNav,
  roundsCount,
  errorMsg,
  miniature,
  miniatureInfo,
  linkToPainting,
  roundStatisticsPage,
  fullStatPage,
  statBtn,
  puzzleGrooveWidth,
  dataController,
  paintingUrl,
  preloaderController,
};
