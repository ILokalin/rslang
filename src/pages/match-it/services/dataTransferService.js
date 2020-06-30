import { checkBtn, ERRORS_MAX_COUNT } from '../data/constants';

const dataTransfer = (props) => {
  document.querySelectorAll('.draggable').forEach((item) => {
    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text', event.target.closest('.card-panel').id);
    });
  });

  document.querySelectorAll('.droptarget').forEach((item) => {
    item.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    item.addEventListener('dragleave', (event) => {
      item.classList.remove('hover');
      event.preventDefault();
    });
    item.addEventListener('dragenter', (event) => {
      item.classList.add('hover');
      event.preventDefault();
    });

    item.addEventListener('drop', (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData('text');
      const targetCardContent = event.currentTarget.querySelector('.card-content');
      const targetCardTitle = event.currentTarget.querySelector('.card-title');
      const wordId = targetCardTitle.getAttribute('data-word-id');
      if (wordId) {
        const previousCard = document.getElementById(wordId);
        previousCard.classList.remove('hidden');
        if (targetCardTitle.classList.contains('success')) {
          props.know -= 1;
          props.errors += 1;
          targetCardTitle.classList.remove('success');
        } else {
          props.errors -= 1;
          targetCardTitle.classList.remove('error');
        }
      }
      const card = document.getElementById(id);
      const word = card.children[0].innerHTML;
      card.classList.add('hidden');
      const currentWord = event.currentTarget.getAttribute('data-word');
      if (word === currentWord) {
        props.knowArr.push(props.errorsArr[card.getAttribute('index')]);
        props.know += 1;
        props.errors -= 1;
        targetCardTitle.classList.add('success');
        if (props.knowArr.length === ERRORS_MAX_COUNT) {
          checkBtn.click();
        }
      } else {
        targetCardTitle.classList.add('error');
      }
      targetCardTitle.setAttribute('data-word-id', id);
      targetCardContent.classList.remove('hidden');
      targetCardTitle.innerHTML = word;
    });
  });
};

export { dataTransfer };
