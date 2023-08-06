import { useActionSheet } from '@expo/react-native-action-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const formatNumber = (value: any) => {
  let removeChar = value?.replace(/[^0-9\.]/g, '');
  let removerDot = removeChar?.replace(/\./g, '');
  let formatNumber = removerDot?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatNumber;
};
export const validateNumber = (value: any) => {
  let removeChar = value?.replace(/[^0-9\.]/g, '');
  return removeChar;
};
export const convertDate = (value: any) => {
  let eachData = new Date(value);
  let result = dateToDMY(eachData);
  return result;
};
export const dateToYMD = (value: any) => {
  var d = value.getDate();
  var m = value.getMonth() + 1; //Month from 0 to 11
  var y = value.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
};
export const dateToDMY = (value: any) => {
  var d = value.getDate();
  var m = value.getMonth() + 1; //Month from 0 to 11
  var y = value.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
};

export const getFileName = (file: any) => {
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

export const checkSizeImageChat = (element: any) => {
  if (!element?.size) {
    return false;
  }
  return element.size / 1024 / 1024 <= 8;
};

export const getFileNameFromPath = (_path: any) => {
  if (_path !== undefined && _path !== null) {
    return _path.replace(/^.*[\\\/]/, '');
  } else {
    return '';
  }
};
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, '');
};
export const isImage = (url: string) => {
  url = url.toLowerCase();
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const removeDuplicateElements = (arrayService: any) => {
  const idMap: any = {};
  const uniqueElements: any[] = [];

  arrayService.forEach((element: any) => {
    const {id, isCheck} = element;
    if (!idMap[id]) {
      idMap[id] = element;
    } else if (isCheck) {
      idMap[id] = element;
    }
  });

  Object.values(idMap).forEach(element => {
    uniqueElements.push(element);
  });

  return uniqueElements;
};

export const onOpenCamera = () => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async()=>{
      await launchCamera({
        mediaType: 'photo',
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
      })
        .then(async (res: any) => {
          let listPhoto: any[] = [];
          listPhoto.push(res?.assets[0]);
          resolve(listPhoto);
        })
        .catch(error => {
          reject(error);
        });
    },300)
  });
};

export const onOpenLibrary = () => {
  return new Promise(async (resolve, reject) => {
    await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.8,
      selectionLimit: 100,
    })
      .then(async (res: any) => {
        let listPhoto: any[] = [];
        for (let index = 0; index < res?.assets?.length; index++) {
          const element = res?.assets[index];
          listPhoto.push(element);
        }
        resolve(listPhoto);
      })
      .catch(error => {
        reject(error);
      });
  });
};
