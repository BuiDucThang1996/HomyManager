import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const requestUserPermission = async () => {
  await messaging().getAPNSToken();
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFCMToken();
  }
};
const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    await AsyncStorage.setItem('fcmToken', token);
  } catch (error) {
    console.log(error);
  }
};

export const NotificationServices = () => {
  //App on background state
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification?.body,
    );
  });
  //App on foreground state
  messaging().onMessage(async remoteMessage => {
    Alert.alert(
      JSON.stringify(remoteMessage?.notification?.title),
      JSON.stringify(remoteMessage?.notification?.body),
    );
  });
  //Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification.body,
        );
      }
    });
};
