import { DomGen } from 'Service/DomGen';
import { ServerAPI } from 'Service/ServerAPI';

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
          { tag: 'input', className: 'input', placeholder: 'email', isAccess: 'email' },
          { tag: 'input', className: 'input', type: 'password', placeholder: 'password', isAccess: 'password' },
          {
            tag: 'div', className: 'buttons-line', children: [
              { tag: 'button', className: 'button', innerText: 'Login', isAccess: 'login' },
              { tag: 'button', className: 'button', innerText: 'Cancel', isAccess: 'cancel' },
            ]
          }
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
      const user = {
        email: popup.email.value,
        password: popup.password.value
      }
      removePopup();
      resolve(user);
    };

    const cancelAuth = () => {
      removePopup();
      reject({ message: 'Пользователь отказался от логинизации ¯\_(ツ)_/¯' });
    };

    popup.login.addEventListener('click', tryLogin);
    popup.cancel.addEventListener('click', cancelAuth);
  });
}
