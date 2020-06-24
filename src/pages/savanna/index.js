import './index.scss';
import game from './js/game/game';
import { startButton } from './js/helper/constants';

startButton.addEventListener('click', game.startGame);

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);
