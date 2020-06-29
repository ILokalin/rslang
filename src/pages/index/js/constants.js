/* eslint-disable no-undef */
import { DataController } from 'Service/DataController';
import 'materialize-css';

const titleUser = document.querySelector('.avatar__name');
const loginButton = document.querySelector('.nav__login');
const logoutButtons = document.querySelectorAll('.logout-btn');
const settingsSaveBtns = document.querySelectorAll('.settings-save-btn');
const dataController = new DataController();
const modal = M.Modal.getInstance(document.querySelector('.greeting'));
const translation = document.querySelector('.card__show-translation');
const meaning = document.querySelector('.card__show-meaning');
const example = document.querySelector('.card__show-example');
const exampleTranslation = document.querySelector('.card__show-example-translation');
const meaningTranslation = document.querySelector('.card__show-meaning-translation');
const picture = document.querySelector('.card__show-picture');
const transcription = document.querySelector('.card__show-transcription');
const footer = document.querySelector('.card__show-footer-btns');
const deleteCard = document.querySelector('.card__show-delete-btn');
const message = document.querySelector('.card__info-message');
const cardsPerDay = document.querySelector('.general__max-amount');
const newCardsPerDay = document.querySelector('.general__new-amount');
const justNewWords = document.querySelector('.general__only-new-words');
const generalMessage = document.querySelector('.general__info-message');
const showAnswerBtn = document.querySelector('.card__show-answer-btn');
const autoPlay = document.querySelector('.card__autoplay');
const settings = document.querySelector('.settings-container');
const statistcs = document.querySelector('.statistics-container');
const vocabulary = document.querySelector('.vocabulary-container');
const main = document.querySelector('main');

export {
  settings,
  statistcs,
  vocabulary,
  main,
  dataController,
  titleUser,
  loginButton,
  logoutButtons,
  settingsSaveBtns,
  modal,
  translation,
  meaning,
  example,
  picture,
  transcription,
  footer,
  deleteCard,
  message,
  cardsPerDay,
  newCardsPerDay,
  justNewWords,
  generalMessage,
  exampleTranslation,
  meaningTranslation,
  showAnswerBtn,
  autoPlay,
};
