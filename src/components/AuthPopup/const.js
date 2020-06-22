export const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[!@#$%^&+_*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&_*]{8,}/;
export const EMAIL_REGEXP = /.+@.+\..+/;
export const CANCEL_USER = {
  status: 0,
  message: 'User refused',
  name: 'Unknown'
}