const DATAHOMEURL = 'http://45.77.176.188:5012/dashboard/summarizev1';
import axios from 'axios';

export const GetHomeScreenInforApi = (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${DATAHOMEURL}`, {
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
