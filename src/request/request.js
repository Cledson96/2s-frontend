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

export function postMotoboys(body) {
  const promise = axios.post(`${BASE_URL}/signup_motoboys`, body);
  return promise;
}

export function postUsers(body) {
  const promise = axios.post(`${BASE_URL}/signup_users`, body);
  return promise;
}

export function getMotoboys(authorization) {
  const promise = axios.get(`${BASE_URL}/motoboys`, {
    headers: {
      authorization
    }
  })
  return promise;
}

export function getClients(authorization) {
  const promise = axios.get(`${BASE_URL}/clients`, {
    headers: {
      authorization
    }
  })
  return promise;
}

export function postOrders(body,authorization) {
  const promise = axios.post(`${BASE_URL}/orders`, body,{
    headers: {
      authorization
    }
    });
  return promise;
}

export function postClient(body,authorization) {
  const promise = axios.post(`${BASE_URL}/signup_client`, body,{
    headers: {
      authorization
    }
    });
  return promise;
}