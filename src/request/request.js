import axios from 'axios';

const BASE_URL = 'https://api-sistema-2s.onrender.com';

export function postSignin(body) {
  const promise = axios.post(`${BASE_URL}/signin`, body);
  return promise;
}

export function getUsers(authorization) {
  const promise = axios.get(`${BASE_URL}/users`, {
    headers: {
      authorization
    }
  });
  return promise;
}
