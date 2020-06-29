import './index.scss';
import 'materialize-css';
import AuditionGame from './js/audition'

  require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

const startGameBtn = document.getElementById('start-game-btn');

startGameBtn.addEventListener('click', () => new AuditionGame());

M.AutoInit();

document.addEventListener('DOMContentLoaded', () => {
  const sidenav = document.querySelectorAll('.sidenav');
  const sidenavInstance = M.Sidenav.init(sidenav);
});
