import { DomGen } from 'Service/DomGen';
import { closeAuthPopup, authPopupState, setUserData, authReportStore } from 'Service/AppState';
import { PASSWORD_REGEXP, EMAIL_REGEXP } from './const';

export class AuthPopup {
  constructor() {
    this.sendUserData = this.sendUserData.bind(this);

    this.body = document.body;
  }

  init() {
    this.popup = DomGen({
      name: 'auth-popup',
      tag: 'div',
      children: [
        {
          tag: 'div',
          className: 'menu',
          children: [
            { tag: 'h2', className: 'title', innerText: 'Login/Register' },
            { tag: 'p', className: 'describe', isAccess: 'reportLine' },
            {
              tag: 'div', classAdd: 'col,s12', children: [
                {
                  tag: 'div', classAdd: 'input-field,col,s12', children: [
                    {
                      tag: 'input',
                      id: 'email',
                      classAdd: 'validate',
                      type: 'email',
                      isAccess: 'email',
                    },
                    {
                      tag: 'label',
                      for: 'email',
                      innerText: 'Email'
                    }
                  ]
                }
              ]
            },
            {
              tag: 'div', classAdd: 'col,s12', children: [
                {
                  tag: 'div', classAdd: 'input-field,col,s12', children: [
                    {
                      tag: 'input',
                      id: 'password',
                      classAdd: 'validate,white',
                      type: 'password',
                      placeholder: 'password',
                      isAccess: 'password',
                    },
                    {
                      tag: 'label',
                      for: 'password',
                      innerText: 'Password'
                    }
                  ]
                }
              ]
            },
            {
              tag: 'p',
              className: 'password-hint',
              innerText:
                'the password must contain at least one lowercase character, one uppercase, one special character, one digit',
            },
            {
              tag: 'div',
              className: 'buttons-line',
              children: [
                {
                  tag: 'button',
                  className: 'button',
                  classAdd: 'waves-effect,waves-light,btn',
                  innerText: 'Register',
                  value: 'register',
                  isAccess: 'register',
                  disabled: true,
                },
                {
                  tag: 'button',
                  className: 'button',
                  classAdd: 'waves-effect,waves-light,btn',
                  innerText: 'Login',
                  isAccess: 'login',
                },
                {
                  tag: 'button',
                  className: 'button',
                  classAdd: 'waves-effect,waves-light,btn',
                  innerText: 'Cancel',
                  isAccess: 'cancel'
                },
              ],
            },
          ],
        },
      ],
    });

    authReportStore.watch((reportMessage) => {
      this.popup.reportLine.innerText = reportMessage;
    });

    authPopupState.watch((state) => {
      if (state) {
        this.openPopup();
      } else {
        this.closePopup();
      }
    });

    this.popup.cancel.addEventListener('click', this.cancelAuth);
    this.popup.login.addEventListener('click', this.sendUserData);
    this.popup.register.addEventListener('click', this.showRegisterForm);
  }

  openPopup() {
    this.body.append(this.popup.block);
  }

  closePopup() {
    this.popup.block.remove();
  }

  cancelAuth() {
    closeAuthPopup();
  }

  sendUserData() {
    const isValidate =
      EMAIL_REGEXP.test(this.popup.email.value) && PASSWORD_REGEXP.test(this.popup.password.value);
    const user = {
      email: this.popup.email.value,
      password: this.popup.password.value,
    };

    if (isValidate) {
      setUserData(user);
    } else {
      if (!EMAIL_REGEXP.test(this.popup.email.value)) {
        this.popup.reportLine.innerText = 'Please input correct email address';
      }
      if (!PASSWORD_REGEXP.test(this.popup.password.value)) {
        this.popup.reportLine.innerText = 'Please use correct password format. See below.';
      }
    }
  }

  showRegisterForm() {
    this.popup.reportLine.innerText = 'development in progress';
  }
}
