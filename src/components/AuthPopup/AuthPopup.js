import { DomGen } from 'Service/DomGen';
import { closeAuthPopup, authPopupState, setUserData, authReportStore } from 'Service/AppState';
import { AuthPopConst } from './AuthPopupConst';
import 'materialize-css';

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
          className: 'authorization',
          children: [
            {
              tag: 'div',
              id: 'login-page',
              classAdd: 'row',
              children: [
                {
                  tag: 'div',
                  classAdd: 'col,s12,z-depth-6,card-panel',
                  children: [
                    { tag: 'h2', innerText: 'Login/Register' },
                    { tag: 'p', isAccess: 'reportLine' },
                    {
                      tag: 'form',
                      classAdd: 'login-form',
                      children: [
                        { tag: 'div', classAdd: 'row' },
                        {
                          tag: 'div',
                          classAdd: 'row',
                          children: [
                            {
                              tag: 'div',
                              classAdd: 'input-field,col,s12',
                              children: [
                                {
                                  tag: 'i',
                                  classAdd: 'material-icons,prefix',
                                  innerText: 'mail_outline',
                                },
                                {
                                  tag: 'input',
                                  classAdd: 'validate',
                                  id: 'email',
                                  type: 'email',
                                  isAccess: 'email',
                                },
                                {
                                  tag: 'label',
                                  for: 'email',
                                  dataError: 'wrong',
                                  dataSuccess: 'right',
                                  innerText: 'Email',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          tag: 'div',
                          classAdd: 'row',
                          children: [
                            {
                              tag: 'div',
                              classAdd: 'input-field,col,s12',
                              children: [
                                {
                                  tag: 'i',
                                  classAdd: 'material-icons,prefix',
                                  innerText: 'lock_outline',
                                },
                                {
                                  tag: 'input',
                                  classAdd: 'validate',
                                  id: 'password',
                                  type: 'password',
                                  isAccess: 'password',
                                },
                                {
                                  tag: 'label',
                                  for: 'password',
                                  dataError: 'wrong',
                                  dataSuccess: 'right',
                                  innerText: 'Password',
                                },
                              ],
                            },
                          ],
                        },
                        {
                          tag: 'div',
                          classAdd: 'row',
                          children: [
                            {
                              tag: 'div',
                              classAdd: 'input-field,col,s12',
                              children: [
                                {
                                  tag: 'button',
                                  type: 'button',
                                  href: '#',
                                  classAdd: 'login-btn,btn,waves-effect,waves-light,col,s12',
                                  innerText: 'Login',
                                  isAccess: 'login',
                                },
                                {
                                  tag: 'button',
                                  type: 'button',
                                  href: '#',
                                  classAdd: 'cancel-btn,btn,waves-effect,waves-light,col,s12',
                                  innerText: 'Cancel',
                                  isAccess: 'cancel',
                                },
                              ],
                            },
                          ],
                        },
                        // <div class="row">
                        //       <div class="error-message"></div>
                        //   </div>
                        //   <div class="row">
                        //       <div class="input-field col s6 m6 l6">
                        //           <p class="margin medium-small register-msg">No account?</p>
                        //           <p class="margin medium-small register-btn"><a href="">Register Now!</a></p>
                        //       </div>
                        //   </div>
                      ],
                    },
                  ],
                },
              ],
            },

            //         'the password must contain at least one lowercase character, one uppercase, one special character, one digit',
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
    // this.popup.register.addEventListener('click', this.showRegisterForm);
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
      AuthPopConst.EMAIL_REGEXP.test(this.popup.email.value) &&
      AuthPopConst.PASSWORD_REGEXP.test(this.popup.password.value);
    const user = {
      email: this.popup.email.value,
      password: this.popup.password.value,
    };

    if (isValidate) {
      setUserData(user);
    } else {
      if (!AuthPopConst.EMAIL_REGEXP.test(this.popup.email.value)) {
        this.popup.reportLine.innerText = 'Please input correct email address';
      }
      if (!AuthPopConst.PASSWORD_REGEXP.test(this.popup.password.value)) {
        this.popup.reportLine.innerText = 'Please use correct password format. See below.';
      }
    }
  }

  showRegisterForm() {
    this.popup.reportLine.innerText = 'development in progress';
  }
}
