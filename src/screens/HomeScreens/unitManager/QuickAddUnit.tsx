import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {colors, icons, images} from '../../../constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import RenderService from '../../../components/renderComponent/RenderService';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import CustomModalCamera from '../../../components/commonComponent/CustomModalCamera';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {amenityState, updateAmenity} from '../../../store/slices/amenitySlice';
import {serviceState, updateService} from '../../../store/slices/serviceSlice';
import {
  CreateNewUnitApi,
  GetUnitDetailAPi,
} from '../../../apis/homeApi/unitApi';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import CustomPickerDay from '../../../components/commonComponent/CustomPickerDay';
import {UNITTYPE} from '../../../resource/dataPicker';
import {PostImageUnitApi} from '../../../apis/homeApi/fileDataApi';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import {formatNumber, onOpenCamera, onOpenLibrary, validateNumber} from '../../../utils/common';
import ComponentRenderImage from '../../../components/renderComponent/ComponentRenderImage';
import {StraightLine} from '../../../components/commonComponent/LineConponent';

const QuickAddUnit = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const unitId = route.params.unitId;
  const houseId = route.params.houseId;
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const dispatch = useDispatch();

  const [loadingRoom, setLoadingRoom] = useState(true);
  const [modalAddRoom, setModalAddRoom] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalUnitType, setModalUnitType] = useState(false);

  const [unitImages, setUnitImages] = useState<any>([]);
  const [unit, setUnit] = useState<any>();

  useEffect(() => {
    const getListData = async () => {
      await GetUnitDetailAPi(tokenStore, unitId)
        .then(async (res: any) => {
          if (res?.status == 200) {
            setUnit(res?.data);

            let eachData = res?.data?.amenities;
            dispatch(updateAmenity(eachData));

            let eachDataService = res?.data?.chargeServices;
            dispatch(updateService(eachDataService));
            setLoadingRoom(false);
          }
        })
        .catch(error => console.log(error, 'error unit detail'));
    };
    getListData();
  }, []);

  const listService = useMemo(() => {
    let eachService: any = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item: any, index: any) => {
        eachService.push(item);
      });
    }
    return eachService;
  }, [serviceSelect]);

  const listAmenity = useMemo(() => {
    let eachAmenityIds: any = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item: any, index: any) => {
        eachAmenityIds.push(item);
      });
    }
    return eachAmenityIds;
  }, [amenitySelect]);

  const serviceIds = useMemo(() => {
    let eachServiceIds: any = [];
    listService.map((item: any, index: any) => {
      eachServiceIds.push(item?.id);
    });
    return eachServiceIds;
  }, [listService]);

  const amenityIds = useMemo(() => {
    let eachAmenityIds: any = [];
    listAmenity.map((item: any, index: any) => {
      eachAmenityIds.push(item?.id);
    });
    return eachAmenityIds;
  }, [listAmenity]);

  const renderPaidSevice = (item: any, index: any) => {
    return (
      <RenderService
      disabled={true}
        name={item?.name}
        fee={item?.fee}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderFreeSevice = (item: any, index: any) => {
    return <RenderAmenity label={item?.name} disabled={true} />;
  };

  const openCamera = () => {
    setModalCamera(false);
    onOpenCamera().then((image:any) => {
      let eachImg = {...image[0]};
      const eachResult = [...unitImages, eachImg];
      setUnitImages(eachResult);
    })
    .catch(e => {
      setModalCamera(false);
    });
  };

  const openGallery = () => {
    setModalCamera(false);
    onOpenLibrary().then(async (image:any) => {
      const eachResult = [...unitImages];
      const newResult = eachResult.concat(image);
      setUnitImages(newResult);
    })
    .catch(e => {
      setModalCamera(false);
    });
  };

  const createNewUnit = async () => {
    setModalAddRoom(false);
    setLoadingRoom(true);

    let data = {
      name: unit?.name,
      floorNumber: parseInt(validateNumber(`${unit?.floorNumber}`)),
      openTime: '',
      rentMonthlyFee: parseInt(validateNumber(`${unit?.rentMonthlyFee}`)),
      roomType: unit?.roomType,
      area: parseInt(validateNumber(`${unit?.area}`)),
      limitTenantNumber: parseInt(validateNumber(`${unit?.limitTenantNumber}`)),
      depositMoney: parseInt(validateNumber(`${unit?.depositMoney}`)),
      description: unit?.description,
      notice: unit?.notice,
      serviceIds: serviceIds,
      amenityIds: amenityIds,
    };
    await CreateNewUnitApi(tokenStore, houseId, data)
      .then(async (res: any) => {
        if (res?.status == 200) {
          let unitId = res?.data?.id;
          if (unitImages?.length > 0) {
            await PostImageUnitApi(tokenStore, unitId, unitImages)
              .then((res: any) => {
                if (res?.status == 200) {
                  dispatch(updateReloadStatus('quickAddUnit'));
                  navigation.navigate('UnitManager', houseId);
                  setLoadingRoom(false);
                }
              })
              .catch(error => {
                console.log(error, 'postimg');
              });
          } else {
            dispatch(updateReloadStatus('quickAddUnit'));
            navigation.navigate('UnitManager', houseId);
            setLoadingRoom(false);
          }
        }
      })
      .catch(error => {
        console.log(error, 'create');
      });
  };

  return (
    <View style={styles.container}>
      {loadingRoom && <LoadingComponent />}
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
            let eachUnit = {...unit, roomType: item?.key};
            setUnit(eachUnit);
            setModalUnitType(false);
          }}
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
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Thêm phòng nhanh'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      {unit && (
        <ScrollView
          nestedScrollEnabled={true}
          keyboardDismissMode="none"
          style={{paddingHorizontal: 10, paddingTop: 10}}>
          <SuggestComponent
            label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
          />
          <TextTitleComponent label={'Thông tin phòng'} />

          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'input'}
            title={'Tầng'}
            placeholder={'Nhập số tầng'}
            keyboardType={'number-pad'}
            value={`${formatNumber(`${unit?.floorNumber}`)}`}
            onChangeText={(text: any) => {
              let eachUnit = {...unit, floorNumber: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'input'}
            title={'Tên phòng'}
            placeholder={'Nhập tên phòng'}
            value={`${unit?.name}`}
            onChangeText={(text: any) => {
              let eachUnit = {...unit, name: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'input'}
            title={'Giá thuê phòng'}
            placeholder={'Nhập giá thuê phòng'}
            keyboardType={'number-pad'}
            value={`${formatNumber(`${unit?.rentMonthlyFee}`)}`}
            onChangeText={(text: any) => {
              let eachUnit = {...unit, rentMonthlyFee: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentButton
            important={true}
            type={'buttonSelect'}
            viewComponent={{marginTop: 10}}
            title={'Loại phòng'}
            placeholder={'Chọn loại phòng'}
            value={`${unit?.roomType}`}
            onPress={() => setModalUnitType(true)}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputUnit'}
            title={'Diện tích'}
            placeholder={'Nhập diện tích'}
            keyboardType={'number-pad'}
            unit={'m2'}
            value={`${formatNumber(`${unit?.area}`)}`}
            onChangeText={(text: any) => {
              let eachUnit = {...unit, area: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputUnit'}
            title={'Giới hạn số người cho thuê'}
            placeholder={'Nhập số người'}
            keyboardType={'number-pad'}
            unit={'Người'}
            value={`${formatNumber(`${unit?.limitTenantNumber}`)}`}
            onChangeText={(text: any) => {
              let eachUnit = {...unit, limitTenantNumber: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputUnit'}
            title={'Tiền đặt cọc'}
            placeholder={'Nhập số tiền cọc'}
            keyboardType={'number-pad'}
            unit={'VNĐ'}
            value={`${formatNumber(`${unit?.depositMoney}`)}`}
            onChangeText={(text: any) => {
              let eachUnit = {...unit, depositMoney: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputNote'}
            title={'Mô tả'}
            placeholder={'Nhập mô tả phòng'}
            value={`${unit?.description}`}
            onChangeText={(text: any) => {
              let eachUnit = {...unit, description: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputNote'}
            title={'Lưu ý cho người thuê'}
            placeholder={'Nhập lưu ý cho người thuê'}
            value={`${unit?.notice}`}
            onChangeText={(text: any) => {
              let eachUnit = {...unit, notice: text};
              setUnit(eachUnit);
            }}
          />

          {StraightLine()}
          <TextTitleComponent
            label={'Dịch vụ có phí'}
            labelButton={'Chỉnh sửa'}
            // icon={icons.ic_plus}
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
          {StraightLine()}

          <TextTitleComponent
            label={'Tiện ích miễn phí'}
            labelButton={'Chỉnh sửa'}
            // icon={icons.ic_plus}
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

          {StraightLine()}

          <ComponentRenderImage
            title={'Thêm ảnh phòng'}
            label={'Tải lên ảnh mô tả phòng'}
            labelUpload={'Tải lên ảnh phòng'}
            data={unitImages}
            deleteButton={true}
            openModal={() => setModalCamera(true)}
            deleteItem={(item: any) => {
              let result = [...unitImages];
              let newResult = result.filter(itemResult => itemResult !== item);
              setUnitImages(newResult);
            }}
          />

          <View style={{height: 56}} />
          <CustomTwoButtonBottom
            leftLabel={'Trở lại'}
            rightLabel={'Tiếp tục'}
            onPressLeft={() => navigation.goBack()}
            onPressRight={() => setModalAddRoom(true)}
          />
        </ScrollView>
      )}
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
});
export default QuickAddUnit;
