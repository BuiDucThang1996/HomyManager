import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetListServicesApi = (token: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/services`, {
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

export const GetServiceDetailAPi = (token: string, serviceId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/services/${serviceId}`, {
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

export const CreateNewService = (token: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/services`, data, {
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

export const PutServiceApi = (token: string, data: any, serviceId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/services/${serviceId}`, data, {
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

export const DeleteServiceApi = (token: string, serviceId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/services/${serviceId}`, {
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
