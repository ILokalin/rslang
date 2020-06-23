import {dataController, titleUser, loginButton, logoutButtons, 
settingsSaveBtns, modal, translation, meaning, 
example, picture, transcription, footer, deleteCard, message, 
cardsPerDay, newCardsPerDay, justNewWords} from '../constants';


cardsPerDay.addEventListener('change', () => {
  newCardsPerDay.max = cardsPerDay.value;
  if (justNewWords.checked) {
    newCardsPerDay.value = cardsPerDay.value;
  } 
});

justNewWords.addEventListener('change', () => {
  if (justNewWords.checked) {
    newCardsPerDay.value = cardsPerDay.value;
    newCardsPerDay.disabled = "disabled"
  } else {
    newCardsPerDay.disabled = false;
  }
});