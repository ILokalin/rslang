import {
  settings,
  statistcs,
  vocabulary,
  main,
  dataController,
  titleUser,
  loginButton,
  logoutButtons,
  settingsSaveBtns,
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
import {handleSettingsView} from './form-components';
import {renderShortTermStat} from './mainPageStat';

export const whoIsGameFor = () => {
  main.classList.add('hidden');
  settings.classList.add('hidden');
  statistcs.classList.add('hidden');
  vocabulary.classList.add('hidden');
  dataController.getUser().then(
    (userSettings) => {
      console.log('We have user', userSettings);
      titleUser.innerText = userSettings.name;

      localStorage.setItem('settings', JSON.stringify(userSettings.settings));
      renderShortTermStat(userSettings.settings);

      handleSettingsView();

      loginButton.classList.add('hidden');
      main.classList.remove('hidden');
      logoutButtons.forEach((btn) => {
        btn.classList.remove('hidden');
      });
    },
    (rejectReport) => {
      console.log('User canceled');
      titleUser.innerText = `${rejectReport.name}`;
      const settings = {
        lastTrain: 'date',
        cardsPerDay: 30,
        newCardsPerDay: 15,
        justNewWords: 0,
        cardContainsTranslation: 1,
        cardContainsMeaning: 0,
        cardContainsMeaningTransl: 0,
        cardContainsExample: 0,
        cardContainsExampleTransl: 0,
        cardContainsPicture: 1,
        cardContainsTranscription: 1,
        footerBtnsEnabled: 1,
        deleteBtnEnabled: 1,
        showAnswerBtnEnabled: 0,
        autoPlayEnabled: 1,
      };      
      localStorage.setItem('settings', JSON.stringify(settings));
      handleSettingsView();
      main.classList.remove('hidden');
    },
  );
};

whoIsGameFor();

const userLogout = () => {
  dataController.logoutUser();
  loginButton.classList.remove('hidden');
  logoutButtons.forEach((btn) => {
    btn.classList.add('hidden');
  });
  titleUser.innerText = 'CAPTAIN ANONIMUS';
};

loginButton.addEventListener('click', whoIsGameFor);
logoutButtons.forEach((btn) => {
  btn.addEventListener('click', userLogout);
});


settingsSaveBtns.forEach((btn) => {
  const settings = JSON.parse(localStorage.getItem('settings'));
  btn.addEventListener('click', (event) => {
    if (event.target.closest('form.settings__general')) {
      if (+cardsPerDay.value < +newCardsPerDay.value) {
        generalMessage.classList.remove('hidden');
      } else {
        generalMessage.classList.add('hidden');
        settings.cardsPerDay = +cardsPerDay.value;
        settings.newCardsPerDay = +newCardsPerDay.value;
        settings.justNewWords = +justNewWords.checked;
      }
    } else if (!(translation.checked || translation.checked || example.checked)) {
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
      settings.cardContainsMeaningTransl = +meaningTranslation.checked;
      settings.cardContainsExampleTransl = +exampleTranslation.checked;
      settings.showAnswerBtnEnabled = +showAnswerBtn.checked;
      settings.autoPlayEnabled = +autoPlay.checked;
    }
    console.log(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
    // TODO send settings to backend
    dataController.setUserOptions({name: 'Mr Checker', settings});
  });
});
