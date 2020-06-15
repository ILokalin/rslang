import './index.scss';
import App from './app';

require.context('Src', true, /\.(png|svg|jpg|gif)$/);
const appId = document.getElementById('app');
App(appId);
