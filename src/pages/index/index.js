import './index.scss';
// import { AuthPopup } from 'Components/AuthPopup';
import { ServerAPI } from 'Service/ServerAPI';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

const serverAPI = new ServerAPI();
const titleUser = document.querySelector('.title');

 serverAPI.getUser().then(
  (userInfo) => {
    console.log('We have user', userInfo);
    titleUser.innerText += ` ${  userInfo}`;
  },
  (errorStatus) => {
    console.log('User canceled');
    titleUser.innerText += ` Incognito`;
  }
)

// AuthPopup();

// eslint-disable-next-line no-console
console.log(
  '%cTask RS Lang\n',
  'font-family: sans-serif; font-size: 28px; letter-spacing: 0.1em;',
  'RS School, group 22 2020q1',
);
