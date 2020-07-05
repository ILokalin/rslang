
import './index.scss';
import { DataController } from 'Service/DataController';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

const dataController = new DataController();
const titleUser = document.querySelector('.page__title');
const reportLine = document.querySelector('.page__report');
const loginButton = document.querySelector('.page__login-button');
const wordsButton = document.querySelector('.page__words-button');

const getDataButton = document.querySelector('.page__get-button');
const putDataButton = document.querySelector('.page__put-button');
const newName = document.querySelector('.page__input-name');
const firstValue = document.querySelector('.page__input-words-example');
const secondValue = document.querySelector('.page__input-words-ppage');
const imageMaterial = document.querySelector('.page__la-pic');
const audio = new Audio();

let wordPagesCount = 0;

const showUserInfo = (name, description) => {
  titleUser.innerText = `Select game ${name}`;
  reportLine.innerText = description;
};

const whoIsGameFor = () => {
  dataController.getUser().then(
    (userSettings) => {
      console.log('We have user', userSettings.name);
      console.log('SettingsObj: ', userSettings);
      titleUser.innerText = `Select game ${userSettings.name}`;
      reportLine.innerText = 'Good day';

      loginButton.innerText = 'LogOut';
      loginButton.removeEventListener('click', whoIsGameFor);
      loginButton.addEventListener('click', userLogout);
    },
    (rejectReport) => {
      console.log('User canceled');
      titleUser.innerText = `Select game ${rejectReport.name}`;
      reportLine.innerText = rejectReport.message;
    },
  );
};

dataController.getWordMaterials('5e9f5ee35eb9e72bc21af4a0').then((materialOfCard) => {
  imageMaterial.src = materialOfCard.image;
  audio.src = materialOfCard.audio;
});

const playAudio = () => {
  audio.play();
};

getDataButton.addEventListener('click', playAudio);

const userLogout = () => {
  dataController.logoutUser();

  loginButton.removeEventListener('click', userLogout);
  loginButton.addEventListener('click', whoIsGameFor);

  titleUser.innerText = 'Select game...';
  loginButton.innerText = 'LogIn';
};

loginButton.addEventListener('click', whoIsGameFor);
whoIsGameFor();

const wordsLoad = () => {
  const wordsPerExampleSentenceLTE = firstValue.value;
  const wordsPerPage = secondValue.value;

  dataController
    .getWords({
      group: 1,
      page: (wordPagesCount += 1),
      wordsPerExampleSentenceLTE,
      wordsPerPage,
    })
    .then(
      (words) => {
        console.log(words);
      },
      (rejectReport) => {
        reportLine.innerText = rejectReport.message;
      },
    );
};

wordsButton.addEventListener('click', wordsLoad);

const putUserSettings = () => {
  dataController.setUserOptions({ name: newName.value }).then((userSettings) => {
    showUserInfo(userSettings.name, 'new data');
  });
};

putDataButton.addEventListener('click', putUserSettings);
