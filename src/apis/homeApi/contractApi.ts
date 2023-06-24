import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetListContractsApi = (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/contracts`, {
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

export const GetContractDetailAPi = (token: string, contractId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/contracts/${contractId}`, {
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

export const CreateNewContractApi = (token: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/contracts`, data, {
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
export const LiquidationContractApi = (token: string, contractId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/contracts/${contractId}/close`, null, {
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

export const GetActiveContractApi = (token: string, unitId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/units/${unitId}/contracts/getActiveContract`, {
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

export const PutContractAPi = (
  token: string,
  data: any,
  contractId: string,
) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/contracts/${contractId}`, data, {
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

export const DeleteContractAPi = (token: string, serviceId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/contracts/${serviceId}`, {
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
