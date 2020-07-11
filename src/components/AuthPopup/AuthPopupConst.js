export const regExp = {
  password: /(?=.*[0-9])(?=.*[!@#$%^&+_*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&_*]{8,}/,
  email: /.+@.+\..+/,
  name: /[А-Яа-яA-Za-z]/,
};

export const messages = {
  login: 'Вход',
  correctEmail: 'Пожалуйста укажите корректный адрес эл.почты.',
  correctPassword: 'Используйте корректный формат для пароля.',
  correctName: 'Имя должно содержать не менее одной буквы.',
};
