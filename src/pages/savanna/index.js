import './index.scss';
import startGame from './js/game/game';
import { startButton } from './js/helper/constants';


startButton.addEventListener('click', () => startGame());




require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);