import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Alert, ScrollView} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {colors, icons, images} from '../../../constants';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
// import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../components/commonComponent/CustomModalCamera';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomModalDateTimePicker from '../../../components/commonComponent/CustomModalDateTimePicker';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import {dateToDMY, dateToYMD} from '../../../utils/common';
import {CreateNewTenantApi} from '../../../apis/homeApi/tenantApi';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import {
  PostImageIdentityApi,
  PostImageUserApi,
} from '../../../apis/homeApi/fileDataApi';
import ComponentRenderImage from '../../../components/renderComponent/ComponentRenderImage';
import {StraightLine} from '../../../components/commonComponent/LineConponent';

const AddNewTenant = () => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const [loadingAddTenant, setLoadingAddTenant] = useState(false);
  const [modalAddTenant, setModalAddTenant] = useState(false);

  const [timeNow, setTimeNow] = useState(new Date());
  const [timeNowIssueDate, setTimeNowIssueDate] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [identityIssueDate, setIdentityIssueDate] = useState('');
  const [identityIssuePlace, setIdentityIssuePlace] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const [albumImage, setAlbumImage] = useState<any>([]);
  const [albumImageUser, setAlbumImageUser] = useState<any>([]);

  const [modalCamera, setModalCamera] = useState(false);
  const [modalCameraUser, setModalCameraUser] = useState(false);
  const [birthDayValue, setBirthDayValue] = useState('');
  const [modalBirthDay, setModalBirthDay] = useState(false);
  const [identityIssueDateValue, setIdentityIssueDateValue] = useState('');
  const [modalIdentityIssueDate, setModalIdentityIssueDate] = useState(false);

  const openCamera = () => {
    setModalCamera(false);
    setTimeout(() => {
      ImagePicker.openCamera({width: 300, height: 400})
        .then(image => {
          let eachImg = {...image, uri: image?.path};
          const eachResult = [...albumImage, eachImg];
          setAlbumImage(eachResult);
        })
        .catch(e => {
          ImagePicker.clean();
          setModalCamera(false);
        });
    }, 1000);
  };
  const openGallery = () => {
    setModalCamera(false);
    setTimeout(() => {
      ImagePicker.openPicker({multiple: true})
        .then(async image => {
          let albumImg = [];
          for (let index = 0; index < image.length; index++) {
            let element = image[index];
            let eachElement = {...element, uri: element?.path};
            albumImg.push(eachElement);
          }
          const eachResult = [...albumImage];
          const newResult = eachResult.concat(albumImg);
          setAlbumImage(newResult);
        })
        .catch(e => {
          ImagePicker.clean();
          setModalCamera(false);
        });
    }, 1000);
  };
  const openCameraUser = () => {
    setModalCameraUser(false);
    setTimeout(() => {
      ImagePicker.openCamera({width: 300, height: 400})
        .then(image => {
          let eachImg = {...image, uri: image?.path};
          let eachResult = [...albumImageUser, eachImg];
          setAlbumImageUser(eachResult);
        })
        .catch(e => {
          ImagePicker.clean();
          setModalCameraUser(false);
        });
    }, 1000);
  };

  const openGalleryUser = () => {
    setModalCameraUser(false);
    setTimeout(() => {
      ImagePicker.openPicker({multiple: true})
        .then(async image => {
          let albumImg = [];
          for (let index = 0; index < image.length; index++) {
            let element = image[index];
            let eachElement = {...element, uri: element?.path};
            albumImg.push(eachElement);
          }
          let eachResult = [...albumImageUser];
          let newResult = eachResult.concat(albumImg);
          setAlbumImageUser(newResult);
        })
        .catch(e => {
          ImagePicker.clean();
          setModalCamera(false);
        });
    }, 1000);
  };

  const createNewTenant = async () => {
    setModalAddTenant(false);
    setLoadingAddTenant(true);
    let data = {
      userName: userName,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      birthDay: `${birthDay}`,
      identityNumber: identityNumber,
      identityIssueDate: `${identityIssueDate}`,
      identityIssuePlace: identityIssuePlace,
      address: address,
      password: password,
    };
    await CreateNewTenantApi(tokenStore, data)
      .then(async (res: any) => {
        if (res?.status == 200) {
          const tenantId = res?.data?.id;
          if (albumImageUser?.length > 0) {
            await PostImageUserApi(tokenStore, tenantId, albumImageUser)
              .then(async (res: any) => {
                if (res?.status == 200) {
                }
              })
              .catch(error => {
                Alert.alert('Cảnh báo', 'Không thể gửi ảnh người dùng.');
              });
          }
          if (albumImage?.length > 0) {
            await PostImageIdentityApi(tokenStore, tenantId, albumImage)
              .then((res: any) => {
                if (res?.status == 200) {
                  dispatch(updateReloadStatus('updateNewTenant'));
                  setLoadingAddTenant(false);
                  navigation.goBack();
                }
              })
              .catch(error => {
                Alert.alert('Cảnh báo', 'Không thể gửi ảnh CMND/CCCD');
              });
          }
          dispatch(updateReloadStatus('updateNewTenant'));
          setLoadingAddTenant(false);
          navigation.goBack();
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      {loadingAddTenant && <LoadingComponent />}
      {modalAddTenant && (
        <CustomModalNotify
          title={'Tạo mới người thuê'}
          label={'Bạn có muốn thêm mới thông tin người thuê này ?'}
          modalVisible={modalAddTenant}
          onRequestClose={() => setModalAddTenant(false)}
          pressConfirm={() => createNewTenant()}
        />
      )}
      {modalCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalCamera}
          onRequestClose={() => setModalCamera(false)}
          cancel={() => setModalCamera(false)}
        />
      )}
      {modalCameraUser && (
        <CustomModalCamera
          openCamera={() => openCameraUser()}
          openGallery={() => openGalleryUser()}
          modalVisible={modalCameraUser}
          onRequestClose={() => setModalCameraUser(false)}
          cancel={() => setModalCameraUser(false)}
        />
      )}
      {modalBirthDay && (
        <CustomModalDateTimePicker
          onCancel={() => setModalBirthDay(false)}
          value={timeNow}
          mode={'date'}
          onDateChange={(value: any) => {
            setTimeNow(value);
            let eachBirthDay = dateToYMD(value);
            let newTime = dateToDMY(value);
            setBirthDay(eachBirthDay);
            setBirthDayValue(newTime);
          }}
          onPress={() => setModalBirthDay(false)}
        />
      )}
      {modalIdentityIssueDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalIdentityIssueDate(false)}
          value={timeNowIssueDate}
          mode={'date'}
          onDateChange={(value: any) => {
            setTimeNowIssueDate(value);
            let eachIssueDate = dateToYMD(value);
            let newTime = dateToDMY(value);
            setIdentityIssueDate(eachIssueDate);
            setIdentityIssueDateValue(newTime);
          }}
          onPress={() => setModalIdentityIssueDate(false)}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Thêm người thuê'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <SuggestComponent
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <TextTitleComponent label={'Thông tin người thuê'} />

        <ComponentInput
          important={true}
          keyboardType={'number-pad'}
          type={'input'}
          title={'Số điện thoại'}
          placeholder={'Nhập số điện thoại'}
          value={phoneNumber}
          onChangeText={(text: any) => setPhoneNumber(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Họ và tên'}
          placeholder={'Nhập họ và tên'}
          value={fullName}
          onChangeText={(text: any) => setFullName(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Email'}
          placeholder={'Nhập email'}
          value={email}
          onChangeText={(text: any) => setEmail(text)}
        />
        <ComponentButton
          viewComponent={{marginTop: 10}}
          type={'buttonSelect'}
          title={'Ngày sinh'}
          placeholder={'Chọn ngày sinh'}
          value={birthDayValue}
          onPress={() => setModalBirthDay(true)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'input'}
          keyboardType={'number-pad'}
          title={'Số CMND/ CCCD'}
          placeholder={'Nhập số CMND/ CCCD'}
          value={identityNumber}
          onChangeText={(text: any) => setIdentityNumber(text)}
        />
        <ComponentButton
          viewComponent={{marginTop: 10}}
          type={'buttonSelect'}
          title={'Ngày cấp'}
          placeholder={'Chọn ngày cấp'}
          value={identityIssueDateValue}
          onPress={() => setModalIdentityIssueDate(true)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Nơi cấp'}
          placeholder={'Nhập nơi cấp'}
          value={identityIssuePlace}
          onChangeText={(text: any) => setIdentityIssuePlace(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Địa chỉ'}
          placeholder={'Nhập địa chỉ'}
          value={address}
          onChangeText={(text: any) => setAddress(text)}
        />

        {StraightLine()}
        <TextTitleComponent label={'Tạo tài khoản cho người thuê'} />

        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Tài khoản'}
          placeholder={'Nhập tài khoản'}
          value={userName}
          onChangeText={(text: any) => setUserName(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Mật khẩu'}
          placeholder={'Nhập mật khẩu'}
          value={password}
          onChangeText={(text: any) => setPassword(text)}
        />

        {StraightLine()}
        <ComponentRenderImage
          title={'Thêm ảnh người dùng'}
          label={'Tải lên ảnh người dùng'}
          labelUpload={'Thêm ảnh người dùng'}
          data={albumImageUser}
          deleteButton={true}
          openModal={() => setModalCameraUser(true)}
          deleteItem={(item: any) => {
            let result = [...albumImageUser];
            let newResult = result.filter(itemResult => itemResult !== item);
            setAlbumImageUser(newResult);
          }}
        />

        {StraightLine()}
        <ComponentRenderImage
          title={'Thêm ảnh CMND/ CCCD'}
          label={'Tải lên ảnh mặt trước và mặt sau của CMND/ CCCD'}
          labelUpload={'Thêm ảnh CMND/ CCCD'}
          data={albumImage}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={(item: any) => {
            let result = [...albumImage];
            let newResult = result.filter(itemResult => itemResult !== item);
            setAlbumImage(newResult);
          }}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Thêm mới'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalAddTenant(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default AddNewTenant;
