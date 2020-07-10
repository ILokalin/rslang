import { store } from './storage';
import { checkCheckboxes, } from './helpers';
import { homePage, gamePage, dataController, statBtn, } from './constants';

export const whoIsGameFor = () => {
  dataController.getUser().then(
    (userSettings) => {
      console.log('We have user', userSettings);
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
      document.querySelector('.avatar__name').innerText = 'CAPTAIN ANONIMUS';
      document.querySelector('.user-words-checkbox').disabled = 'disabled';
      statBtn.classList.add('hidden'); 
    },
  );
};