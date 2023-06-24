import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetListTenantsApi = (token:string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/tenants`, {
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

export const CreateNewTenantApi = (token:string, data:any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/tenants`, data, {
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

export const GetTenantDetailApi = (token:string, tenantId:string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/tenants/${tenantId}`, {
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

export const PutTenantApi = (token:any, data:any, tenantId:string) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/tenants/${tenantId}`, data, {
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

export const DeleteTenantApi = (token:any, tenantId:string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/tenants/${tenantId}`, {
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
