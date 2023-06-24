import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetListHausesApi = (token:any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/houses`, {
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

export const HauseDetailApi = (token:string, hauseId:string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/houses/${hauseId}`, {
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

export const GetLocationCitysApi = (token:string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/locations/cities`, {
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

export const GetDistrictByCityIdApi = (token:string, cityId:string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/locations/cites/${cityId}/districts`, {
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

export const GetWardByDistrictIdApi = (token:string, districtId:string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/locations/districts/${districtId}/wards`, {
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

export const CreateNewBuildingApi = (token:string, data:any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/houses`, data, {
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

export const PutBuildingApi = (token:string, houseId:string, data:any) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/houses/${houseId}`, data, {
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

export const DeleteBuildingApi = (token:string, houseId:string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/houses/${houseId}`, {
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
