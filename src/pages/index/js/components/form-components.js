import {
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
} from '../constants';

cardsPerDay.addEventListener('change', () => {
  newCardsPerDay.max = cardsPerDay.value;
  if (justNewWords.checked) {
    newCardsPerDay.value = cardsPerDay.value;
  }
});

justNewWords.addEventListener('change', () => {
  if (justNewWords.checked) {
    newCardsPerDay.value = cardsPerDay.value;
    newCardsPerDay.disabled = 'disabled';
  } else {
    newCardsPerDay.disabled = false;
  }
});

export const handleSettingsView = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));
  cardsPerDay.value = +settings.cardsPerDay;
  newCardsPerDay.value = +settings.newCardsPerDay;
  justNewWords.checked = !!settings.justNewWords;
  translation.checked = !!settings.cardContainsTranslation;
  meaning.checked = !!settings.cardContainsMeaning;
  example.checked = !!settings.cardContainsExample;
  picture.checked = !!settings.cardContainsPicture;
  transcription.checked = !!settings.cardContainsTranscription;
  footer.checked = !!settings.footerBtnsEnabled;
  deleteCard.checked = !!settings.deleteBtnEnabled;
  meaningTranslation.checked = !!settings.cardContainsMeaningTransl;
  exampleTranslation.checked = settings.cardContainsExampleTransl;
  showAnswerBtn.checked = settings.showAnswerBtnEnabled;
  autoPlay.checked = settings.autoPlayEnabled;
};


