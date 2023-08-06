import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import CustomModalDateTimePicker from '../../../components/commonComponent/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../constants';
import CustomTimeButtons from '../../../components/commonComponent/CustomTimeButtons';
import CustomStepAppBar from '../../../components/appBarComponent/CustomStepAppBar';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {
  GetLocationCitysApi,
  GetDistrictByCityIdApi,
  GetWardByDistrictIdApi,
} from '../../../apis/homeApi/houseApi';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {updateHouseInfor} from '../../../store/slices/houseInforSlice';
import {formatNumber, onOpenCamera, onOpenLibrary, validateNumber} from '../../../utils/common';
import {StraightLine} from '../../../components/commonComponent/LineConponent';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import ComponentRenderImage from '../../../components/renderComponent/ComponentRenderImage';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import BottomSheetPicker from '../../../components/commonComponent/BottomSheetPicker';
import { useActionSheet } from '@expo/react-native-action-sheet';

const AddNewHouseStep1 = (props: any) => {
  const navigation: any = useNavigation();
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [numberOfFloor, setNumberOfFloor] = useState('');
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [leasingFee, setLeasingFee] = useState('');
  const [description, setDescription] = useState('');
  const [cityId, setCityId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [wardId, setWardId] = useState('');
  const [address, setAddress] = useState('');
  const [hauseImages, setHauseImages] = useState<any>([]);

  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [cityName, setCityName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');

  const [openTimeValue, setOpenTimeValue] = useState('08:00:00');
  const [closeTimeValue, setCloseTimeValue] = useState('23:00:00');
  const [modalopenTime, setModalopenTime] = useState(false);
  const [modalcloseTime, setModalcloseTime] = useState(false);
  const [modalCity, setModalCity] = useState(false);
  const [modalDistrict, setModalDistrict] = useState(false);
  const [modalWard, setModalWard] = useState(false);

  useEffect(() => {
    let eachOpenTime = new Date('Sun Mar 12 2023 08:00:00 GMT+0700');
    let eachCloseTime = new Date('Sun Mar 12 2023 23:00:00 GMT+0700');
    setOpenTimeValue(eachOpenTime.toLocaleTimeString('en-VN'));
    setOpenTime(eachOpenTime);
    setCloseTimeValue(eachCloseTime.toLocaleTimeString('en-VN'));
    setCloseTime(eachCloseTime);
    const getData = async () => {
      await GetLocationCitysApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            setListCity(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, []);

  const getDistrictData = async (item: any) => {
    setCityName(item?.name);
    setCityId(item?.id);
    setDistrictName('');
    setDistrictId('');
    setWardName('');
    setWardId('');
    setLoading(true);
    await GetDistrictByCityIdApi(tokenStore, item?.id)
      .then((res: any) => {
        if (res?.status == 200) {
          setListDistrict(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const getWardData = async (item: any) => {
    setDistrictName(item?.name);
    setDistrictId(item?.id);
    setWardName('');
    setWardId('');
    setLoading(true);
    await GetWardByDistrictIdApi(tokenStore, item?.id)
      .then((res: any) => {
        if (res?.status == 200) {
          setListWard(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };
  const {showActionSheetWithOptions} = useActionSheet();

  const renderActionSheet = () => {
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
            openCamera();
            break;
          case 1:
             openGallery();
            break;
          case 2:
            break;
        }
      },
    );
  };
  const openCamera = () => {
    onOpenCamera().then((image:any) => {
      let eachImg = {...image[0]};
      const eachResult = [...hauseImages, eachImg];
      setHauseImages(eachResult);
    })
    .catch(e => {
      console.log(e);
    });
   
  };

  const openGallery = () => {
    onOpenLibrary().then(async image => {
      const eachResult = [...hauseImages];
      const newResult = eachResult.concat(image);
      setHauseImages(newResult);
    })
    .catch(e => {
      console.log(e);
    });
    
  };

  const goToStepTwo = () => {
    let data = {
      name: name,
      numberOfFloor: parseInt(`${validateNumber(`${numberOfFloor}`)}`),
      openTime: `${openTime}`,
      closeTime: `${closeTime}`,
      leasingFee: parseInt(`${validateNumber(`${leasingFee ?? '0'}`)}`),
      description: description,
      cityId: cityId,
      districtId: districtId,
      wardId: wardId,
      address: address,
      hauseImages: hauseImages,
    };
    if (name == '' && numberOfFloor == '') {
      Alert.alert(
        'Thiếu trường thông tin',
        'Vui lòng điền đầy đủ mục thông tin có dấu *',
      );
    } else {
      dispatch(updateHouseInfor(data));
      dispatch(updateReloadStatus('goToStep2'));
      navigation.navigate('AddNewHouseStep2');
    }
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      {modalopenTime && (
        <CustomModalDateTimePicker
          onCancel={() => setModalopenTime(false)}
          value={openTime}
          mode={'time'}
          openPicker={modalopenTime}
          onDateChange={(value: any) => {
            let newTime = value.toLocaleTimeString('en-VN');
            setOpenTime(value);
            setOpenTimeValue(newTime);
          }}
          onPress={() => setModalopenTime(false)}
        />
      )}
      {modalcloseTime && (
        <CustomModalDateTimePicker
          onCancel={() => setModalcloseTime(false)}
          value={closeTime}
          mode={'time'}
          openPicker={modalcloseTime}
          onDateChange={(value: any) => {
            let newTime = value.toLocaleTimeString('en-VN');
            setCloseTime(value);
            setCloseTimeValue(newTime);
          }}
          onPress={() => setModalcloseTime(false)}
        />
      )}
      {modalCity && (
        <BottomSheetPicker
          data={listCity}
          handlerShow={(index: number) => {
            if (index === 0) {
              setModalCity(false);
            }
          }}
          onPressItem={(item: any) => {
            setModalCity(false);
            getDistrictData(item);
          }}
          handlerCancel={() => setModalCity(false)}
        />
      )}
      {modalDistrict && (
        <BottomSheetPicker
          data={listDistrict}
          handlerShow={(index: number) => {
            if (index === 0) {
              setModalDistrict(false);
            }
          }}
          onPressItem={(item: any) => {
            setModalDistrict(false);
            getWardData(item);
          }}
          handlerCancel={() => setModalDistrict(false)}
        />
      )}
      {modalWard && (
        <BottomSheetPicker
          data={listWard}
          handlerShow={(index: number) => {
            if (index === 0) {
              setModalWard(false);
            }
          }}
          onPressItem={(item: any) => {
            setModalWard(false);
            setWardName(item?.name);
            setWardId(item?.id);
            setModalWard(false);
          }}
          handlerCancel={() => setModalWard(false)}
        />
      )}
      <CustomStepAppBar
        iconLeft={icons.ic_back}
        label={'Thiết lập thông tin'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
        step={1}
      />

      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={[styles.eachContainer]}>
        <SuggestComponent
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <TextTitleComponent label={'Thông tin tòa nhà'} />

        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên tòa nhà'}
          placeholder={'Nhập tên tòa nhà'}
          value={name}
          onChangeText={(text: any) => setName(text)}
        />
        <ComponentInput
          important={true}
          type={'input'}
          title={'Số tầng'}
          placeholder={'Nhập số tầng'}
          keyboardType={'number-pad'}
          viewComponent={{marginTop: 10}}
          value={`${formatNumber(`${numberOfFloor}`)}`}
          onChangeText={(text: any) => setNumberOfFloor(text)}
        />

        <CustomTimeButtons
          styleContainer={{marginTop: 10}}
          title={'Giờ mở - đóng cửa'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={openTimeValue}
          valueRight={closeTimeValue}
          onPressLeft={() => setModalopenTime(true)}
          onPressRightt={() => setModalcloseTime(true)}
        />
        <ComponentInput
          type={'inputUnit'}
          title={'Chi phí thuê nhà'}
          unit={'VNĐ'}
          placeholder={'Nhập chi phí thuê nhà'}
          keyboardType={'number-pad'}
          viewComponent={{marginTop: 10}}
          value={`${formatNumber(leasingFee)}`}
          onChangeText={(text: string) => setLeasingFee(text)}
        />
        <ComponentInput
          type={'inputNote'}
          title={'Mô tả'}
          placeholder={'Nhập mô tả cho tòa nhà'}
          viewComponent={{marginTop: 10}}
          value={description}
          onChangeText={(text: string) => setDescription(text)}
        />

        {StraightLine()}
        <TextTitleComponent label={'Địa chỉ tòa nhà'} />
        <ComponentButton
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Tỉnh/ Thành phố'}
          placeholder={'Chọn Tỉnh/ Thành phố'}
          value={cityName}
          onPress={() => setModalCity(true)}
        />
        <ComponentButton
          disabled={cityName ? false : true}
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Quận/ Huyện'}
          placeholder={'Chọn Quận/ Huyện'}
          value={districtName}
          onPress={() => setModalDistrict(true)}
        />
        <ComponentButton
          disabled={cityName && districtName ? false : true}
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Phường/ Xã'}
          placeholder={'Chọn Phường/ Xã'}
          value={wardName}
          onPress={() => setModalWard(true)}
        />

        <ComponentInput
          type="inputNote"
          title={'Địa chỉ cụ thể'}
          placeholder={'Nhập địa chỉ cụ thể'}
          viewComponent={{marginTop: 10}}
          value={address}
          onChangeText={(text: string) => setAddress(text)}
        />

        {StraightLine()}
        <ComponentRenderImage
          title={'Thêm ảnh tòa nhà'}
          label={'Tải lên ảnh đại diện tòa nhà'}
          labelUpload={'Tải lên ảnh tòa nhà'}
          data={hauseImages}
          deleteButton={true}
          openModal={() => renderActionSheet()}
          deleteItem={(item: any) => {
            let result = [...hauseImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            setHauseImages(newResult);
          }}
        />

        <View style={{marginBottom: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Hủy'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => goToStepTwo()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
});

export default AddNewHouseStep1;
