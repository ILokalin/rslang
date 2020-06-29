import { checkBtn, ERRORS_MAX_COUNT } from '../data/constants';

const dataTransfer = (props) => {
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
      const card = document.getElementById(id);
      const image = card.getElementsByTagName('img')[0];
      const copySrc = targetImage.src;
      targetImage.src = image.src;
      image.src = copySrc;
      event.currentTarget.querySelector('.card-title').dataset.word = card.querySelector(
        '.card-title',
      ).innerHTML;
      event.currentTarget.querySelector('.card-content').classList.add('hidden');
      image.style.opacity = 0;
      card.style.pointerEvents = 'none';
      if (
        event.currentTarget.querySelector('.card-title').dataset.word ===
        event.currentTarget.querySelector('.card-title').innerHTML
      ) {
        props.knowArr.push(props.errorsArr[card.getAttribute('index')]);
        props.know += 1;
        props.errors -= 1;
        event.currentTarget.querySelector('.card-title').classList.add('success');
        event.currentTarget.querySelector('.card-title').innerHTML = 'success';
        if (props.knowArr.length === 2) {
          checkBtn.click();
        }
      } else {
        event.currentTarget.querySelector('.card-title').classList.add('error');
        event.currentTarget.querySelector('.card-title').innerHTML = 'error';
      }
    });
  });
};

export { dataTransfer };
