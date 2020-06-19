import './index.scss';
import { ServerAPI } from 'Service/ServerAPI';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

const serverAPI = new ServerAPI;
const titleUser = document.querySelector('.page__title');
const reportLine = document.querySelector('.page__report')
const loginButton = document.querySelector('.page__login-button');

const whoIsGameFor = () => {
  serverAPI.getUser().then(
    (userSettings) => {
      console.log('We have user', userSettings.name);
      titleUser.innerText = `Select game ${userSettings.name}`;

      loginButton.innerText = 'LogOut';
      loginButton.removeEventListener('click', whoIsGameFor);
      loginButton.addEventListener('click', userLogout);
    },
    (rejectReport) => {
      console.log('User canceled');
      titleUser.innerText = `Select game ${rejectReport.name}`;
      reportLine.innerText = rejectReport.message;
    }
  )
}

const userLogout = () => {
  serverAPI.logoutUser();

  loginButton.removeEventListener('click', userLogout);
  loginButton.addEventListener('click', whoIsGameFor);

  titleUser.innerText = 'Select game...';
  loginButton.innerText = 'LogIn';
}

loginButton.addEventListener('click', whoIsGameFor);
whoIsGameFor();


// eslint-disable-next-line no-console
console.log(
  '%cTask RS Lang\n',
  'font-family: sans-serif; font-size: 28px; letter-spacing: 0.1em;',
  'RS School, group 22 2020q1',
);
