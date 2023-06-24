import {PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// `data:image/jpeg;base64,${base64Image}`
export const takePhotoFromCamera = () => {
  return new Promise((resolve, reject) => {
    launchCamera({
      includeBase64: true,
      quality: 0.8,
    })
      .then(res => {
        resolve(res.assets);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const takePhotoFromGallery = async () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary({
      includeBase64: true,
      quality: 0.8,
      selectionLimit: 100,
    })
      .then(res => {
        resolve(res.assets);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('You can use the camera');
    } else {
      // console.log('Camera permission denied');
    }
  } catch (err) {
    // console.warn(err);
  }
};
export const formatNumber = value => {
  let removeChar = value?.replace(/[^0-9\.]/g, '');
  let removerDot = removeChar?.replace(/\./g, '');
  let formatNumber = removerDot?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatNumber;
};
export const validateNumber = value => {
  let removeChar = value?.replace(/[^0-9\.]/g, '');
  return removeChar;
};
export const convertDate = value => {
  let eachData = new Date(value);
  let result = dateToDMY(eachData);
  return result;
};
export const dateToYMD = value => {
  var d = value.getDate();
  var m = value.getMonth() + 1; //Month from 0 to 11
  var y = value.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
};
export const dateToDMY = value => {
  var d = value.getDate();
  var m = value.getMonth() + 1; //Month from 0 to 11
  var y = value.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
};

export const getFileName = file => {
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

export const checkSizeImageChat = element => {
  if (!element?.size) {
    return false;
  }
  return element.size / 1024 / 1024 <= 8;
};

export const getFileNameFromPath = _path => {
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
export const isImage = url => {
  url = url.toLowerCase();
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};
