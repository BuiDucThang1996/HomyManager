import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Text,
  ImageBackground,
} from 'react-native';
import {colors, icons, images} from '../../constants';
import LoadingComponent from '../../components/commonComponent/LoadingComponent';
import ButtonComponent from '../../components/commonComponent/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import SuggestComponent from '../../components/commonComponent/SuggestComponent';
import ComponentInput from '../../components/commonComponent/ComponentInput';
import CustomModalNotify from '../../components/commonComponent/CustomModalNotify';
import {AuthenticationRegisterAPi} from '../../apis/loginApi/loginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateReloadStatus} from '../../store/slices/reloadSlice';
import AppBarComponent from '../../components/appBarComponent/AppBarComponent';
import TextInputComponent from '../../components/commonComponent/TextInputComponent';

const RegisterScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [modalRegister, setModalRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');

  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowRePass, setIsShowRePass] = useState(false);

  const isReadyData = () =>
    userName != '' &&
    fullName != '' &&
    phoneNumber != '' &&
    email != '' &&
    password != '' &&
    rePassword != '' &&
    password == rePassword;

  const registerAccount = async () => {
    setModalRegister(false);
    setLoading(true);
    let data = {
      userName: userName,
      fullName: fullName,
      phoneNumber: phoneNumber,
      password: password,
      email: email,
    };
    await AuthenticationRegisterAPi(data)
      .then((res: any) => {
        if (res?.status == 200) {
          Alert.alert('Chúc mừng', 'Bạn đã đăng ký thành công', [
            {
              text: 'OK',
              onPress: async () => {
                setLoading(true);
                try {
                  let data: any = {
                    username: userName,
                    password: password,
                  };
                  const jsonValue = JSON.stringify(data);
                  await AsyncStorage.setItem('user', jsonValue);
                  navigation.navigate('LoginScreen');
                  dispatch(updateReloadStatus('registerSuccess'));
                  setLoading(false);
                } catch (error) {
                  console.log(error);
                }
              },
            },
          ]);
        }
      })
      .catch(error => {
        Alert.alert(
          'Đăng ký thất bại',
          'Đã có lỗi sảy ra,vui lòng liên hệ admin để được hỗ trợ',
        );
      });
  };

  return (
    <View style={{flex: 1}}>
      {loading && <LoadingComponent />}
      {modalRegister && (
        <CustomModalNotify
          title={'Tạo tài khoản'}
          label={'Bạn có muốn tạo tài khoản này ?'}
          onRequestClose={() => setModalRegister(false)}
          pressConfirm={() => {
            if (isReadyData()) {
              registerAccount();
            } else {
              Alert.alert(
                'Sai thông tin',
                'Hãy kiểm tra lại thông tin đã nhập',
              );
            }
          }}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Đăng ký tài khoản'}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView nestedScrollEnabled={true} keyboardDismissMode="none">
          <SuggestComponent
            labelStyle={{textAlign: 'center', marginTop: 10}}
            label={
              'Vui lòng cung cấp thông tin dưới đây để đăng ký tài khoản cho số điện thoại'
            }
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Họ và tên'}
            placeholder={'Nhập họ và tên'}
            value={fullName}
            onChangeText={(text: any) => setFullName(text)}
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Email'}
            placeholder={'Nhập email'}
            value={email}
            onChangeText={(text: any) => setEmail(text)}
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Số điện thoại'}
            placeholder={'Nhập số điện thoại'}
            keyboardType={'number-pad'}
            value={phoneNumber}
            onChangeText={(text: any) => setPhoneNumber(text)}
          />
          <ComponentInput
            viewComponent={{marginTop: 15}}
            important={true}
            type={'input'}
            title={'Tên đăng nhập'}
            placeholder={'Nhập tên đăng nhập'}
            value={userName}
            onChangeText={(text: any) => setUserName(text)}
          />
          <View style={{marginTop: 15}}>
            <View
              style={styles.viewRowCenter}>
              <Text style={{fontSize: 15, color: '#374047'}}>{'Mật khẩu'}</Text>
              <Text style={{color: 'red'}}> *</Text>
            </View>
            <TextInputComponent
              secureTextEntry={isShowPass ? false : true}
              styleViewTextInput={styles.styleViewTextInput}
              placeholder={'Nhập mật khẩu'}
              value={password}
              onChangeText={(text: any) => setPassword(text)}
              iconRight={isShowPass ? icons.ic_show : icons.ic_hide}
              styleIconRight={styles.iconShow}
              onPressIconRight={() => setIsShowPass(!isShowPass)}
            />
          </View>
          <View style={{marginTop: 15}}>
            <View
              style={styles.viewRowCenter}>
              <Text style={{fontSize: 15, color: '#374047'}}>{'Mật khẩu'}</Text>
              <Text style={{color: 'red'}}> *</Text>
            </View>
            <TextInputComponent
              secureTextEntry={isShowRePass ? false : true}
              styleViewTextInput={styles.styleViewTextInput}
              placeholder={'Nhập lại mật khẩu'}
              value={rePassword}
              onChangeText={(text: any) => setRePassword(text)}
              iconRight={isShowRePass ? icons.ic_show : icons.ic_hide}
              styleIconRight={styles.iconShow}
              onPressIconRight={() => setIsShowRePass(!isShowRePass)}
            />
          </View>

          <ButtonComponent
            label={'Tiếp tục'}
            styleButton={styles.styleButton}
            styleLabel={styles.styleLabel}
            onPress={() => setModalRegister(true)}
          />
          
          <View style={{height: 56}} />
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },

  content: {fontSize: 15, color: '#374047'},
  styleViewTextInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ACB4B9',
    paddingHorizontal: 15,
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
  viewRowCenter:{
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'center',
  },
  iconShow:{
    width: 30,
    height: 30,
    tintColor: '#374047',
  }
});
export default RegisterScreen;
