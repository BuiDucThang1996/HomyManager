import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetListUnitsApi = (token: string, hauseId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/houses/${hauseId}/units`, {
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

export const GetUnitDetailAPi = (token: string, unitId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/units/${unitId}`, {
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

export const CreateNewUnitApi = (token: string, hauseId: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/houses/${hauseId}/units`, data, {
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

export const PutUnitApi = (token: string, unitId: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/units/${unitId}`, data, {
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

export const DeleteUnitApi = (token: string, hauseId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/units/${hauseId}`, {
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
