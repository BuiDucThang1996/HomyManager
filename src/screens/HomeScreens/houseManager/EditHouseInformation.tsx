import React, {useEffect, useState, useMemo} from 'react';
import {ScrollView, StyleSheet, FlatList, View, Alert} from 'react-native';
import {colors, icons} from '../../../constants';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  GetDistrictByCityIdApi,
  GetLocationCitysApi,
  GetWardByDistrictIdApi,
  HauseDetailApi,
  PutBuildingApi,
} from '../../../apis/homeApi/houseApi';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomTimeButtons from '../../../components/commonComponent/CustomTimeButtons';
import CustomModalDateTimePicker from '../../../components/commonComponent/CustomModalDateTimePicker';
import {StraightLine} from '../../../components/commonComponent/LineConponent';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import CustomPickerDay from '../../../components/commonComponent/CustomPickerDay';
import {BILLINGDATE, PAYMENTDATE} from '../../../resource/dataPicker';
import CustomBankAccountInfor from '../../../components/commonComponent/CustomBankAccountInfor';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import {bankAccountState} from '../../../store/slices/bankAccountSlice';
import RenderService from '../../../components/renderComponent/RenderService';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import {serviceState} from '../../../store/slices/serviceSlice';
import {amenityState} from '../../../store/slices/amenitySlice';
import BottomSheetPicker from '../../../components/commonComponent/BottomSheetPicker';

const EditHouseInformation = () => {
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(true);
  const [hause, setHause] = useState<any>();
  const route = useRoute();
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const dispatch = useDispatch();
  const hauseId: any = route.params;
  const [closeTime, setCloseTime] = useState(new Date());
  const [openTime, setOpenTime] = useState(new Date());
  const [openTimeValue, setOpenTimeValue] = useState('');
  const [closeTimeValue, setCloseTimeValue] = useState('');
  const [modalopenTime, setModalopenTime] = useState(false);
  const [modalcloseTime, setModalcloseTime] = useState(false);
  const bankAccountsStore = useSelector(bankAccountState);

  const [modalbillingDate, setModalbillingDate] = useState(false);
  const [modalpaymentDateFrom, setModalpaymentDateFrom] = useState(false);
  const [modalpaymentDateTo, setModalpaymentDateTo] = useState(false);
  const [modalCity, setModalCity] = useState(false);
  const [modalDistrict, setModalDistrict] = useState(false);
  const [modalWard, setModalWard] = useState(false);

  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  useEffect(() => {
    const getDataHause = async () => {
      await HauseDetailApi(tokenStore, hauseId)
        .then(async (res: any) => {
          if (res?.status == 200) {
            setHause(res?.data);
            setLoading(false);
            setOpenTime(new Date(`${res?.data?.openTime}`));
            setCloseTime(new Date(`${res?.data?.closeTime}`));
            let eachOpenTime = new Date(`${res?.data?.openTime}`);
            let eachCloseTime = new Date(`${res?.data?.closeTime}`);
            setOpenTimeValue(eachOpenTime.toLocaleTimeString('en-VN'));
            setCloseTimeValue(eachCloseTime.toLocaleTimeString('en-VN'));
          }
          await GetLocationCitysApi(tokenStore)
            .then((res: any) => {
              if (res?.status == 200) {
                setListCity(res?.data);
              }
            })
            .catch(error => console.log(error));
          await GetDistrictByCityIdApi(tokenStore, res?.data?.city?.id)
            .then((res: any) => {
              if (res?.status == 200) {
                setListDistrict(res?.data);
              }
            })
            .catch(error => console.log(error));
          await GetWardByDistrictIdApi(tokenStore, res?.data?.district?.id)
            .then((res: any) => {
              if (res?.status == 200) {
                setListWard(res?.data);
                setLoading(false);
              }
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.error(error));
    };
    getDataHause();
  }, []);

  const getDistrictData = async (item: any) => {
    let eachHause = {...hause, city: item, district: null, ward: null};
    setHause(eachHause);

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
    let eachHause = {...hause, district: item, ward: null};
    setHause(eachHause);
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

  useMemo(() => {
    let eachHause = {...hause, bankAccount: bankAccountsStore};
    setHause(eachHause);
  }, [bankAccountsStore]);

  useMemo(() => {
    let eachService: any = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item: any, index: number) => {
        if (item?.isCheck == true) {
          eachService.push(item);
        }
      });
      let eachHause = {...hause, chargeServices: eachService};
      setHause(eachHause);
    }
  }, [serviceSelect]);

  useMemo(() => {
    let eachAmenityIds: any = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item: any, index: number) => {
        if (item?.isCheck == true) {
          eachAmenityIds.push(item);
        }
      });
      let eachHause = {...hause, amenities: eachAmenityIds};
      setHause(eachHause);
    }
  }, [amenitySelect]);

  const renderSevices = (item: any, index: number) => {
    return (
      <RenderService
        disabled={true}
        name={item?.name}
        fee={item?.fee}
        icon={item?.icon}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderAmenitys = (item: any, index: any) => {
    return <RenderAmenity disabled={true} label={item?.name} />;
  };

  const handleEditHouse = async () => {
    let eachServiceIds: any = [];
    let eachAmenityIds: any = [];
    hause?.chargeServices?.map((item: any, index: number) => {
      eachServiceIds.push(item?.id);
    });
    hause?.amenities?.map((item: any, index: number) => {
      eachAmenityIds.push(item?.id);
    });
    setLoading(true);
    let data = {
      name: hause?.name,
      numberOfFloor: parseInt(`${hause?.numberOfFloor}`),
      openTime: hause?.openTime,
      closeTime: hause?.closeTime,
      leasingFee: parseInt(`${hause?.leasingFee}`),
      description: hause?.description,
      billingDate: parseInt(`${hause?.billingDate}`),
      paymentDateFrom: parseInt(`${hause?.paymentDateFrom}`),
      paymentDateTo: parseInt(`${hause?.paymentDateTo}`),
      notice: hause?.notice,
      billNotice: hause?.billNotice,
      address: hause?.address,
      cityId: hause?.city?.id,
      districtId: hause?.district?.id,
      wardId: hause?.ward?.id,
      bankAccountId: hause?.bankAccount?.id,
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
    };

    await PutBuildingApi(tokenStore, hauseId, data)
      .then((res: any) => {
        if (res?.status === 200) {
          dispatch(updateReloadStatus('updateHouseSuccess'));
          navigation.goBack();
          setLoading(false);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <LoadingComponent
          modalVisible={loading}
          pressBack={() => navigation.goBack()}
        />
      )}
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
            let eachHause = {...hause, ward: item};
            setHause(eachHause);
            setModalWard(false);
          }}
          handlerCancel={() => setModalWard(false)}
        />
      )}
      {modalbillingDate && (
        <CustomPickerDay
          data={BILLINGDATE}
          modalVisible={modalbillingDate}
          onRequestClose={() => setModalbillingDate(false)}
          onPress={(item: any) => {
            let eachHause = {...hause, billingDate: item?.value};
            setHause(eachHause);
            setModalbillingDate(false);
          }}
        />
      )}
      {modalpaymentDateTo && (
        <CustomPickerDay
          data={PAYMENTDATE}
          modalVisible={modalpaymentDateTo}
          onRequestClose={() => setModalpaymentDateTo(false)}
          onPress={(item: any) => {
            let eachHause = {...hause, paymentDateTo: item?.value};
            setHause(eachHause);
            setModalpaymentDateTo(false);
          }}
        />
      )}
      {modalpaymentDateFrom && (
        <CustomPickerDay
          data={PAYMENTDATE}
          modalVisible={modalpaymentDateFrom}
          onRequestClose={() => setModalpaymentDateFrom(false)}
          onPress={(item: any) => {
            let eachHause = {...hause, paymentDateFrom: item?.value};
            setHause(eachHause);
            setModalpaymentDateFrom(false);
          }}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Thay đổi thông tin tòa nhà'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10, width: '100%'}}>
        <TextTitleComponent label={'Thông tin tòa nhà'} />
        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên tòa nhà'}
          placeholder={'Nhập tên tòa nhà'}
          value={hause?.name}
          onChangeText={(text: any) => {
            let eachHause = {...hause, name: text};
            setHause(eachHause);
          }}
        />

        <ComponentInput
          important={true}
          keyboardType={'number-pad'}
          type={'input'}
          title={'Số tầng'}
          placeholder={'Nhập số tầng'}
          value={`${hause?.numberOfFloor}`}
          onChangeText={(text: any) => {
            let eachHause = {...hause, numberOfFloor: text};
            setHause(eachHause);
          }}
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
          value={`${hause?.leasingFee}`}
          onChangeText={(text: string) => {
            let eachHause = {...hause, leasingFee: text};
            setHause(eachHause);
          }}
        />

        <ComponentInput
          type={'inputNote'}
          title={'Mô tả'}
          placeholder={'Nhập mô tả cho tòa nhà'}
          viewComponent={{marginTop: 10}}
          value={`${hause?.description}`}
          onChangeText={(text: string) => {
            let eachHause = {...hause, description: text};
            setHause(eachHause);
          }}
        />
        {StraightLine()}
        <ComponentButton
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Tỉnh/ Thành phố'}
          placeholder={'Chọn Tỉnh/ Thành phố'}
          value={`${hause?.city?.name ?? ''}`}
          onPress={() => setModalCity(true)}
        />
        <ComponentButton
          disabled={hause?.city?.name ? false : true}
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Quận/ Huyện'}
          placeholder={'Chọn Quận/ Huyện'}
          value={`${hause?.district?.name ?? ''}`}
          onPress={() => setModalDistrict(true)}
        />
        <ComponentButton
          disabled={hause?.city?.name && hause?.district?.name ? false : true}
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Phường/ Xã'}
          placeholder={'Chọn Phường/ Xã'}
          value={`${hause?.ward?.name ?? ''}`}
          onPress={() => setModalWard(true)}
        />

        <ComponentInput
          type="inputNote"
          title={'Địa chỉ cụ thể'}
          placeholder={'Nhập địa chỉ cụ thể'}
          viewComponent={{marginTop: 10}}
          value={`${hause?.address}`}
          onChangeText={(text: string) => {
            let eachHause = {...hause, address: text};
            setHause(eachHause);
          }}
        />
        <ComponentButton
          type={'buttonValue'}
          important={true}
          icon={icons.ic_down}
          title={'Ngày chốt tiền'}
          placeholder={'Chọn ngày'}
          value={
            hause?.billingDate == -1
              ? 'Đầu tháng'
              : hause?.billingDate == 0
              ? 'Cuối tháng'
              : `Ngày ${hause?.billingDate}`
          }
          onPress={() => setModalbillingDate(true)}
        />
        <CustomTimeButtons
          styleContainer={{marginTop: 20}}
          title={'Thời gian nộp tiền phòng'}
          leftLabel={'Từ ngày'}
          rightLabel={'Đến ngày'}
          iconLeft={icons.ic_down}
          iconRight={icons.ic_down}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={hause?.paymentDateFrom}
          valueRight={hause?.paymentDateTo}
          onPressLeft={() => setModalpaymentDateFrom(true)}
          onPressRightt={() => setModalpaymentDateTo(true)}
        />
        <TextTitleComponent
          label={'Thông tin thanh toán'}
          labelButton={'Chỉnh sửa'}
          // icon={icons.ic_plus}
          onPress={() => {
            dispatch(updateReloadStatus('chooseABank'));
            navigation.navigate('ChooseABank');
          }}
        />
        {hause?.bankAccount && (
          <CustomBankAccountInfor
          disabledDetail={true}
            viewCustom={{marginBottom: 10}}
            imageUrl={hause?.bankAccount?.bank?.logo}
            userName={hause?.bankAccount?.name}
            accountNo={hause?.bankAccount?.accountNo}
          />
        )}
        {StraightLine()}

        <TextTitleComponent
          label={'Dịch vụ có phí'}
          labelButton={'Chỉnh sửa'}
          // icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseService')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {hause?.chargeServices?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(key, index) => `${key?.name}${index.toString()}`}
                data={hause?.chargeServices}
                renderItem={({item, index}) => renderSevices(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        {StraightLine()}

        <TextTitleComponent
          label={'Tiện ích miễn phí'}
          labelButton={'Chỉnh sửa'}
          // icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseAmenity')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {hause?.amenities?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(key, index) => `${key?.name}${index.toString()}`}
                data={hause?.amenities}
                renderItem={({item, index}) => renderAmenitys(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{height: 54}} />
      </ScrollView>
      <CustomButtonBottom
        label={'Thay đổi thông tin'}
        onPress={() => handleEditHouse()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default EditHouseInformation;
