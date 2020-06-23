import { header, startMenu, gameContainer, resultContainer, gameData } from '../helper/constants';
import Helper from '../helper/helper';



const startGame = () => {
    resultContainer.classList.add('hidden');
    header.classList.remove('hidden');
    gameContainer.classList.remove('hidden');
    startMenu.classList.add('hidden');
    gameData.currentCards = (Helper.getRandomRoundCards(gameData.currentLevel, gameData.currentRound));
    Helper.renderRoundGame(gameData.currentCards);
    gameContainer.addEventListener('click', event => {
        if (gameData.currentLevel === 6 && gameData.currentRound === 6) {
            Helper.renderStat();
            return;
        }
        if (event.target.classList.contains('game-savanna__answer-word') && event.target.innerText.slice(2) === gameData.wordContainer.wordTranslate) {
            gameData.knowWords.push(gameData.wordContainer);
            if (gameData.roundStreak >= 7 && gameData.currentLevel !== 6) {
                gameData.currentLevel += 1;
                gameData.roundStreak = 0;
                gameData.currentCards = Helper.getRandomRoundCards(gameData.currentLevel, gameData.currentRound);
            } else if (gameData.roundStreak >= 3) {
                gameData.currentRound += 1;
                gameData.currentCards = Helper.getRandomRoundCards(gameData.currentLevel, gameData.currentRound);
            }
            gameData.roundStreak += 1;
            console.log('Угадал', gameData)
            Helper.renderRoundGame(gameData.currentCards);
        } else if (event.target.classList.contains('game-savanna__answer-word') && event.target.innerText.slice(2) !== gameData.wordContainer.wordTranslate) {
            gameData.errorWords.push(gameData.wordContainer);
            gameData.roundStreak = 0;
            gameData.health -= 1;
            if (gameData.health === 0) {
                Helper.renderStat();
            } else {
                Helper.renderRoundGame(gameData.currentCards);
            }
            console.log('НЕ угадал', gameData);
        }
    })
}


export default startGame;