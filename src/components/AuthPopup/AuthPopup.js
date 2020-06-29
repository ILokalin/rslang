import 'materialize-css';
import { DomGen } from 'Service/DomGen';
import { closeAuthPopup, authPopupState, setUserData, authReportStore } from 'Service/AppState';
import { AuthPopConst } from './AuthPopupConst';
import { AuthPopupForm } from './AuthPopupForm';

export class AuthPopup {
  constructor() {
    this.sendUserData = this.sendUserData.bind(this);
    this.formToLogin = this.formToLogin.bind(this);
    this.formToRegister = this.formToRegister.bind(this);
    this.body = document.body;
  }

  init() {
    this.popup = DomGen(AuthPopupForm);

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
    this.popup.toggleLogin.addEventListener('click', this.formToLogin);
    this.popup.toggleRegister.addEventListener('click', this.formToRegister);
    this.popup.register.addEventListener('click', this.sendUserData);
  }

  formToLogin() {
    const { header, nameLine, register, login, toggleBlockLogin, toggleBlockRegister } = this.popup;

    header.innerText = 'Login';
    nameLine.style.display = 'none';
    register.style.display = 'none';
    login.style.display = 'block';
    toggleBlockLogin.style.display = 'none';
    toggleBlockRegister.style.display = 'block';
    this.isFormRegister = false;
  }

  formToRegister() {
    const { header, nameLine, register, login, toggleBlockLogin, toggleBlockRegister } = this.popup;

    header.innerText = 'Register';
    nameLine.style.display = 'block';
    register.style.display = 'block';
    login.style.display = 'none';
    toggleBlockLogin.style.display = 'block';
    toggleBlockRegister.style.display = 'none';
    this.isFormRegister = true;
  }

  openPopup() {
    this.formToLogin();
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
      AuthPopConst.emailRegexp.test(this.popup.email.value) &&
      AuthPopConst.passwordRegexp.test(this.popup.password.value) &&
      (!this.isFormRegister || AuthPopConst.nameRegexp.test(this.popup.name.value));

    const user = {
      email: this.popup.email.value,
      password: this.popup.password.value,
    };

    if (this.isFormRegister) {
      user.statusRegister = this.isFormRegister;
      user.name = this.popup.name.value;
    }

    if (isValidate) {
      setUserData(user);
    } else {
      if (!AuthPopConst.emailRegexp.test(this.popup.email.value)) {
        this.popup.reportLine.innerText = 'Please input correct email address';
      }
      if (!AuthPopConst.passwordRegexp.test(this.popup.password.value)) {
        this.popup.reportLine.innerText = 'Please use correct password format. See below.';
      }
      if (this.isFormRegister && !AuthPopConst.nameRegexp.test(this.popup.name.value)) {
        this.popup.reportLine.innerText = 'Please use one or more letters for name';
      }
    }
  }
}
