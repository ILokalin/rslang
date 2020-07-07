import './index.scss';
import 'materialize-css';
import { DataController } from 'Service/DataController';
import UserService from './services/userService';
import DataTransferService from './services/dataTransferService';
import Intro from './components/Intro';
import Game from './components/Game';

const dataController = new DataController();
const userService = new UserService(dataController);
const dataTransfer = new DataTransferService();

const intro = new Intro();
intro.init();
const game = new Game(dataController, userService, dataTransfer);
game.start();

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);
