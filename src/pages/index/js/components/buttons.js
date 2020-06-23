import { dataController, titleUser, loginButton, logoutButtons, 
settingsSaveBtns, modal, translation, meaning, 
example, picture, transcription, footer, deleteCard, message, cardsPerDay, 
newCardsPerDay, justNewWords, generalMessage } from '../constants';

const whoIsGameFor = () => {
  dataController.getUser().then(
    (userSettings) => {
      console.log('We have user', userSettings);
      titleUser.innerText = userSettings.name;  
      
      loginButton.classList.add('hidden');
      logoutButtons.forEach((btn) => { btn.classList.remove('hidden'); });
      loginButton.removeEventListener('click', whoIsGameFor);
    },
    (rejectReport) => {
      console.log('User canceled');
      titleUser.innerText = `${rejectReport.name}`;
      reportLine.innerText = rejectReport.message;
    }
  )
}

const userLogout = () => {
  dataController.logoutUser();

  loginButton.classList.remove('hidden');
  logoutButtons.forEach((btn) => { btn.classList.add('hidden'); });

  titleUser.innerText = 'CAPTAIN ANONIMUS';
}

loginButton.addEventListener('click', whoIsGameFor);
logoutButtons.forEach((btn) => { 
  btn.addEventListener('click', userLogout);
});
//TODO
  const settings = {
        cardsPerDay: 30,
        newCardsPerDay: 15,
        justNewWords: 0,
        cardContainsTranslation: 1,
        cardContainsMeaning: 0,
        cardContainsExample: 0,
        cardContainsPicture: 1,
        cardContainsTranscription: 1,
        footerBtnsEnabled: 1,
        deleteBtnEnabled: 1,
      }
settingsSaveBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.target.closest('form.settings__general')) {
      if (+cardsPerDay.value < +newCardsPerDay.value){
        generalMessage.classList.remove('hidden');
      } else {
        generalMessage.classList.add('hidden');
        settings.cardsPerDay = +cardsPerDay.value;
        settings.newCardsPerDay = +newCardsPerDay.value;
        settings.justNewWords = +justNewWords.checked;
      }     
    } else {
      if (!(translation.checked || translation.checked || example.checked)) {
        message.classList.remove('hidden');
        translation.checked = true;
      } else {
        message.classList.add('hidden');
        settings.cardContainsTranslation = +translation.checked;
        settings.cardContainsMeaning = +meaning.checked;
        settings.cardContainsExample = +example.checked;
        settings.cardContainsPicture = +picture.checked;
        settings.cardContainsTranscription = +transcription.checked;
        settings.footerBtnsEnabled = +footer.checked;
        settings.deleteBtnEnabled = +deleteCard.checked;
      }      
    }
    console.log(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
    // TODO send settings to backend
  });
})
