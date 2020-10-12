/* eslint-disable no-undef */
import './index.scss';
import 'materialize-css';

M.AutoInit();
const elems = document.querySelectorAll('.slider');
const sliderOptions = {
  indicators: true,
  interval: 4000,
};
M.Slider.init(elems, sliderOptions);
