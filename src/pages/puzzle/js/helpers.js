import { store } from './storage';
import {
  gamePage, homePage, translateBtn, pronounceBtn, pictureBtn,
  roundsCount,  logoutBtn, inputField, roundStatisticsPage, translation, fullStatPage,
} from './constants';
// import { createUser, loginUser, getUserStatistics } from './userService';
// import {  saveStatisticsToStore, } from './statisticsService';

// eslint-disable-next-line
import { startRound, hidePaintingInfo, hideBackgroundPic } from './game';
import { setBackgroundToPuzzlePiece } from './canvas';


const checkIfUserIsSaved = () => {
  if (store.user) {
    // authorization.classList.add('hidden');
    homePage.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
  }
};

const handleRoundsPerLevel = () => {
  document.querySelector('.round-select input').setAttribute('max', roundsCount[store.level - 1]);
};

const checkCheckboxes = () => {
  const autoPronounceCheckbox = document.querySelector('.auto-pronounce-check input');
  const translateCheckbox = document.querySelector('.translate-checkbox');
  const pronounceCheckbox = document.querySelector('.pronounce-checkbox');
  const pictureCheckbox = document.querySelector('.picture-checkbox');

  if (store.isAutoPronounceOn) {
    autoPronounceCheckbox.setAttribute('checked', 'checked');
  }
  if (store.hints.isTranslationOn) {
    translateCheckbox.setAttribute('checked', 'checked');
    translateBtn.classList.remove('disabled');
  } else {
    translateBtn.classList.add('disabled');
  }
  if (store.hints.isPronounceOn) {
    pronounceCheckbox.setAttribute('checked', 'checked');
    pronounceBtn.classList.remove('disabled');
  } else {
    pronounceBtn.classList.add('disabled');
  }
  if (store.hints.isPictureOn) {
    pictureCheckbox.setAttribute('checked', 'checked');
    pictureBtn.classList.remove('disabled');
    pictureBtn.dataset.pictureOn = 1;
  } else {
    pictureBtn.classList.add('disabled');
    pictureBtn.dataset.pictureOn = 0;
  }
};

const playButtonHandler = async () => {
  gamePage.classList.remove('hidden');
  homePage.classList.add('hidden');
  checkCheckboxes();
  handleRoundsPerLevel();
  await startRound();
};

const selectLevelHandler = (event) => {
  store.level = event.target.value;
  localStorage.setItem('level', store.level);
  document.querySelector('.round-select input').classList.remove('disabled');
  handleRoundsPerLevel();
  // sendStatisticsToBackEnd();
};

const chooseRoundHandler = (event) => {
  store.round = event.target.value;
  if (store.passedRounds.includes(`${store.level}.${store.round}`)) {
    document.querySelector('.round-select input').setAttribute('style', 'background-color: grey;');
  } else {
    document.querySelector('.round-select input').setAttribute('style', 'background-color: white;');
  }
  // sendStatisticsToBackEnd();
  localStorage.setItem('round', store.round);
};

const toggleBtn = (el, isEnabled) => {
  if (isEnabled) {
    el.classList.remove('disabled');
  } else {
    el.classList.add('disabled');
  }
};

const checkBoxHandler = async (event) => {
  if (event.target.matches('input')) {
    const checkboxName = event.target.closest('label').innerText;
    const isChecked = +event.target.closest('label').querySelector('input').checked;

    switch (checkboxName) {
      case 'Translate': {
        store.hints.isTranslationOn = isChecked;
        localStorage.setItem('isTranslationOn', +isChecked);
        toggleBtn(translateBtn, isChecked);
        if (isChecked) {
          translation.classList.remove('hidden');
        } else {
          translation.classList.add('hidden');
        }
        break;
      }
      case 'Pronounce': {
        store.hints.isPronounceOn = isChecked;
        localStorage.setItem('isPronounceOn', +isChecked);
        toggleBtn(pronounceBtn, isChecked);
        break;
      }
      case 'Picture': {
        store.hints.isPictureOn = isChecked;
        localStorage.setItem('isPictureOn', +isChecked);
        toggleBtn(pictureBtn, isChecked);
        inputField.querySelector('.game-row').children.forEach((canvas) => {
          setBackgroundToPuzzlePiece(canvas, canvas.dataset.sx,
            canvas.dataset.sy, canvas.dataset.word, store.hints.isPictureOn);
        });
        break;
      }
      default: {
        store.isAutoPronounceOn = isChecked;
        localStorage.setItem('isAutoPronounceOn', +isChecked);
        break;
      }
    }
  }
  // sendStatisticsToBackEnd();
};

// const registerHandler = (event) => {
//   event.preventDefault();
//   if (!logInBtn.classList.contains('hidden')) {
//     logInBtn.classList.add('hidden');
//     signUpBtn.classList.remove('hidden');
//     document.querySelector('.register-msg').innerText = 'Already have account?';
//     document.querySelector('.register-btn a').innerText = 'Log in';
//   } else {
//     logInBtn.classList.remove('hidden');
//     signUpBtn.classList.add('hidden');
//     document.querySelector('.register-msg').innerText = 'No account?';
//     document.querySelector('.register-btn a').innerText = 'Register Now!';
//   }
// };

// const loginHandler = async () => {
//   if (store.user) {
//     authorization.classList.add('hidden');
//     homePage.classList.remove('hidden');
//     logoutBtn.classList.remove('hidden');
//   } else {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const newUser = { email, password };
//     const loggedInUser = await loginUser(newUser);
//     if (loggedInUser.userId) {
//       errorMsg.innerText = '';
//       const user = {
//         id: loggedInUser.userId,
//         token: loggedInUser.token,
//       };
//       store.user = user;
//       const statistics = await getUserStatistics(store.user.id, store.user.token);
//       if (statistics.optional) {
//         saveStatisticsToStore(statistics);
//       } else {
//         await sendInitialStatisticsToBackEnd();
//       }
//       localStorage.setItem('user', JSON.stringify(user));
//       authorization.classList.add('hidden');
//       homePage.classList.remove('hidden');
//       logoutBtn.classList.remove('hidden');
//     } else {
//       errorMsg.innerText = 'Wrong email or password';
//     }
//   }
// };

// const signupHandler = async () => {
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const newUser = { email, password };
//   const createdUser = await createUser(newUser);
//   if (createdUser.id) {
//     errorMsg.innerText = '';
//     const loggedInUser = await loginUser(newUser);
//     const user = {
//       id: loggedInUser.userId,
//       token: loggedInUser.token,
//     };
//     store.setInitialStore(user);
//     sendInitialStatisticsToBackEnd();
//     localStorage.setItem('user', JSON.stringify(user));
//     authorization.classList.add('hidden');
//     homePage.classList.remove('hidden');
//     logoutBtn.classList.remove('hidden');
//   } else {
//     switch (createdUser) {
//       case 417: {
//         errorMsg.innerText = 'This account already exists. Please, log in.';
//         break;
//       }
//       default: {
//         errorMsg.innerText = 'Password should contain at least 8 symbols: uppercase letter, lowercase letter, a digit and one special characters: + -_ @ $!% *? & #.,;: [] {}.';
//       }
//     }
//   }
// };


const logoutHandler = (event) => {
  event.preventDefault();
  // authorization.classList.remove('hidden');
  homePage.classList.remove('hidden');
  gamePage.classList.add('hidden');
  translation.classList.add('hidden');
  hidePaintingInfo();
  hideBackgroundPic();
  fullStatPage.classList.add('hidden');
  roundStatisticsPage.classList.add('hidden');
  store.setInitialStore(null);
  localStorage.clear();
};


export {
  playButtonHandler, selectLevelHandler, chooseRoundHandler, checkBoxHandler, 
  checkCheckboxes, handleRoundsPerLevel, 
  logoutHandler, checkIfUserIsSaved,
};
