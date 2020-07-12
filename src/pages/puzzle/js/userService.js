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
    () => {
      document.querySelector('.avatar__name').innerText = 'CAPTAIN ANONIMUS';
      document.querySelector('.user-words-checkbox').disabled = 'disabled';
      statBtn.classList.add('hidden');
    },
  );
};
