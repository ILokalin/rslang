const dataTransfer = () => {
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
      ).innerText;
      event.currentTarget.querySelector('.card-content').classList.add('hidden');
      image.style.opacity = 0;

      //card.classList.remove('draggable');
      card.style.pointerEvents = 'none';
    });
  });
};

export { dataTransfer };
