import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetAllBanksApi = (token: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/banks`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

export const GetBankAccountsApi = (token: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/bank-accounts`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

export const CreateBankAccountApi = (token: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/bank-accounts`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

export const GetBankAccountDetailApi = (
  token: string,
  bankAccountId: string,
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/bank-accounts/${bankAccountId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
