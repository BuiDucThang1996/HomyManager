import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetListInvoicesApi = (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/invoices`, {
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

export const GetInvoiceDetailApi = (token: string, invoiceId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/invoices/${invoiceId}`, {
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
export const DeleteInvoiceApi = (token: string, invoiceId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/invoices/${invoiceId}`, {
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

export const PutInvoiceConfirmPaymentApi = (
  token: string,
  invoiceId: string,
) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/invoices/${invoiceId}/payment-confirm`, null, {
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

export const PutInvoiceRejectApi = (token: string, invoiceId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/invoices/${invoiceId}/reject`, null, {
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
