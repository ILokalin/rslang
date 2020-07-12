export const authPopupForm = {
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
                {
                  tag: 'h2',
                  classAdd: 'center-align',
                  className: 'title',
                  innerText: 'Вход',
                  isAccess: 'header',
                },
                {
                  tag: 'p',
                  classAdd: 'center-align,error-message',
                  isAccess: 'reportLine',
                },
                {
                  tag: 'form',
                  classAdd: 'login-form',
                  isAccess: 'form',
                  children: [
                    {
                      tag: 'div',
                      classAdd: 'row,input-wrapper',
                      children: [
                        {
                          tag: 'div',
                          classAdd: 'input-field,col,s12',
                          className: 'line',
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
                              innerText: 'Эл.почта',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      classAdd: 'row,input-wrapper',
                      isAccess: 'nameLine',
                      children: [
                        {
                          tag: 'div',
                          classAdd: 'input-field,first-line,col,s12',
                          className: 'line',
                          children: [
                            {
                              tag: 'i',
                              classAdd: 'material-icons,prefix',
                              innerText: 'person_outline',
                            },
                            {
                              tag: 'input',
                              classAdd: 'validate',
                              id: 'name',
                              type: 'text',
                              isAccess: 'name',
                            },
                            {
                              tag: 'label',
                              for: 'name',
                              dataError: 'wrong',
                              dataSuccess: 'right',
                              innerText: 'Ваше имя',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      classAdd: 'row,input-wrapper',
                      children: [
                        {
                          tag: 'div',
                          classAdd: 'input-field,col,s12',
                          className: 'line',
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
                              innerText: 'Пароль',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      classAdd: 'row,input-wrapper',
                      children: [
                        {
                          tag: 'p',
                          classAdd: 'center-align',
                          className: 'info-message',
                          isAccess: 'infoLine',
                          innerText:
                            'Пароль должен содержать не менее одной цифры, прописной и строчной буквы, спец.символ. Длинна не менее 8 символов.',
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      classAdd: 'row',
                      className: 'entry-wrapper',
                      children: [
                        {
                          tag: 'div',
                          classAdd: 'input-field,col,buttons-wrapper,s12',
                          children: [
                            {
                              tag: 'div',
                              classAdd: 'col,s4,m6',
                              isAccess: 'toggleBlockRegister',
                              children: [
                                {
                                  tag: 'p',
                                  classAdd: 'margin,medium-small,register-msg',
                                  innerText: 'Нет аккаунта?',
                                },
                                {
                                  tag: 'div',
                                  classAdd: 'margin,medium-small,register-btn',
                                  children: [
                                    {
                                      tag: 'button',
                                      type: 'button',
                                      className: 'button,button--link',
                                      innerText: 'Регистрация!',
                                      isAccess: 'toggleRegister',
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              tag: 'div',
                              classAdd: 'col,s4,m6',
                              isAccess: 'toggleBlockLogin',
                              children: [
                                {
                                  tag: 'p',
                                  classAdd: 'margin,medium-small,register-msg',
                                  innerText: 'Есть аккаунт?',
                                },
                                {
                                  tag: 'p',
                                  classAdd: 'margin,medium-small,register-btn',
                                  children: [
                                    {
                                      tag: 'button',
                                      type: 'button',
                                      className: 'button,button--link',
                                      innerText: 'Вход!',
                                      isAccess: 'toggleLogin',
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              tag: 'button',
                              type: 'button',
                              classAdd: 'login-btn,btn,waves-effect,waves-light,col,s3',
                              innerText: 'Регистрация',
                              isAccess: 'register',
                            },
                            {
                              tag: 'button',
                              type: 'button',
                              classAdd: 'login-btn,btn,waves-effect,waves-light,col,s3',
                              innerText: 'Вход',
                              isAccess: 'login',
                            },
                            {
                              tag: 'button',
                              type: 'button',
                              className: 'button',
                              classAdd:
                                'cancel-btn,btn,waves-effect,waves-light,teal,lighten-2,col,s3',
                              innerText: 'Отменить',
                              isAccess: 'cancel',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
