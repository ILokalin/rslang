import './index.scss';
import 'materialize-css';
import { DataController } from 'Service/DataController';
import { PreloaderController } from 'Service/PreloaderController';
import UserService from './services/userService';
import DataTransferService from './services/dataTransferService';
import Intro from './components/Intro';
import Game from './components/Game';

const dataController = new DataController();
const preloaderController = new PreloaderController();
const userService = new UserService(dataController);
const dataTransfer = new DataTransferService();

const game = new Game(dataController, preloaderController, dataTransfer, userService);
const intro = new Intro();
intro.init(game);

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

/*
const storageHandle = ({ key }) => {
  if (key === 'isLogin') {
    location.reload();
  }
};

window.addEventListener('storage', storageHandle);
*/
