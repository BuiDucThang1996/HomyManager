import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const AuthenticationAPi = (password:string, username:string) => {
  let data = {
    password: password,
    username: username,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/auth`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const AuthenticationRegisterAPi = (data:any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/auth/register`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
