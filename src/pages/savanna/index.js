import './index.scss';
import startGame from './js/game/game';
import { STARTBTN, RESTARTBTN, GAMEDATA } from './js/helper/constants';


STARTBTN.addEventListener('click', () => startGame());
RESTARTBTN.addEventListener('click', () => {
    GAMEDATA.currentCards = [];
    GAMEDATA.currentLevel = 1;
    GAMEDATA.currentRound = 1;
    GAMEDATA.health = 5;
    GAMEDATA.roundStreak = 0;
    console.log('ГЛОБАЛЬНЫЙ ОБЪЕКТ ПОСЛЕ РЕСТАРТА', GAMEDATA);
    startGame();
})



require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);