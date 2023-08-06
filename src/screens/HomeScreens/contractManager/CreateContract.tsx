import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, Image, ScrollView, Alert} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {colors, icons, images} from '../../../constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomTimeButtons from '../../../components/commonComponent/CustomTimeButtons';
import CustomModalDateTimePicker from '../../../components/commonComponent/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import CustomPickerDay from '../../../components/commonComponent/CustomPickerDay';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {GetListHausesApi} from '../../../apis/homeApi/houseApi';
import {GetListUnitsApi, GetUnitDetailAPi} from '../../../apis/homeApi/unitApi';
import {
  dateToDMY,
  dateToYMD,
  formatNumber,
  onOpenCamera,
  onOpenLibrary,
  validateNumber,
} from '../../../utils/common';
import {PAYMENTDURATION} from '../../../resource/dataPicker';
import {amenityState, updateAmenity} from '../../../store/slices/amenitySlice';
import {serviceState, updateService} from '../../../store/slices/serviceSlice';
import {tenantState, updateTenant} from '../../../store/slices/tenantSlice';
import CustomPersonInfor from '../../../components/homeComponent/CustomPersonInfor';
import {CreateNewContractApi} from '../../../apis/homeApi/contractApi';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import {PostImageContractApi} from '../../../apis/homeApi/fileDataApi';
import ComponentRenderImage from '../../../components/renderComponent/ComponentRenderImage';
import {StraightLine} from '../../../components/commonComponent/LineConponent';
import RenderServiceInput from '../../../components/renderComponent/RenderServiceInput';
import BottomSheetPicker from '../../../components/commonComponent/BottomSheetPicker';
import { useActionSheet } from '@expo/react-native-action-sheet';

const CreateContract = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const tenantSelect = useSelector(tenantState);
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [timeChargeDate, setTimeChargeDate] = useState(new Date());
  const [loadingAddContract, setLoading] = useState(true);

  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [startChargeDate, setStartChargeDate] = useState<any>();
  const [paymentDuration, setpaymentDuration] = useState<any>();
  const [leasingFee, setLeasingFee] = useState();
  const [depositMoney, setDepositMoney] = useState();
  const [unit, setUnit] = useState<any>();

  const [contractImages, setContractImages] = useState([]);

  const [startDateValue, setStartDateValue] = useState('Chọn ngày');
  const [endDateValue, setEndDateValue] = useState('Chọn ngày');
  const [startChargeDateValue, setStartChargeDateValue] = useState('');
  const [modalStartDate, setModalStartDate] = useState(false);
  const [modalEndDate, setModalEndDate] = useState(false);
  const [modalStartChargeDate, setModalStartChargeDate] = useState(false);
  const [modalPaymentDuration, setModalPaymentDuration] = useState(false);
  const [modalCreateContract, setModalCreateContract] = useState(false);

  const [hause, setHause] = useState<any>(null);
  const [listHauses, setListHauses] = useState([]);
  const [listUnits, setListUnits] = useState([]);
  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);
  const [listTenant, setListTenant] = useState([]);
  const [modalHause, setModalHause] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);

  useEffect(() => {
    const getListData = async () => {
      await GetListHausesApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            setListHauses(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
      dispatch(updateAmenity([]));
      dispatch(updateService([]));
      dispatch(updateTenant([]));
    };
    getListData();
  }, []);

  useMemo(() => {
    let eachService: any = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item: any, index: any) => {
        let newItem = {...item, usageAmount: ''};
        eachService.push(newItem);
      });
    }
    setListService(eachService);
  }, [serviceSelect]);

  useMemo(() => {
    let eachAmenityIds: any = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item: any, index: any) => {
        if (item?.isCheck == true) {
          eachAmenityIds.push(item);
        }
      });
    }
    setListAmenity(eachAmenityIds);
  }, [amenitySelect]);

  useMemo(() => {
    let eachTenants: any = [];
    if (tenantSelect.length > 0) {
      tenantSelect.map((item: any, index: any) => {
        if (item?.isCheck == true) {
          eachTenants.push(item);
        }
      });
    }
    setListTenant(eachTenants);
  }, [tenantSelect]);

  const renderSelectSevice = (item: any, index: any) => {
    return (
      <RenderServiceInput
        viewComponent={{marginBottom: 10}}
        isProgressive={item?.isProgressive}
        placeholder={
          item?.isProgressive
            ? 'Nhập chỉ số ban đầu'
            : `Nhập số ${item?.calculateUnit}`
        }
        name={item?.name}
        fee={item?.fee}
        calculateUnit={item?.calculateUnit}
        value={`${formatNumber(`${item?.initUsageAmount}` ?? '')}`}
        onChangeText={(text: any) => {
          let eachService: any = [...listService];
          eachService[index] = {...item, initUsageAmount: text};
          setListService(eachService);
        }}
      />
    );
  };

  const renderSelectAmenity = (item: any, index: any) => {
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
      const eachResult: any = [...contractImages, eachImg];
      setContractImages(eachResult);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const openGallery = () => {
    onOpenLibrary().then(async (image:any) => {
      const eachResult = [...contractImages];
      const newResult = eachResult.concat(image);
      setContractImages(newResult);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const getListUnit = async (item: any) => {
    setLoading(true);
    setHause(item);
    setUnit([]);
    setModalHause(false);
    let hauseId = item?.id;
    await GetListUnitsApi(tokenStore, hauseId)
      .then((res: any) => {
        if (res?.status == 200) {
          setListUnits(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error.response.data));
  };
  const getUnitDetailAPi = async (item: any) => {
    setLoading(true);
    dispatch(updateTenant([]));
    await GetUnitDetailAPi(tokenStore, item?.id)
      .then((res: any) => {
        if (res?.status == 200) {
          setUnit(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error, 'error unit detail'));
  };
  useMemo(() => {
    setLeasingFee(unit?.rentMonthlyFee);
    setDepositMoney(unit?.depositMoney);
    setListAmenity(unit?.amenities);
    let services: any = [];
    if (unit?.chargeServices?.length > 0) {
      unit?.chargeServices?.forEach((element: any) => {
        let newData = {...element, initUsageAmount: ''};
        services.push(newData);
      });
    }
    setListService(services);
  }, [unit]);
  const renderSelectTenant = (item: any, index: any) => {
    return (
      <CustomPersonInfor
        disabled={true}
        styleView={{marginBottom: 10}}
        userName={`${item?.fullName}`}
        phoneNumber={`${item?.phoneNumber}`}
        avatar={item?.avatarImage?.fileUrl}
      />
    );
  };

  const warning = () => {
    setModalCreateContract(false);
    Alert.alert('Cảnh báo !!!', 'Vui lòng điền đủ thông tin cần thiết');
  };

  const valueIsReady = () =>
    unit != null &&
    startDate != null &&
    endDate != null &&
    startChargeDate != null &&
    paymentDuration != null &&
    leasingFee != null &&
    depositMoney != null;

  const createNewContract = async () => {
    setModalCreateContract(false);
    setLoading(true);
    let eachServiceIds: any = [];
    let eachAmenityIds: any = [];
    let eachTenantIds: any = [];
    listService.map((item: any, index: any) => {
      let serviceId = {
        id: item?.id,
        initUsageAmount: parseInt(
          `${validateNumber(`${item?.initUsageAmount ?? '0'}`)}`,
        ),
      };
      eachServiceIds.push(serviceId);
    });
    listAmenity.map((item: any, index: any) => {
      eachAmenityIds.push(item?.id);
    });
    listTenant.map((item: any, index: any) => {
      eachTenantIds.push(item?.id);
    });
    let data = {
      startDate: startDate,
      endDate: endDate,
      startChargeDate: startChargeDate,
      paymentDuration: parseInt(paymentDuration?.value),
      leasingFee: parseInt(validateNumber(`${leasingFee}`)),
      depositMoney: parseInt(validateNumber(`${depositMoney}`)),
      description: '',
      termAndCondition: '',
      unitId: unit?.id,
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
      tenantIds: eachTenantIds,
    };

    await CreateNewContractApi(tokenStore, data)
      .then(async (res: any) => {
        if (res?.status == 200) {
          let contractId = res?.data?.id;
          if (contractImages.length > 0) {
            await PostImageContractApi(tokenStore, contractId, contractImages)
              .then((res: any) => {
                if (res?.status == 200) {
                  dispatch(updateReloadStatus('updateImageContractSuccess'));
                  setLoading(false);
                  navigation.navigate('ContractManager');
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            dispatch(updateReloadStatus('createNewContractSuccess'));
            setLoading(false);
            navigation.navigate('ContractManager');
          }
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      {loadingAddContract && <LoadingComponent />}
      {modalCreateContract && (
        <CustomModalNotify
          title={'Tạo mới hợp đồng'}
          label={'Bạn có muốn thêm mới hợp đồng này ?'}
          modalVisible={modalCreateContract}
          onRequestClose={() => setModalCreateContract(false)}
          pressConfirm={() => {
            valueIsReady() == true ? createNewContract() : warning();
          }}
        />
      )}
      {modalHause && (
         <BottomSheetPicker
         data={listHauses}
         handlerShow={(index: number) => {
           if (index === 0) {
            setModalHause(false);
           }
         }}
         onPressItem={(item: any) => {
           getListUnit(item);
         }}
         handlerCancel={() => setModalHause(false)}
       />
     
      )}
      {modalUnit && (
           <BottomSheetPicker
           data={listUnits}
           handlerShow={(index: number) => {
             if (index === 0) {
              setModalUnit(false);
             }
           }}
           onPressItem={(item: any) => {
            getUnitDetailAPi(item);
            setModalUnit(false);
           }}
           handlerCancel={() => setModalUnit(false)}
         />
   
      )}
      {modalStartDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalStartDate(false)}
          value={timeStart}
          mode={'date'}
          openPicker={modalStartDate}
          onDateChange={(value: any) => {
            setTimeStart(value);
            setStartDate(dateToYMD(value));
            setStartDateValue(dateToDMY(value));
          }}
          onPress={() => setModalStartDate(false)}
        />
      )}
      {modalEndDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalEndDate(false)}
          value={timeEnd}
          mode={'date'}
          openPicker={modalEndDate}
          onDateChange={(value: any) => {
            setTimeEnd(value);
            setEndDate(dateToYMD(value));
            setEndDateValue(dateToDMY(value));
          }}
          onPress={() => setModalEndDate(false)}
        />
      )}
      {modalStartChargeDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalStartChargeDate(false)}
          value={timeChargeDate}
          mode={'date'}
          openPicker={modalStartChargeDate}
          onDateChange={(value: any) => {
            setTimeChargeDate(value);
            setStartChargeDate(dateToYMD(value));
            setStartChargeDateValue(dateToDMY(value));
          }}
          onPress={() => setModalStartChargeDate(false)}
        />
      )}
      {modalPaymentDuration && (
        <CustomPickerDay
          data={PAYMENTDURATION}
          modalVisible={modalPaymentDuration}
          onRequestClose={() => setModalPaymentDuration(false)}
          onPress={(item: any) => {
            setpaymentDuration(item);
            setModalPaymentDuration(false);
          }}
        />
      )}
     
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Tạo hợp đồng'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <SuggestComponent
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <TextTitleComponent label={'Thông tin hợp đồng'} />

        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Tòa nhà'}
          placeholder={'Chọn tòa nhà'}
          value={hause?.name}
          onPress={() => setModalHause(true)}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Phòng'}
          placeholder={'Chọn phòng'}
          value={unit?.name}
          onPress={() => setModalUnit(true)}
        />

        <CustomTimeButtons
          styleContainer={{marginTop: 20}}
          important={true}
          title={'Thời hạn'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={startDateValue}
          valueRight={endDateValue}
          onPressLeft={() => {
            setStartDate(dateToYMD(timeStart));
            setStartDateValue(dateToDMY(timeStart));
            setModalStartDate(true);
          }}
          onPressRightt={() => {
            setEndDate(dateToYMD(timeEnd));
            setEndDateValue(dateToDMY(timeEnd));
            setModalEndDate(true);
          }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Ngày bắt đầu tính tiền'}
          placeholder={'Chọn ngày'}
          value={startChargeDateValue}
          onPress={() => {
            setStartChargeDate(dateToYMD(timeChargeDate));
            setStartChargeDateValue(dateToDMY(timeChargeDate));
            setModalStartChargeDate(true);
          }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Kỳ thanh toán tiền phòng'}
          placeholder={`Chọn kỳ thanh toán`}
          value={paymentDuration?.key}
          onPress={() => setModalPaymentDuration(true)}
        />

        <TextTitleComponent label={'Tiền phòng'} />

        <ComponentInput
          important={true}
          type={'inputUnit'}
          title={'Tiền thuê phòng'}
          placeholder={'Nhập tiền thuê phòng'}
          keyboardType={'number-pad'}
          unit={'VNĐ'}
          value={`${formatNumber(`${leasingFee}`)}`}
          onChangeText={(text: any) => setLeasingFee(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputUnit'}
          title={'Tiền cọc'}
          placeholder={'Nhập tiền cọc'}
          keyboardType={'number-pad'}
          unit={'VNĐ'}
          value={`${formatNumber(`${depositMoney}`)}`}
          onChangeText={(text: any) => setDepositMoney(text)}
        />

        {StraightLine()}
        <TextTitleComponent
          label={'Điều khoản hợp đồng'}
          labelButton={'Xem chi tiết'}
          onPress={() => navigation.navigate('DetailedContractTerms')}
        />

        {StraightLine()}

        <TextTitleComponent
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
        />

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listService?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={1}
                keyExtractor={(key: any) => key.id}
                data={listService}
                renderItem={({item, index}) => renderSelectSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listService?.length}`}</Text>
        </View>

        {StraightLine()}

        <TextTitleComponent
          label={'Tiện ích miễn phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseAmenity')}
        />

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listAmenity?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(key: any) => key.id}
                data={listAmenity}
                renderItem={({item, index}) => renderSelectAmenity(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listAmenity?.length}`}</Text>
        </View>

        {StraightLine()}

        <TextTitleComponent
          label={'Danh sách người ở'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseTenant')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listTenant.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={1}
                keyExtractor={(key: any) => key.id}
                data={listTenant}
                renderItem={({item, index}) => renderSelectTenant(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        {StraightLine()}
        <ComponentRenderImage
          title={'Thêm ảnh hợp đồng'}
          label={'Ảnh hợp đồng'}
          labelUpload={'Thêm ảnh'}
          data={contractImages}
          deleteButton={true}
          openModal={() => renderActionSheet()}
          deleteItem={(item: any) => {
            let result = [...contractImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            setContractImages(newResult);
          }}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          styleButtonLeft={styles.styleButtonLeft}
          styleLabelLeft={styles.styleLabelLeft}
          leftLabel={'Trở lại'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalCreateContract(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
  styleButtonLeft: {
    borderColor: 'rgba(254, 122, 55, 1)',
    backgroundColor: 'white',
    marginLeft: 5,
  },
  styleLabelLeft: {
    color: 'rgba(254, 122, 55, 1)',
    fontSize: 15,
    fontWeight: '600',
  },
});
export default CreateContract;
