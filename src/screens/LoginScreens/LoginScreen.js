import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {colors, icons, images} from '../../constants';
import TextInputComponent from '../../components/commonComponent/TextInputComponent';
import ButtonComponent from '../../components/commonComponent/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {updateToken} from '../../store/slices/tokenSlice';
import {AuthenticationAPi} from '../../apis/loginApi/loginApi';
import LoadingComponent from '../../components/commonComponent/LoadingComponent';
import {reloadState, updateReloadStatus} from '../../store/slices/reloadSlice';
import {updateAppStatus} from '../../store/slices/appStatusSlice';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const reload = useSelector(reloadState);
  const dispatch = useDispatch();

  useEffect(() => {
    const getItem = async () => {
      try {
        await AsyncStorage.getItem('user').then(value => {
          let jsonValue = JSON.parse(value);
          if (jsonValue) {
            setUsername(jsonValue?.username);
            setPassword(jsonValue?.password);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    getItem();
  }, [reload]);
  const loginFuntion = async () => {
    let user = {username: username, password: password};
    setLoading(true);
    await AuthenticationAPi(password, username)
      .then(async res => {
        if (res?.status == 200) {
          let token = res?.data?.token;
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch(updateToken(token));
          dispatch(updateAppStatus('success'));
          dispatch(updateReloadStatus('login'));
          setLoading(false);
        }
      })
      .catch(error => {
        Alert.alert('Lỗi', `Lỗi đăng nhập`);
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={images.im_backgroundLogin}
        style={styles.container}>
        {loading && <LoadingComponent modalVisible={loading} />}
        <ScrollView style={{paddingTop: 220}}>
          <Text style={styles.title}>Đăng nhập/ Đăng ký</Text>
          <View style={{marginTop: 30}}>
            <Text style={styles.content}>Tài khoản</Text>
            <TextInputComponent
              styleViewTextInput={styles.styleViewTextInput}
              placeholder={'Nhập tài khoản'}
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text style={styles.content}>Mật khẩu</Text>
            <TextInputComponent
              secureTextEntry={isShow ? false : true}
              styleViewTextInput={styles.styleViewTextInput}
              placeholder={'Nhập mật khẩu'}
              value={password}
              onChangeText={text => setPassword(text)}
              iconRight={isShow ? icons.ic_show : icons.ic_hide}
              styleIconRight={{
                width: 30,
                height: 30,
                tintColor: '#374047',
              }}
              onPressIconRight={() => setIsShow(!isShow)}
            />
          </View>

          <ButtonComponent
            styleButton={{alignSelf: 'flex-end', marginTop: 10}}
            styleLabel={{color: colors.mainColor, fontWeight: '600'}}
            label={'Quên mật khẩu'}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 13, color: '#7F8A93'}}>
              Không có tài khoản?
            </Text>
            <ButtonComponent
              styleLabel={{color: colors.mainColor, fontWeight: '600'}}
              label={'Đăng ký ngay'}
              onPress={() => navigation.navigate('RegisterScreen')}
            />
          </View>
          <ButtonComponent
            label={'Đăng nhập'}
            styleButton={styles.styleButton}
            styleLabel={styles.styleLabel}
            onPress={() => loginFuntion()}
          />
          <View style={{height: 500}} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  title: {
    color: colors.mainColor,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  content: {fontSize: 15, color: '#374047'},
  styleViewTextInput: {
    height: 48,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ACB4B9',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  styleButton: {
    width: 200,
    height: 44,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: 'center',
  },
  styleLabel: {color: 'white', fontSize: 15},
});
export default LoginScreen;
