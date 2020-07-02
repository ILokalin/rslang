import { checkBtn, ERRORS_MAX_COUNT } from '../data/constants';

const dataTransfer = (props) => {
  document.querySelectorAll('.draggable').forEach((item) => {
    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setData('text', event.target.closest('.card-panel').id);
    });
  });

  document.querySelectorAll('.container__cards .droptarget').forEach((item) => {
    item.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    item.addEventListener('dragleave', (event) => {
      event.preventDefault();
    });
    item.addEventListener('dragenter', (event) => {
      event.preventDefault();
    });

    item.addEventListener('drop', (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData('text');
      const card = document.getElementById(id);
      if (card) {
        const targetCard = event.currentTarget.closest('.col');
        targetCard.append(card);
        const targetCardImage = event.currentTarget.querySelector('.card-image');
        document.querySelectorAll('.container__cards .col').forEach((child) => {
          if (child.children.length === 1) {
            child.querySelector('.card-image').classList.remove('overlayed');
          }
        });
        targetCardImage.classList.add('overlayed');
      }
    });
  });
  document.querySelectorAll('.container__words.droptarget').forEach((item) => {
    item.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    item.addEventListener('dragleave', (event) => {
      event.preventDefault();
    });
    item.addEventListener('dragenter', (event) => {
      event.preventDefault();
    });

    item.addEventListener('drop', (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData('text');
      const card = document.getElementById(id);
      if (card) {
        const currentCardImage = card.parentNode.querySelector('.card-image');
        event.currentTarget.children.forEach((child) => {
          if (child.innerHTML.length === 0) {
            child.append(card);
          }
        });
        currentCardImage.classList.remove('overlayed');
      }
    });
  });
};

export { dataTransfer };
