import { DomGen } from 'Service/DomGen';
import { ServerAPI } from 'Service/ServerAPI';

const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[!@#$%^&+_*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&_*]{8,}/;
const EMAIL_REGEXP = /.+@.+\..+/;
const CANCEL_USER = {
  status: 0,
  message: 'User refused',
  name: 'Unknown'
}

export function AuthPopup() {
  const { body } = document;
  const serverAPI = new ServerAPI;

  const popup = DomGen({
    name: 'auth-popup',
    tag: 'div',
    children: [
      {
        tag: 'div',
        className: 'menu',
        children: [
          { tag: 'h2', className: 'title', innerText: 'Login/Register'},
          { tag: 'p', className: 'describe', innerText: 'Please enter email and password', isAccess: 'reportLine'},
          { tag: 'input', className: 'input', placeholder: 'email', isAccess: 'email' },
          { tag: 'input', className: 'input', type: 'password', placeholder: 'password', isAccess: 'password' },
          { tag: 'p', className: 'password-hint', innerText: 'the password must contain at least one lowercase character, one uppercase, one special character, one digit'},
          {
            tag: 'div', className: 'buttons-line', children: [
              { tag: 'button', className: 'button', innerText: 'Login', isAccess: 'login' },
              { tag: 'button', className: 'button', innerText: 'Register', value: 'register', isAccess: 'register', disabled: true},
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
    const tryLogin = ({ target }) => {
      const isRegister = target.value === 'register';
      const isValidate = EMAIL_REGEXP.test(popup.email.value) && PASSWORD_REGEXP.test(popup.password.value);
      const user = {
        email: popup.email.value,
        password: popup.password.value,
      }
      
      if (isValidate) {
        if (isRegister) {
          serverAPI.apiUserCreate(user)
            .then(
              () => {
                return serverAPI.apiUserSignIn(user); 
              }
            )
            .then(
              () => {
                removePopup();
                resolve();
              },
              (rejectReport) => {
                isErrorEmailOrPassword = rejectReport === 422 || rejectReport === 403;
                popup.reportLine.innerText = isErrorEmailOrPassword ? 'Incorrect e-mail or password' : rejectReport.status;
              }
            )
        } else {
          serverAPI.apiUserSignIn(user)
            .then(
              () => {
                removePopup();
                resolve();
              },
              (rejectReport) => {
                popup.reportLine.innerText = rejectReport.status === 403 ? 'Incorrect e-mail or password' : rejectReport.message;
              }
            )
        }
      } else {
        if (!EMAIL_REGEXP.test(popup.email.value)) {
          popup.reportLine.innerText = 'Please input correct email address';
        }
        if (!PASSWORD_REGEXP.test(popup.password.value)) {
          popup.reportLine.iinerText = 'Please use correct password format. See below.';
        }
      }
    };

    const cancelAuth = () => {
      removePopup();
      reject(CANCEL_USER);
    };

    popup.login.addEventListener('click', tryLogin);
    // popup.register.addEventListener('click', tryLogin);
    popup.cancel.addEventListener('click', cancelAuth);
  });
}
