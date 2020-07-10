import {
  translation,
  meaning,
  example,
  picture,
  transcription,
  footer,
  deleteCard,
  cardsPerDay,
  newCardsPerDay,
  justNewWords,
  exampleTranslation,
  meaningTranslation,
  showAnswerBtn,
  autoPlay,
  message,
} from '../constants';

cardsPerDay.addEventListener('change', () => {
  newCardsPerDay.max = cardsPerDay.value;
  document.querySelector('.new-block .range-max-value').innerText = cardsPerDay.value;
  document.querySelector('.total-cards-amount').innerText = cardsPerDay.value;

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

newCardsPerDay.addEventListener('change', () => {
  document.querySelector('.new-words-amount').innerText = newCardsPerDay.value;
}
)

document.querySelector('.card-info-checkboxes').addEventListener('click', () => {
  const requeredCheckboxes = [translation, meaning, example];
  if (!(translation.checked && meaning.checked && example.checked)) {
    message.classList.remove('hidden');
  } 
  if (translation.checked || meaning.checked || example.checked) {
    message.classList.add('hidden');  
  }
})

export const handleSettingsView = () => {
  const settings = JSON.parse(localStorage.getItem('cardsSettings'));
  cardsPerDay.value = +settings.cardsPerDay;
  document.querySelector('.total-cards-amount').innerText = cardsPerDay.value;
  document.querySelector('.new-block .range-max-value').innerText = cardsPerDay.value;
  newCardsPerDay.value = +settings.newCardsPerDay;
  document.querySelector('.new-words-amount').innerText = newCardsPerDay.value;
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



