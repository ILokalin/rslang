import 'materialize-css';
import { DomGen } from 'Service/DomGen';
import { closeAuthPopup, authPopupState, setUserData, authReportStore } from 'Service/AppState';
import { regExp, authMessages } from './AuthPopupConst';
import { authPopupForm } from './AuthPopupForm';

export class AuthPopup {
  constructor() {
    this.formIsSubmit = this.formIsSubmit.bind(this);
    this.formToLogin = this.formToLogin.bind(this);
    this.formToRegister = this.formToRegister.bind(this);
    this.body = document.body;
  }

  init() {
    this.popup = DomGen(authPopupForm);

    authReportStore.watch((reportMessage = authMessages.promptLogin) => {
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
    this.popup.toggleLogin.addEventListener('click', this.formToLogin);
    this.popup.toggleRegister.addEventListener('click', this.formToRegister);
    this.popup.form.addEventListener('submit', this.formIsSubmit);
  }

  formToLogin() {
    const { header, nameLine, register, login, toggleBlockLogin, toggleBlockRegister } = this.popup;

    header.innerText = authMessages.login;
    nameLine.style.display = 'none';
    register.style.display = 'none';
    login.style.display = 'block';
    toggleBlockLogin.style.display = 'none';
    toggleBlockRegister.style.display = 'block';
    this.isFormRegister = false;
    this.popup.reportLine.innerText = authMessages.promptLogin;
  }

  formToRegister() {
    const { header, nameLine, register, login, toggleBlockLogin, toggleBlockRegister } = this.popup;

    header.innerText = authMessages.register;
    nameLine.style.display = 'block';
    register.style.display = 'block';
    login.style.display = 'none';
    toggleBlockLogin.style.display = 'block';
    toggleBlockRegister.style.display = 'none';
    this.isFormRegister = true;
    this.popup.reportLine.innerText = authMessages.promptRegister;
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

  formIsSubmit(event) {
    event.preventDefault();

    const isValidate =
      regExp.email.test(this.popup.email.value) &&
      regExp.password.test(this.popup.password.value) &&
      (!this.isFormRegister || regExp.name.test(this.popup.name.value));

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
      if (!regExp.email.test(this.popup.email.value)) {
        this.popup.reportLine.innerText = authMessages.correctEmail;
      }
      if (!regExp.password.test(this.popup.password.value)) {
        this.popup.reportLine.innerText = authMessages.correctPassword;
      }
      if (this.isFormRegister && !regExp.name.test(this.popup.name.value)) {
        this.popup.reportLine.innerText = authMessages.correctName;
      }
    }
  }
}
