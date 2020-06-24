import './index.scss';
import 'materialize-css';
import './js/components/buttons';
import './js/components/form-components';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);


// eslint-disable-next-line no-undef
M.AutoInit();

document.querySelector('.menu__settings').addEventListener('click', () => {
  document.querySelector('.settings-container').classList.remove('hidden');
})
