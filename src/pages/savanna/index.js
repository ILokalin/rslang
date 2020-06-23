import './index.scss';
import startGame from './js/game/game';
import { startButton, restartButton, gameData } from './js/helper/constants';


startButton.addEventListener('click', () => startGame());
restartButton.addEventListener('click', () => {
    gameData.currentLevel = 1;
    gameData.currentRound = 1;
    gameData.health = 5;
    gameData.currentCards = [];
    gameData.wordContainer = [];
    startGame();
});




require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);