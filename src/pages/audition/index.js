import './index.scss';
import AuditionGame from './js/audition'

  require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

const startGameBtn = document.getElementById('start-game-btn');

startGameBtn.addEventListener('click', () => new AuditionGame())
