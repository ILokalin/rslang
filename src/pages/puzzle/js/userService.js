/* eslint-disable no-unsafe-finally */
import { openModal } from './modal';

const processResponce = async (response) => {
  let content;
  try {
    content = await response.json();
  } catch (e) {
    console.log(e);
    openModal(response);
    content = response.status;
  } finally {
    return content;
  }
}

const createUser = async (user) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return await processResponce(rawResponse);
};

// Logins a user and returns a JWT-token
const loginUser = async (user) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
return await processResponce(rawResponse);
};

// user statistics
const updateUserStatistics = async (userId, token, statistics) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  });
  let content;
  return await processResponce(rawResponse);
};

const getUserStatistics = async (userId, token) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await processResponce(rawResponse);
};

//export {
//  createUser, loginUser, updateUserStatistics, getUserStatistics,
//};
