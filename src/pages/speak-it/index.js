import './scss/index.scss';
import 'materialize-css';
import { DataController } from 'Service/DataController';
import { PreloaderController } from 'Service/PreloaderController';
import UserService from './services/userService';
import Intro from './components/Intro';
import Game from './components/Game';

const dataController = new DataController();
const preloaderController = new PreloaderController();
const userService = new UserService(dataController);

const game = new Game(dataController, preloaderController, userService);
const intro = new Intro();
intro.init(game);
