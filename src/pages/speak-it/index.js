import './scss/index.scss';
import 'materialize-css';
import Intro from './components/Intro';
import Game from './components/Game';

const intro = new Intro();
intro.init();
const game = new Game();
game.start();
