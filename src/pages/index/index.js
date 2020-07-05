import './index.scss';
import 'materialize-css';
import './js/components/buttons';
import './js/components/sideMenu';
import './js/components/form-components';
import { renderStatChart } from './js/components/statChart';
import { dataController } from './js/constants';


require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// eslint-disable-next-line no-undef
M.AutoInit();
renderStatChart();

