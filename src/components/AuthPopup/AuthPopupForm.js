export const AuthPopupForm = {
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
                  innerText: 'Login',
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
                  children: [
                    {
                      tag: 'div',
                      classAdd: 'row,input-wrapper',
                      children: [
                        {
                          tag: 'div',
                          classAdd: 'input-field,first-line,col,s12',
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
                      classAdd: 'row,input-wrapper',
                      isAccess: 'nameLine',
                      children: [
                        {
                          tag: 'div',
                          classAdd: 'input-field,first-line,col,s12',
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
                              innerText: 'Name',
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
                      classAdd: 'row,input-wrapper',
                      children: [
                        {
                          tag: 'div',
                          classAdd: 'input-field,col,buttons-wrapper,s12',
                          children: [
                            {
                              tag: 'div',
                              class: 'col s6',
                              isAccess: 'toggleBlockRegister',
                              children: [
                                {
                                  tag: 'p',
                                  classAdd: 'margin,medium-small,register-msg',
                                  innerText: 'No account?',
                                },
                                {
                                  tag: 'p',
                                  classAdd: 'margin,medium-small,register-btn',
                                  children: [
                                    {
                                      tag: 'button',
                                      type: 'button',
                                      className: 'button,button--link',
                                      innerText: 'Register Now!',
                                      isAccess: 'toggleRegister',
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              tag: 'div',
                              class: 'col s6',
                              isAccess: 'toggleBlockLogin',
                              children: [
                                {
                                  tag: 'p',
                                  classAdd: 'margin,medium-small,register-msg',
                                  innerText: 'Have account?',
                                },
                                {
                                  tag: 'p',
                                  classAdd: 'margin,medium-small,register-btn',
                                  children: [
                                    {
                                      tag: 'button',
                                      type: 'button',
                                      className: 'button,button--link',
                                      innerText: 'Sign in!',
                                      isAccess: 'toggleLogin',
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              tag: 'button',
                              type: 'button',
                              href: '#',
                              classAdd: 'login-btn,btn,waves-effect,waves-light,col,s3',
                              innerText: 'Register',
                              isAccess: 'register',
                            },
                            {
                              tag: 'button',
                              type: 'button',
                              href: '#',
                              classAdd: 'login-btn,btn,waves-effect,waves-light,col,s3',
                              innerText: 'Login',
                              isAccess: 'login',
                            },
                            {
                              tag: 'button',
                              type: 'button',
                              href: '#',
                              className: 'button',
                              classAdd:
                                'cancel-btn,btn,waves-effect,waves-light,teal,lighten-2,col,s3',
                              innerText: 'Cancel',
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
