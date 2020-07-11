import './index.scss';
import 'materialize-css';
import AuditionGame from './js/audition'

  require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

const startGameBtn = document.getElementById('start-game-btn');

startGameBtn.addEventListener('click', () => new AuditionGame());

M.AutoInit();

const storageHandle = ({ key }) => {
  if (key === 'isLogin' && !JSON.parse(localStorage[key])) {
    window.location.reload();
  } else if (key === 'isLogin' && JSON.parse(localStorage[key])) {
    window.location.reload();
  }
};

window.addEventListener('storage', storageHandle);

document.addEventListener('DOMContentLoaded', () => {
  const sidenav = document.querySelectorAll('.sidenav');
  const sidenavInstance = M.Sidenav.init(sidenav);
});
