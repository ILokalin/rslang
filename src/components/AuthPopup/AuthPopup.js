import { DomGen } from 'Service/DomGen';

export function AuthPopup() {
  const { body } = document;
  const popup = DomGen({
    name: 'auth-popup',
    tag: 'div',
    children: [
      {
        tag: 'div',
        className: 'menu',
        children: [
          { tag: 'input', className: 'input', placeholder: 'email' },
          { tag: 'input', className: 'input', placeholder: 'password' },
          { tag: 'button', className: 'button', innerText: 'Login', isAccess: 'login' },
          { tag: 'button', className: 'button', innerText: 'Cancel', isAccess: 'cancel' },
        ],
      },
    ],
  });

  body.append(popup.block);

  const removePopup = () => {
    popup.block.remove();
  };

  return new Promise((resolve, reject) => {
    const tryLogin = () => {
      removePopup();
      resolve();
    };

    const cancelAuth = () => {
      removePopup();
      reject();
    };

    popup.login.addEventListener('click', tryLogin);
    popup.cancel.addEventListener('click', cancelAuth);
  });
}
