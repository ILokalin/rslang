import './index.scss';
import 'materialize-css';

M.AutoInit();
var elems = document.querySelectorAll('.carousel');
const options = {
  indicators: true,
  fullWidth: true,
}
var instances = M.Carousel.init(elems, options);
