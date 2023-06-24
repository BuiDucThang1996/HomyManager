import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const PostImageBuildingApi = (
  token: string,
  hauseId: string,
  hauseImages: any,
) => {
  let formHause = new FormData();
  for (let i = 0; i < hauseImages.length; i++) {
    let image = hauseImages[i];
    formHause.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/houses/${hauseId}/files/upload`, formHause, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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

export const PostImageUnitApi = (
  token: string,
  unitId: string,
  unitImages: any,
) => {
  let formUnit = new FormData();
  for (let i = 0; i < unitImages.length; i++) {
    let image = unitImages[i];
    formUnit.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/units/${unitId}/files/upload`, formUnit, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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
export const PostInvoiceServiceFilesUploadApi = (
  token: string,
  id: string,
  invoiceImages: any,
) => {
  let formInvoice = new FormData();
  for (let i = 0; i < invoiceImages.length; i++) {
    let image = invoiceImages[i];
    formInvoice.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASEURL}/invoice-service-closings/${id}/files/upload`,
        formInvoice,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
export const PostImageUserApi = (
  token: string,
  userId: string,
  userImages: any,
) => {
  let formUser = new FormData();
  for (let i = 0; i < userImages.length; i++) {
    let image = userImages[i];
    formUser.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/users/${userId}/avatar/upload`, formUser, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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

export const PostImageIdentityApi = (
  token: string,
  userId: string,
  identityImages: any,
) => {
  let formUser = new FormData();
  for (let i = 0; i < identityImages.length; i++) {
    let image = identityImages[i];
    formUser.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/users/${userId}/identity/upload`, formUser, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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

export const PostImageContractApi = (
  token: string,
  contractId: string,
  ContractImages: any,
) => {
  let formContract = new FormData();
  for (let i = 0; i < ContractImages.length; i++) {
    let image = ContractImages[i];
    formContract.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/contracts/${contractId}/files/upload`, formContract, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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

export const PostImageInvoiceApi = (
  token: string,
  invoiceId: string,
  invoiceImages: any,
) => {
  let formInvoice = new FormData();
  for (let i = 0; i < invoiceImages.length; i++) {
    let image = invoiceImages[i];
    formInvoice.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASEURL}/invoices/${invoiceId}/files/upload-service`,
        formInvoice,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const PostImageInvoiceUploadPaymentApi = (
  token: string,
  invoiceId: string,
  invoiceImages: any,
) => {
  let formInvoice = new FormData();
  for (let i = 0; i < invoiceImages.length; i++) {
    let image = invoiceImages[i];
    formInvoice.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASEURL}/invoices/${invoiceId}/files/upload-payment`,
        formInvoice,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const DeleteImageApi = (token: string, imageId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/files/${imageId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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

const getFileName = (file: any) => {
  if (file.name !== undefined) {
    return file.name;
  } else if (file.filename !== undefined && file.filename !== null) {
    return file.filename;
  } else {
    const type = file?.mime || file?.type;
    return (
      Math.floor(Math.random() * Math.floor(999999999)) +
      '.' +
      type.split('/')[1]
    );
  }
};
