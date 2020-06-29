import './index.scss';
import 'materialize-css';

M.AutoInit();
const elems = document.querySelectorAll('.slider');
const sliderOptions = {
  indicators: true,
  interval: 4000,
}
const instances = M.Slider.init(elems, sliderOptions);

