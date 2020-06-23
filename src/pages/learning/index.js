import './index.scss';
import 'materialize-css';
import { mySwiper, settings } from './components/constants';
import Training from './components/Training';


M.AutoInit();

const train = new Training(settings.cardPerDay, settings.newCardsPerDay);
mySwiper.train = train;

