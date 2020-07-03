import './index.scss';
import 'materialize-css';
import Intro from './js/intro/intro';
import Game from './js/game/game';

// eslint-disable-next-line no-undef
M.AutoInit();

// eslint-disable-next-line no-unused-vars
const intro = new Intro();
// eslint-disable-next-line no-unused-vars
const game = new Game();

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);
