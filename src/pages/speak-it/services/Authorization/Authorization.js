import { logInBtn, signUpBtn, registerMsgEl, registerBtn } from '../../data/auth-constants';

export default class Authorization {
  constructor() {
    registerBtn.addEventListener('click', Authorization.registerHandler);
  }

  static registerHandler(event) {
    event.preventDefault();
    if (!logInBtn.classList.contains('hidden')) {
      logInBtn.classList.add('hidden');
      signUpBtn.classList.remove('hidden');
      registerMsgEl.innerText = 'Already have account?';
      registerBtn.children[0].innerText = 'Log in';
    } else {
      logInBtn.classList.remove('hidden');
      signUpBtn.classList.add('hidden');
      registerMsgEl.innerText = 'No account?';
      registerBtn.children[0].innerText = 'Register Now!';
    }
  }
}
