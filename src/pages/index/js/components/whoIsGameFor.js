import {
  settings,
  statistcs,
  vocabulary,
  main,
  dataController,
  titleUser,
  loginButton,
  logoutButtons,
  menuLinks,
  trainingBtn,
  mainPageStats,
  mainLogoutMsg,
} from '../constants';
import { handleSettingsView } from './form-components';
import { renderShortTermStat } from './mainPageStat';
import { renderStatChart } from './statChart';
import VocabularyWord from './vocabulary';
import { renderTable } from './statTable';

export const whoIsGameFor = () => {
  main.classList.add('hidden');
  settings.classList.add('hidden');
  statistcs.classList.add('hidden');
  vocabulary.classList.add('hidden');
  mainPageStats.classList.remove('hidden');
  mainLogoutMsg.classList.add('hidden');
  dataController.getUser().then(
    async (userSettings) => {
      titleUser.innerText = userSettings.name;

      menuLinks.forEach((link) => {
        link.classList.remove('disabled-link');
      });
      trainingBtn.classList.remove('disabled');

      localStorage.setItem('cardsSettings', JSON.stringify(userSettings.settings));
      handleSettingsView();

      // eslint-disable-next-line no-shadow
      const vocabulary = new VocabularyWord(dataController);
      vocabulary.renderVocabulary();

      const statistics = await dataController.getUserStatistics();
      const shortTermStat = statistics.card.shortTime;
      await renderShortTermStat(userSettings.settings, shortTermStat);

      renderStatChart(statistics);
      renderTable(statistics);

      loginButton.classList.add('hidden');
      main.classList.remove('hidden');
      logoutButtons.forEach((btn) => {
        btn.classList.remove('hidden');
      });
    },
    (rejectReport) => {
      titleUser.innerText = `${rejectReport.name}`;
      main.classList.remove('hidden');
      menuLinks.forEach((link) => {
        link.classList.add('disabled-link');
      });
      trainingBtn.classList.add('disabled');
      mainPageStats.classList.add('hidden');
      mainLogoutMsg.classList.remove('hidden');
    },
  );
};
