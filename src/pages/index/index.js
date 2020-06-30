import './index.scss';
import 'materialize-css';
import './js/components/buttons';
import './js/components/sideMenu';
import './js/components/form-components';
// import { renderShortTermStat } from './js/components/mainPageStat';
import { renderStatChart } from './js/components/statChart';
import VocabularyWord from './js/components/vocabulary';

const vocabulary = new VocabularyWord();

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// renderShortTermStat();
renderStatChart();
vocabulary.renderVocabulary();
