import 'materialize-css';
import { settings, statistcs, vocabulary, main } from '../constants';

document.querySelector('.menu').addEventListener('click', (event) => {
  if (event.target.closest('.menu__settings')) {
    settings.classList.remove('hidden');
    main.classList.add('hidden');
    statistcs.classList.add('hidden');
    vocabulary.classList.add('hidden');
  }
  if (event.target.closest('.menu__home')) {
    main.classList.remove('hidden');
    settings.classList.add('hidden');
    statistcs.classList.add('hidden');
    vocabulary.classList.add('hidden');
  }
  if (event.target.closest('.menu__statistics')) {
    statistcs.classList.remove('hidden');
    settings.classList.add('hidden');
    main.classList.add('hidden');
    vocabulary.classList.add('hidden');
  }
  if (event.target.closest('.menu__vocabulary')) {
    vocabulary.classList.remove('hidden');
    statistcs.classList.add('hidden');
    settings.classList.add('hidden');
    main.classList.add('hidden');
  }
});
