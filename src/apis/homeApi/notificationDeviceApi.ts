import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetNotificationDeviceApi = (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/notification-devices`, {
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

export const PostNotificationDeviceApi = (token: string,data:any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/notification-devices`,data, {
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

export const DeleteNotificationFromDeviceApi = (token: string,deviceInfo:string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/notification-devices`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          device: deviceInfo,
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

export const DeleteNotificationDeviceApi = (token: string,id:string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/notification-devices/${id}`, {
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
