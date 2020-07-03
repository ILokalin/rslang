export const openModal = (message) => {
  // eslint-disable-next-line no-undef
  const modal = M.Modal.getInstance(document.querySelector('.modal'));
  document.querySelector('.error-text').innerText = message;
  modal.open();
};
