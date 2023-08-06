import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import {colors, icons, images} from '../../../constants';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import CustomModalDateTimePicker from '../../../components/commonComponent/CustomModalDateTimePicker';
import {
  convertDate,
  dateToYMD,
  onOpenCamera,
  onOpenLibrary,
} from '../../../utils/common';
import {token} from '../../../store/slices/tokenSlice';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {GetUserAPi, PutUserAPi} from '../../../apis/homeApi/userApi';
import {
  DeleteImageApi,
  PostImageUserApi,
  PostImageIdentityApi,
} from '../../../apis/homeApi/fileDataApi';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import ComponentRenderImage from '../../../components/renderComponent/ComponentRenderImage';
import {useActionSheet} from '@expo/react-native-action-sheet';

const EditAccount = () => {
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const [user, setUser] = useState<any>();
  const [birthDay, setBirthDay] = useState(new Date());
  const [identityIssueDate, setIdentityIssueDate] = useState(new Date());
  const [albumImage, setAlbumImage] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [modalBirthDay, setModalBirthDay] = useState(false);
  const [modaSaveAccount, setModaSaveAccount] = useState(false);
  const [modalIdentityIssueDate, setModalIdentityIssueDate] = useState(false);

  useEffect(() => {
    loadingData();
  }, []);

  const loadingData = async () => {
    setLoading(true);
    await GetUserAPi(tokenStore)
      .then((res: any) => {
        if (res?.status == 200) {
          setUser(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };
  const {showActionSheetWithOptions} = useActionSheet();

  const renderActionSheet = (isPressAvatar:boolean) => {
    const options = ['Camera', 'Library', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            !isPressAvatar ? openCameraAvatar() : openCamera();
            break;
          case 1:
            !isPressAvatar ? openGalleryAvatar() : openGallery();
            break;
          case 2:
            break;
        }
      },
    );
  };

  const openCameraAvatar = () => {
    const avatarId = user?.avatarImage?.id;
    onOpenCamera()
      .then(async (avatarImage: any) => {
        if (avatarId) {
          deleteImage(avatarId).then(() => {
            updateAvatarImage(avatarImage);
          });
        } else {
          updateAvatarImage(avatarImage);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const openGalleryAvatar = () => {
    const avatarId = user?.avatarImage?.id;
    onOpenLibrary()
      .then(async (image: any) => {
        let eachImg = {...image};
        let avatarImage = [{...eachImg[0]}];
        if (avatarId) {
          deleteImage(avatarId).then(() => {
            updateAvatarImage(avatarImage);
          });
        } else {
          updateAvatarImage(avatarImage);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateAvatarImage = async (avatarImage: any) => {
    setLoading(true);
    await PostImageUserApi(tokenStore, user?.id, avatarImage)
      .then((res: any) => {
        if (res?.status == 200) {
          dispatch(updateReloadStatus('updateAvatarSuccess'));
          loadingData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openCamera = () => {
    onOpenCamera()
      .then((image: any) => {
        let eachImg = {...image[0]};
        let newAlbumImg = [...albumImage, eachImg];
        setAlbumImage(newAlbumImg);
        let eachResult = [...user?.identityImages, eachImg];
        let newUser = {...user, identityImages: eachResult};
        setUser(newUser);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const openGallery = () => {
    onOpenLibrary()
      .then(async (image: any) => {
        let eachAlbumImg = [...albumImage];
        let newAlbumImg = eachAlbumImg.concat(image);
        setAlbumImage(newAlbumImg);
        const eachResult = [...user?.identityImages];
        const newResult = eachResult.concat(image);
        let newUser = {...user, identityImages: newResult};
        setUser(newUser);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteImage = async (imageId: any) => {
    setLoading(true);
    await DeleteImageApi(tokenStore, imageId)
      .then((res: any) => {
        if (res?.status == 200) {
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateInforAcoount = async () => {
    let now: any = new Date();
    setModaSaveAccount(false);
    setLoading(true);
    let data = {
      fullName: `${user?.fullName}` ?? '',
      phoneNumber: `${user?.phoneNumber}` ?? '',
      email: `${user?.email}` ?? '',
      birthDay: `${user?.birthDay}` ?? `${dateToYMD(`${now}`)}`,
      identityNumber: `${user?.identityNumber}` ?? '',
      identityIssueDate:
        `${user?.identityIssueDate}` ?? `${dateToYMD(`${now}`)}`,
      identityIssuePlace: `${user?.identityIssuePlace}` ?? '',
      address: `${user?.address}` ?? '',
    };
    // console.log(tokenStore, data);

    await PutUserAPi(tokenStore, data)
      .then(async (res: any) => {
        if (res?.status == 200) {
          if (albumImage?.length > 0) {
            await PostImageIdentityApi(tokenStore, user?.id, albumImage)
              .then((res: any) => {
                if (res?.status == 200) {
                  dispatch(updateReloadStatus('postImageSuccess'));
                  setLoading(true);
                  navigation.goBack();
                }
              })
              .catch(error => {
                console.log(error, 'error post img');
              });
          } else {
            dispatch(updateReloadStatus('updateUserInforSuccess'));
            setLoading(false);
            navigation.goBack();
          }
        }
      })
      .catch(error => {
        console.log(error, 'error put');
        Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ thông tin');
      });
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      {modaSaveAccount && (
        <CustomModalNotify
          title={'cập nhật thông tin'}
          label={'Bạn có muốn cập nhật thông tin account này ?'}
          onRequestClose={() => setModaSaveAccount(false)}
          pressConfirm={() => updateInforAcoount()}
        />
      )}
      {modalBirthDay && (
        <CustomModalDateTimePicker
          onCancel={() => setModalBirthDay(false)}
          value={birthDay}
          mode={'date'}
          onDateChange={(value: any) => {
            let newUser = {...user, birthDay: dateToYMD(value)};
            setUser(newUser);
            setBirthDay(value);
          }}
          onPress={() => setModalBirthDay(false)}
        />
      )}
      {modalIdentityIssueDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalIdentityIssueDate(false)}
          value={identityIssueDate}
          mode={'date'}
          onDateChange={(value: any) => {
            let newUser = {...user, identityIssueDate: dateToYMD(value)};
            setUser(newUser);
            // console.log(newUser);
            setIdentityIssueDate(value);
          }}
          onPress={() => setModalIdentityIssueDate(false)}
        />
      )}
      <ImageBackground
        source={images.im_backgroundAccount}
        style={{height: 160, width: '100%'}}>
        <ButtonComponent
          styleButton={styles.styleButton}
          icon={icons.ic_back}
          styleIcon={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity
          onPress={() => renderActionSheet(false)}
          style={[styles.viewCenter, styles.viewAvatar]}>
          {user?.avatarImage?.fileUrl ? (
            <Image
              key={'fileUrl'}
              source={{uri: user?.avatarImage?.fileUrl}}
              style={styles.avatar}
              resizeMode="contain"
            />
          ) : user?.avatarImage?.uri ? (
            <Image
              key={'uri'}
              source={{uri: user?.avatarImage?.uri}}
              style={styles.avatar}
              resizeMode="contain"
            />
          ) : (
            <Image source={icons.ic_user} style={styles.avatar} />
          )}
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, marginTop: 40}}>
        <TextTitleComponent label={'Tài khoản'} />
        <ComponentInput
          type={'input'}
          title={'Họ và tên'}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập họ và tên'}
          value={user?.fullName}
          onChangeText={(text: any) => {
            let newUser = {...user, fullName: text};
            setUser(newUser);
          }}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Số điện thoại'}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập số điện thoại'}
          keyboardType={'number-pad'}
          value={user?.phoneNumber}
          onChangeText={(text: any) => {
            let newUser = {...user, phoneNumber: text};
            setUser(newUser);
          }}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Email'}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập email'}
          value={user?.email}
          onChangeText={(text: any) => {
            let newUser = {...user, email: text};
            setUser(newUser);
          }}
        />

        <TextTitleComponent label={'Thông tin cá nhân'} />
        <ComponentButton
          type={'buttonSelect'}
          title={'Ngày sinh'}
          placeholder={'Chọn ngày sinh'}
          styleButton={{backgroundColor: '#EBEDEE'}}
          value={`${convertDate(user?.birthDay)}`}
          onPress={() => setModalBirthDay(true)}
        />
        <ComponentInput
          type={'input'}
          keyboardType={'number-pad'}
          viewComponent={{marginTop: 10}}
          title={'Số CMND/CCCD'}
          placeholder={'Nhập số CMND/CCCD'}
          styleInput={{backgroundColor: '#EBEDEE'}}
          value={user?.identityNumber}
          onChangeText={(text: any) => {
            let newUser = {...user, identityNumber: text};
            setUser(newUser);
          }}
        />
        <ComponentButton
          type={'buttonSelect'}
          title={'Ngày cấp'}
          placeholder={'Chọn ngày cấp'}
          styleButton={{backgroundColor: '#EBEDEE'}}
          value={`${convertDate(user?.identityIssueDate)}`}
          onPress={() => setModalIdentityIssueDate(true)}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Nơi cấp'}
          placeholder={'Nhập nơi cấp'}
          styleInput={{backgroundColor: '#EBEDEE'}}
          value={user?.identityIssuePlace}
          onChangeText={(text: any) => {
            let newUser = {...user, identityIssuePlace: text};
            setUser(newUser);
          }}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Địa chỉ'}
          placeholder={'Nhập địa chỉ'}
          styleInput={{backgroundColor: '#EBEDEE'}}
          value={user?.address}
          onChangeText={(text: any) => {
            let newUser = {...user, address: text};
            setUser(newUser);
          }}
        />
        <ComponentRenderImage
          title={'Thêm ảnh CMND/ CCCD'}
          label={'Tải lên ảnh mặt trước và mặt sau của CMND/ CCCD'}
          labelUpload={'Thêm ảnh CMND/ CCCD'}
          data={user?.identityImages}
          deleteButton={true}
          openModal={() => renderActionSheet(true)}
          deleteItem={(item: any) => {
            if (item?.id) {
              Alert.alert(
                'Cảnh báo !',
                'Đây là ảnh đang có trên server, bạn có muốn xóa ?',
                [
                  {text: 'Cancel', style: 'cancel'},
                  {
                    text: 'OK',
                    onPress: () => {
                      let result = [...user?.identityImages];
                      let newResult = result.filter(
                        itemResult => itemResult !== item,
                      );
                      let newUser = {...user, identityImages: newResult};
                      setUser(newUser);
                      deleteImage(item?.id);
                    },
                  },
                ],
              );
            } else {
              let eachAlbumImg = [...albumImage];
              let newAlbumImg = eachAlbumImg.filter(
                itemResult => itemResult !== item,
              );
              setAlbumImage(newAlbumImg);
              let result = [...user?.identityImages];
              let newResult = result.filter(itemResult => itemResult !== item);
              let newUser = {...user, identityImages: newResult};
              setUser(newUser);
            }
          }}
        />
        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Hủy'}
        rightLabel={'Lưu'}
        styleLabelLeft={styles.styleLabelLeft}
        styleButtonLeft={styles.styleButtonLeft}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setModaSaveAccount(true)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  icon: {width: 24, height: 24, tintColor: 'white'},
  styleButton: {height: 56, width: 56},
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
  },
  viewCenter: {justifyContent: 'center', alignItems: 'center'},
  viewAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -30,
  },
  styleLabelLeft: {color: 'orange', fontSize: 15, fontWeight: '600'},
  styleButtonLeft: {
    borderColor: 'orange',
    backgroundColor: 'white',
    marginRight: 5,
  },
});
export default EditAccount;
