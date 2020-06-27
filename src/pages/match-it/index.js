import './index.scss';
import 'materialize-css';
import Intro from './components/Intro';
import Game from './components/Game';

const intro = new Intro();
intro.init();
const game = new Game();

document.querySelectorAll('.draggable').forEach((item) => {
  item.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text', event.target.closest('.card').id);
  });
});

document.querySelectorAll('.droptarget').forEach((item) => {
  item.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  item.addEventListener('dragleave', (event) => {
    item.classList.remove('hover');
  });
  item.addEventListener('dragenter', (event) => {
    item.classList.add('hover');
  });

  item.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const targetImage = event.currentTarget.getElementsByTagName('img')[0];
    const image = document.getElementById(id).getElementsByTagName('img')[0];
    const copySrc = targetImage.src;
    targetImage.src = image.src;
    image.src = copySrc;
    /*if (targetImage.src !== image.src) {
    if (event.currentTarget.classList.contains('word')) {
       targetImage.src = image.src;
       image.src = targetImage.src;
       event.currentTarget.classList.remove('word');
       //image.src = '../img/blank.jpg';
    } else {
       event.currentTarget.classList.add('word');
       image.src = targetImage.src;
       targetImage.src = image.src;
      // targetImage.src = '../img/blank.jpg';
    }
    }*/

    //image.src = copySrc;
  });
});

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);
