import { HEADER, STARTMENU, GAMECONTAINER, GAMEDATA, INFO } from '../helper/constants';
import Helper from '../helper/helper';



const startGame = () => {
    INFO.classList.add('hidden');
    HEADER.classList.remove('hidden');
    GAMECONTAINER.classList.remove('hidden');
    STARTMENU.classList.add('hidden');
    GAMEDATA.currentCards.push(Helper.getRandomRoundCards(GAMEDATA.currentRound, GAMEDATA.currentLevel));
    Helper.renderRoundGame(GAMEDATA.currentCards);
    console.log('ГЛОБАЛЬНЫЙ ОБЪЕКТ', GAMEDATA);
    GAMECONTAINER.addEventListener('click', event => {
        if (event.target.classList.contains('main-savanna__answer-word') && event.target.innerText === GAMEDATA.wordContainer.wordTranslate) {
            GAMEDATA.knowWords.push(GAMEDATA.wordContainer);
            if (GAMEDATA.roundStreak >= 7) {
                GAMEDATA.currentLevel += 1;
                GAMEDATA.roundStreak = 0;
                GAMEDATA.currentCards.push(Helper.getRandomRoundCards(GAMEDATA.currentRound, GAMEDATA.currentLevel));
            } else if (GAMEDATA.roundStreak >= 3) {
                GAMEDATA.currentRound += 1;
                console.log(typeof GAMEDATA.currentCards);
                GAMEDATA.currentCards.push(Helper.getRandomRoundCards(GAMEDATA.currentRound, GAMEDATA.currentLevel));
                console.log(typeof GAMEDATA.currentCards);
            }
            GAMEDATA.roundStreak += 1;
            if (GAMEDATA.currentLevel > 6) {
                Helper.renderStat();
            }
            Helper.renderRoundGame(GAMEDATA.currentCards);
            console.log('ПОСЛЕ УГАДАННОГО СЛОВА', GAMEDATA);
        } else if (event.target.classList.contains('main-savanna__answer-word') && event.target.innerText !== GAMEDATA.wordContainer.wordTranslate) {
            GAMEDATA.errorWords.push(GAMEDATA.wordContainer);
            console.log('ПОСЛЕ ФЕЙЛА', GAMEDATA);
            GAMEDATA.roundStreak = 0;
            GAMEDATA.health -= 1;
            if (GAMEDATA.health === 0) {
                Helper.renderStat();
            } else {
                Helper.renderRoundGame(GAMEDATA.currentCards);
            }
        }
    })
}


export default startGame;