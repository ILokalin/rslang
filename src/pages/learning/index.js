import './index.scss';
import 'materialize-css';
import Card from './components/Card';

M.AutoInit();
const sideNavOptions = {
  edge: 'right',
}
const sideNav = M.Sidenav.init(document.querySelector('.sidenav'), sideNavOptions);

