import './index.scss';
import 'materialize-css';
import Training from './components/Training';


M.AutoInit();
const sideNavOptions = {
  edge: 'right',
}
const sideNav = M.Sidenav.init(document.querySelector('.sidenav'), sideNavOptions);

const train = new Training(10, 20);
train.start();