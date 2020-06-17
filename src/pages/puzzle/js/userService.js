/* eslint-disable no-unsafe-finally */
import { openModal } from './modal';

const createUser = async (user) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  let content;
  try {
    content = await rawResponse.json();
  } catch (e) {
    console.log(e);
    content = rawResponse.status;
  } finally {
    return content;
  }
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
  let content;
  try {
    content = await rawResponse.json();
  } catch (e) {
    console.log(e);
    content = rawResponse.status;
  } finally {
    return content;
  }
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
  try {
    content = await rawResponse.json();
  } catch (e) {
    console.log(e);
    openModal(rawResponse);
    content = rawResponse.status;
  } finally {
    return content;
  }
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
  let content;
  try {
    content = await rawResponse.json();
  } catch (e) {
    console.log(e);
    openModal(rawResponse);
    content = rawResponse.status;
  } finally {
    return content;
  }
};

export {
  createUser, loginUser, updateUserStatistics, getUserStatistics,
};
