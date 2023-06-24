import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthenticationAPi} from '../apis/loginApi/loginApi';
import {updateToken} from '../store/slices/tokenSlice';
import TabHomeNavigator from './TabHomeNavigator/TabHomeNavigator';
import AuthNavigator from './AuthNavigator/AuthNavigator';
import {appStatusState, updateAppStatus} from '../store/slices/appStatusSlice';

const MainNavigator = () => {
  const appStatus = useSelector(appStatusState);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      loginByToken();
    };
    init();
  }, [appStatus]);

  const closeSplash = async () => {
    await RNBootSplash.hide({fade: true});
  };

  const loginByToken = async () => {
    try {
      await AsyncStorage.getItem('user').then(user => {
        let userStore = JSON.parse(user);
        if (userStore != null && userStore != undefined && userStore != '') {
          callApiToken(userStore);
        } else {
          dispatch(updateAppStatus('reject'));
          closeSplash();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const callApiToken = async userStore => {
    let username = userStore?.username;
    let password = userStore?.password;
    await AuthenticationAPi(password, username)
      .then(async res => {
        if (res?.status === 200) {
          let token = res?.data?.token;
          await AsyncStorage.setItem('token', token);
          dispatch(updateToken(token));
          dispatch(updateAppStatus('success'));
          closeSplash();
        }
      })
      .catch(error => {
        closeSplash();
        console.log(error);
      });
  };

  const renderNavigator = () => {
    if (appStatus === 'success') {
      return <TabHomeNavigator />;
    } else if (appStatus === 'reject') return <AuthNavigator />;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {renderNavigator()}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default MainNavigator;
