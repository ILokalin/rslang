import './index.scss';
import 'materialize-css';
import { mySwiper } from './components/constants';
import Training from './components/Training';

M.AutoInit();

const train = new Training(10, 20);
mySwiper.train = train;
