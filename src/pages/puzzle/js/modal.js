const openModal = (res) => {
  // eslint-disable-next-line no-undef
  const modal = M.Modal.getInstance(document.querySelector('.modal'));
  document.querySelector('.error-text').innerText = `API request failed with error ${res.status}. 
    ${res.status === 403 ? 'Request limit reached.' : ''}`;
  modal.open();
};

// eslint-disable-next-line import/prefer-default-export
export { openModal }