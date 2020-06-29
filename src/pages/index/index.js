import './index.scss';
import 'materialize-css';
import './js/components/buttons';
import './js/components/sideMenu';
import './js/components/form-components';
import {renderShortTermStat} from './js/components/mainPageStat';
import {renderStatChart} from './js/components/statChart';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// eslint-disable-next-line no-undef
M.AutoInit();
renderShortTermStat();
renderStatChart();
