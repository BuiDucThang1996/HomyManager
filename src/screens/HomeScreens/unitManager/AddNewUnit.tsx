import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, LogBox, Alert, ScrollView} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {colors, icons, images} from '../../../constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import RenderService from '../../../components/renderComponent/RenderService';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {StraightLine} from '../../../components/commonComponent/LineConponent';
import CustomLoading from '../../../components/commonComponent/LoadingComponent';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {updateTenant} from '../../../store/slices/tenantSlice';
import {amenityState, updateAmenity} from '../../../store/slices/amenitySlice';
import {serviceState, updateService} from '../../../store/slices/serviceSlice';
import {CreateNewUnitApi} from '../../../apis/homeApi/unitApi';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import CustomPickerDay from '../../../components/commonComponent/CustomPickerDay';
import {UNITTYPE} from '../../../resource/dataPicker';
import {formatNumber, onOpenCamera, onOpenLibrary, validateNumber} from '../../../utils/common';
import {PostImageUnitApi} from '../../../apis/homeApi/fileDataApi';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import ComponentRenderImage from '../../../components/renderComponent/ComponentRenderImage';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import {GetListHausesApi, HauseDetailApi} from '../../../apis/homeApi/houseApi';
import { useActionSheet } from '@expo/react-native-action-sheet';

const AddNewUnit = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const dispatch = useDispatch();
  const hauseId: any = route.params;
  const [name, setName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [rentMonthlyFee, setRentMonthlyFee] = useState('');
  const [area, setArea] = useState('');
  const [limitTenantNumber, setLimitTenantNumber] = useState('');
  const [depositMoney, setDepositMoney] = useState('');
  const [description, setDescription] = useState('');
  const [notice, setNotice] = useState('');
  const [unitImages, setUnitImages] = useState<any>([]);

  const [listService, setListService] = useState<any>([]);
  const [listAmenity, setListAmenity] = useState<any>([]);

  const [loadingRoom, setLoadingRoom] = useState(true);
  const [modalAddRoom, setModalAddRoom] = useState(false);
  const [modalUnitType, setModalUnitType] = useState(false);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    dispatch(updateTenant([]));
    getDataHause();
  }, []);

  const getDataHause = async () => {
    await HauseDetailApi(tokenStore, hauseId)
      .then((res: any) => {
        if (res?.status === 200) {

          let chargeServices: any[] = [];
          res?.data?.chargeServices?.forEach((item: any, index: number) => {
            let eachIteam = {...item, isCheck: true};
            chargeServices.push(eachIteam);
          });

          let amenities: any[] = [];
          res?.data?.amenities?.forEach((item: any, index: number) => {
            let eachIteam = {...item, isCheck: true};
            amenities.push(eachIteam);
          });

          setListService(chargeServices);
          setListAmenity(amenities);
          dispatch(updateService(chargeServices));
          dispatch(updateAmenity(amenities));
          setLoadingRoom(false);
        }
      })
      .catch(error => console.error(error));
  };

  useMemo(() => {
    setListService(serviceSelect);
    setListAmenity(amenitySelect);
  }, [serviceSelect, amenitySelect]);

  const renderPaidSevice = (item: any, index: any) => {
    return (
      <RenderService
      disabled={true}
        name={item?.name}
        fee={`${item?.fee}`}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderFreeSevice = (item: any, index: any) => {
    return <RenderAmenity label={item?.name} disabled={true} />;
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
      const eachResult = [...unitImages, eachImg];
      setUnitImages(eachResult);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const openGallery = () => {
    onOpenLibrary().then(async (image:any) => {
      const eachResult = [...unitImages];
      const newResult = eachResult.concat(image);
      setUnitImages(newResult);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const createNewUnit = async () => {
    setModalAddRoom(false);
    setLoadingRoom(true);
    let eachServiceIds: any = [];
    let eachAmenityIds: any = [];
    listService.map((item: any, index: any) => {
      eachServiceIds.push(item?.id);
    });
    listAmenity.map((item: any, index: any) => {
      eachAmenityIds.push(item?.id);
    });
    let data = {
      name: name,
      floorNumber: parseInt(floorNumber),
      openTime: '',
      rentMonthlyFee: parseInt(`${validateNumber(`${rentMonthlyFee}`)}`),
      roomType: roomType,
      area: parseInt(area),
      limitTenantNumber: parseInt(limitTenantNumber),
      depositMoney: parseInt(`${validateNumber(`${depositMoney}`)}`),
      description: description,
      notice: notice,
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
    };
    await CreateNewUnitApi(tokenStore, hauseId, data)
      .then(async (res: any) => {
        if (res?.status == 200) {
          let unitId = res?.data?.id;
          if (unitImages?.length > 0) {
            await PostImageUnitApi(tokenStore, unitId, unitImages)
              .then((res: any) => {
                if (res?.status == 200) {
                  dispatch(updateReloadStatus('updateRoom'));
                  navigation.navigate('UnitManager', hauseId);
                  setLoadingRoom(false);
                }
              })
              .catch(error => {
                console.log(error, 'image');
                setLoadingRoom(false);
                Alert.alert(
                  'Thông báo',
                  `Đã có lỗi sảy ra,vui lòng liên hệ với admin...`,
                );
              });
          } else {
            dispatch(updateReloadStatus('updateRoom'));
            navigation.navigate('UnitManager', hauseId);
            setLoadingRoom(false);
          }
        }
      })
      .catch(error => {
        console.log(error, 'error create room');
        setLoadingRoom(false);
        Alert.alert(
          'Thông báo',
          `Đã có lỗi sảy ra,vui lòng liên hệ với admin...`,
        );
      });
  };

  return (
    <View style={styles.container}>
      {loadingRoom && <CustomLoading />}
      {modalAddRoom && (
        <CustomModalNotify
          title={'Tạo phòng mới'}
          label={'Bạn có muốn thêm phòng mới ?'}
          modalVisible={modalAddRoom}
          onRequestClose={() => setModalAddRoom(false)}
          pressConfirm={() => createNewUnit()}
        />
      )}
      {modalUnitType && (
        <CustomPickerDay
          data={UNITTYPE}
          modalVisible={modalUnitType}
          onRequestClose={() => setModalUnitType(false)}
          onPress={(item: any) => {
            setRoomType(item?.key);
            setModalUnitType(false);
          }}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Thêm phòng'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10, width: '100%'}}>
        <SuggestComponent
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />

        <TextTitleComponent label={'Thông tin phòng'} />

        <ComponentInput
          important={true}
          keyboardType={'number-pad'}
          type={'input'}
          title={'Tầng'}
          placeholder={'Nhập số tầng'}
          value={floorNumber}
          onChangeText={(text: any) => setFloorNumber(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Tên phòng'}
          placeholder={'Nhập tên phòng'}
          value={name}
          onChangeText={(text: any) => setName(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'inputUnit'}
          title={'Giá thuê phòng'}
          placeholder={'Nhập giá thuê phòng'}
          value={`${formatNumber(rentMonthlyFee)}`}
          onChangeText={(text: any) => setRentMonthlyFee(text)}
          unit={'VNĐ'}
        />
        <ComponentButton
          viewComponent={{marginTop: 10}}
          type={'buttonSelect'}
          title={'Loại phòng'}
          placeholder={'Chọn loại phòng'}
          value={roomType}
          onPress={() => setModalUnitType(true)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'inputUnit'}
          title={'Diện tích'}
          placeholder={'Nhập diện tích'}
          unit={'m2'}
          value={area}
          onChangeText={(text: any) => setArea(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'inputUnit'}
          title={'Giới hạn số người cho thuê'}
          placeholder={'Nhập số người'}
          unit={'Người'}
          value={limitTenantNumber}
          onChangeText={(text: any) => setLimitTenantNumber(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'inputUnit'}
          title={'Tiền đặt cọc'}
          placeholder={'Nhập số tiền cọc'}
          value={`${formatNumber(depositMoney)}`}
          onChangeText={(text: any) => setDepositMoney(text)}
          unit={'VNĐ'}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Mô tả'}
          placeholder={'Nhập mô tả phòng'}
          value={description}
          onChangeText={(text: any) => setDescription(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Lưu ý cho người thuê'}
          placeholder={'Nhập lưu ý cho người thuê'}
          value={notice}
          onChangeText={(text: any) => setNotice(text)}
        />

        {StraightLine()}

        <TextTitleComponent
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseService')}
        />
        <SuggestComponent
          label={
            'Chỉnh sửa dịch vụ phòng sẽ không ảnh hưởng đến dịch vụ của tòa nhà'
          }
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listService.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={key => key.id}
                data={listService}
                renderItem={({item, index}) => renderPaidSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listService.length}`}</Text>
        </View>

        <TextTitleComponent
          label={'Tiện ích miễn phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseAmenity')}
        />
        <SuggestComponent
          label={
            'Chỉnh sửa tiện ích phòng sẽ không ảnh hưởng đến tiện ích của tòa nhà'
          }
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listAmenity.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={key => key.id}
                data={listAmenity}
                renderItem={({item, index}) => renderFreeSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
        </View>

        <ComponentRenderImage
          title={'Thêm ảnh phòng'}
          label={'Tải lên ảnh phòng (1-6 ảnh)'}
          labelUpload={'Tải lên ảnh phòng'}
          data={unitImages}
          deleteButton={true}
          openModal={() => renderActionSheet()}
          deleteItem={(item: any) => {
            let result = [...unitImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            setUnitImages(newResult);
          }}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Hủy'}
          rightLabel={'Tiếp tục'}
          styleLabelLeft={styles.styleLabelLeft}
          styleButtonLeft={styles.styleButtonLeft}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalAddRoom(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
  styleLabelLeft: {color: 'orange', fontSize: 15, fontWeight: '600'},
  styleButtonLeft: {
    borderColor: 'orange',
    backgroundColor: 'white',
    marginRight: 5,
  },
});
export default AddNewUnit;
