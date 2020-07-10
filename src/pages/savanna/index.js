import './index.scss';
import 'materialize-css';
import Game from './js/game/game';

// eslint-disable-next-line no-undef
M.AutoInit();

// eslint-disable-next-line no-unused-vars
const game = new Game();
const storageHandle = ({ key }) => {
  if (key === 'isLogin') {
    location.reload();
  }
};

window.addEventListener('storage', storageHandle);

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);
