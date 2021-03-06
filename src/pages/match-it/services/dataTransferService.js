import { allWords, checkBtn, ERRORS_MAX_COUNT } from '../data/constants';

export default class DataTransferService {
  start(props) {
    this.props = props;
    this.cardTransfer = this.cardTransferEvent.bind(this);
    this.wordTransfer = this.wordTransferEvent.bind(this);
    document.querySelectorAll('.draggable').forEach((item) => {
      item.addEventListener('dragstart', this.dragStart);
      item.addEventListener('dragend', this.dragEnd);
    });
    document.querySelectorAll('.container__cards .droptarget').forEach((item) => {
      item.addEventListener('dragover', (event) => event.preventDefault());
      item.addEventListener('dragleave', (event) => event.preventDefault());
      item.addEventListener('dragenter', (event) => event.preventDefault());
      item.addEventListener('drop', this.wordTransfer);
    });
    document.querySelectorAll('.container__words.droptarget').forEach((item) => {
      item.addEventListener('dragover', (event) => event.preventDefault());
      item.addEventListener('dragleave', (event) => event.preventDefault());
      item.addEventListener('dragenter', (event) => event.preventDefault());
      item.addEventListener('drop', this.cardTransfer);
    });
  }

  dragStart(event) {
    if (event.target.closest('.container__cards')) {
      allWords.classList.add('dashed');
    }

    const itemDataTransfer = event.dataTransfer;
    itemDataTransfer.dropEffect = 'move';
    itemDataTransfer.setData('text', event.target.closest('.card-panel').id);
  }

  dragEnd() {
    allWords.classList.remove('dashed');
  }

  cardTransferEvent(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const card = document.getElementById(id);
    if (card) {
      const currentCardImage = card.parentNode.querySelector('.card-image');
      if (currentCardImage) {
        currentCardImage.classList.remove('overlayed');
      }
      event.currentTarget.children.forEach((child) => {
        if (child.innerHTML.length === 0) {
          child.append(card);
        }
      });
      if (card.success) {
        this.props.know -= 1;
        this.props.errors += 1;
      }
      card.success = false;
    }
  }

  iKnowWord(id) {
    const currentWord = this.props.errorsArr.find((word) => word.id === id);
    this.props.errorsArr.splice(this.props.errorsArr.indexOf(currentWord), 1);
    this.props.knowArr.push(currentWord);

    this.props.know += 1;
    this.props.errors -= 1;
  }

  iDoNotKnowWord(id) {
    const currentWord = this.props.knowArr.find((word) => word.id === id);
    this.props.knowArr.splice(this.props.knowArr.indexOf(currentWord), 1);
    this.props.errorsArr.push(currentWord);

    this.props.know -= 1;
    this.props.errors += 1;
  }

  wordTransferEvent(event) {
    event.preventDefault();

    const id = event.dataTransfer.getData('text');
    const card = document.getElementById(id);
    if (card) {
      const { currentTarget } = event;
      const targetCard = currentTarget.closest('.col');
      if (targetCard.children.length > 1) {
        return;
      }
      targetCard.append(card);
      document.querySelectorAll('.container__cards .col').forEach((child) => {
        if (child.children.length === 1) {
          child.querySelector('.card-image').classList.remove('overlayed');
        }
      });
      const targetCardImage = currentTarget.querySelector('.card-image');
      targetCardImage.classList.add('overlayed');
      if (id === `word-${currentTarget.id.split('-')[1]}`) {
        this.iKnowWord(id, card);
        card.success = true;
      } else if (card.success) {
        this.iDoNotKnowWord(id, card);
        card.success = false;
      }
    }
    if (this.props.know === ERRORS_MAX_COUNT) {
      checkBtn.click();
    }
  }
}
