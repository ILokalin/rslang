import './index.scss';
import App from './app';
import { Demo } from 'Pages/Demo';

require.context('Src', true, /\.(png|svg|jpg|gif)$/);

const appId = document.getElementById('app');
Demo(appId);
