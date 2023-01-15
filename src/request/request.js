import axios from 'axios';

// const BASE_URL = 'https://sistema2s-api.onrender.com';
const BASE_URL = 'http://localhost:5000';

export function postSignin(body) {
  const promise = axios.post(`${BASE_URL}/signin`, body);
  return promise;
}
