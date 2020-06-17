import './index.scss';
import { AuthPopup } from 'Components/AuthPopup';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

AuthPopup();

// eslint-disable-next-line no-console
console.log(
  '%cTask RS Lang\n',
  'font-family: sans-serif; font-size: 28px; letter-spacing: 0.1em;',
  'RS School, group 22 2020q1',
);
