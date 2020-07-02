import { checkBtn, ERRORS_MAX_COUNT } from '../data/constants';

const dataTransfer = (props) => {
  document.querySelectorAll('.draggable').forEach((item) => {
    item.addEventListener('dragstart', (event) => {
      const itemDataTransfer = event.dataTransfer;
      itemDataTransfer.dropEffect = 'move';
      itemDataTransfer.setData('text', event.target.closest('.card-panel').id);
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
        document.querySelectorAll('.container__cards .col').forEach((child) => {
          if (child.children.length === 1) {
            child.querySelector('.card-image').classList.remove('overlayed');
          }
        });
        const targetCardImage = event.currentTarget.querySelector('.card-image');
        targetCardImage.classList.add('overlayed');
        if (id === `word-${event.currentTarget.id.split('-')[1]}`) {
          const currentWord = props.errorsArr.find((word) => word.id === id);
          props.errorsArr.splice(props.errorsArr.indexOf(currentWord), 1);
          props.knowArr.push(currentWord);
          card.success = true;
          props.know += 1;
          props.errors -= 1;
        }
      }
      if (props.know === ERRORS_MAX_COUNT) {
        checkBtn.click();
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
        if (card.success) {
          props.know -= 1;
          props.errors += 1;
        } else {
          props.errors -= 1;
        }
        card.success = false;
        currentCardImage.classList.remove('overlayed');
      }
    });
  });
};

export { dataTransfer };
