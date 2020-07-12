import { store } from './storage';
import { checkCheckboxes } from './helpers';
import { dataController, statBtn } from './constants';

export const whoIsGameFor = () => {
  dataController.getUser().then(
    (userSettings) => {
      document.querySelector('.avatar__name').innerText = userSettings.name;
      document.querySelector('.user-words-checkbox').removeAttribute('disabled');
      statBtn.classList.remove('hidden');
      if (userSettings.puzzle) {
        store.setUserSettings(userSettings.puzzle);
        checkCheckboxes();
      }
    },
    (rejectReport) => {
      console.log('User canceled');
      document.querySelector('.avatar__name').innerText = rejectReport.name ;
      document.querySelector('.user-words-checkbox').disabled = 'disabled';
      statBtn.classList.add('hidden');
    },
  );
};
