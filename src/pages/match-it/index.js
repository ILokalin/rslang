import './index.scss';
import 'materialize-css';
import Intro from './components/Intro';
import Game from './components/Game';

const intro = new Intro();
intro.init();
const game = new Game();
game.start();

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);
