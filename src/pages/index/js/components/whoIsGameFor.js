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
import {renderStatChart} from './statChart';
import VocabularyWord from './vocabulary';

export const whoIsGameFor = () => {
  main.classList.add('hidden');
  settings.classList.add('hidden');
  statistcs.classList.add('hidden');
  vocabulary.classList.add('hidden');
  dataController.getUser().then(
    async (userSettings) => {
      console.log('We have user', userSettings);
      titleUser.innerText = userSettings.name;

      localStorage.setItem('settings', JSON.stringify(userSettings.settings));
      handleSettingsView();

      const vocabulary = new VocabularyWord(dataController);
      vocabulary.renderVocabulary();

      const statistics = await dataController.getUserStatistics();
      console.log(statistics);
      const shortTermStat = statistics.card.shortTime;
      renderShortTermStat(userSettings.settings, shortTermStat); 

      renderStatChart(statistics);     

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
