import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GetContractDetailAPi,
  PutContractAPi,
} from '../../../apis/homeApi/contractApi';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {colors, icons} from '../../../constants';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import {
  dateToDMY,
  dateToYMD,
  formatNumber,
  onOpenCamera,
  onOpenLibrary,
  validateNumber,
} from '../../../utils/common';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import CustomTimeButtons from '../../../components/commonComponent/CustomTimeButtons';
import {StraightLine} from '../../../components/commonComponent/LineConponent';
import ComponentRenderImage from '../../../components/renderComponent/ComponentRenderImage';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import CustomPersonInfor from '../../../components/homeComponent/CustomPersonInfor';
import RenderServiceInput from '../../../components/renderComponent/RenderServiceInput';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import {amenityState} from '../../../store/slices/amenitySlice';
import {serviceState} from '../../../store/slices/serviceSlice';
import {tenantState} from '../../../store/slices/tenantSlice';
import CustomModalDateTimePicker from '../../../components/commonComponent/CustomModalDateTimePicker';
import {PAYMENTDURATION} from '../../../resource/dataPicker';
import CustomPickerDay from '../../../components/commonComponent/CustomPickerDay';
import CustomModalCamera from '../../../components/commonComponent/CustomModalCamera';
import {
  DeleteImageApi,
  PostImageContractApi,
} from '../../../apis/homeApi/fileDataApi';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';

const EditContractInfor = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const contractId: any = route.params;
  const tokenStore = useSelector(token);
  const [contract, setContract] = useState<any>();
  const [loading, setLoading] = useState(true);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const tenantSelect = useSelector(tenantState);
  // console.log(tokenStore);
  // console.log(contractId);

  const [modalStartDate, setModalStartDate] = useState(false);
  const [modalEndDate, setModalEndDate] = useState(false);
  const [modalStartChargeDate, setModalStartChargeDate] = useState(false);
  const [modalPaymentDuration, setModalPaymentDuration] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalEditContract, setModalEditContract] = useState(false);

  const [contractImages, setContractImages] = useState([]);
  // console.log(contract?.chargeServices);

  useEffect(() => {
    const getData = async () => {
      await GetContractDetailAPi(tokenStore, contractId)
        .then((res: any) => {
          if (res?.status == 200) {
            let dataResponse = res?.data;
            let eachStartDate = new Date(dataResponse?.startDate);
            let eachEndDate = new Date(dataResponse?.endDate);
            let eachStartChargeDate = new Date(dataResponse?.startChargeDate);
            let startDateValue = dateToDMY(eachStartDate);
            let endDateValue = dateToDMY(eachEndDate);
            let startChargeDateValue = dateToDMY(eachStartChargeDate);
            setContractImages(res?.data?.images);
            setContract({
              ...dataResponse,
              startDateValue,
              endDateValue,
              startChargeDateValue,
            });
            setLoading(false);
          }
        })
        .catch(error => {
          Alert.alert(error);
        });
    };
    getData();
  }, []);

  useMemo(() => {
    let eachService: any = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item: any, index: any) => {
        let eachItem = {...item};
        let newItem = {
          chargeService: {
            id: eachItem?.id,
            calculateUnit: eachItem?.calculateUnit,
            description: eachItem?.description,
            fee: eachItem?.fee,
            isProgressive: eachItem?.isProgressive,
            name: eachItem?.name,
          },
          id: eachItem?.id,
          initUsageAmount: eachItem?.initUsageAmount,
          isActive: eachItem?.isActive,
        };
        eachService.push(newItem);
      });
    }
    let eachContract = {...contract, chargeServices: eachService};
    setContract(eachContract);
  }, [serviceSelect]);

  useMemo(() => {
    let eachAmenity: any = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item: any, index: number) => {
        if (item?.isCheck == true) {
          eachAmenity.push(item);
        }
      });
    }
    let eachContract = {...contract, amenities: eachAmenity};
    setContract(eachContract);
  }, [amenitySelect]);

  useMemo(() => {
    let eachTenant: any = [];
    if (tenantSelect.length > 0) {
      tenantSelect.map((item: any, index: number) => {
        if (item?.isCheck == true) {
          eachTenant.push(item);
        }
      });
    }
    let eachContract = {...contract, tenants: eachTenant};
    setContract(eachContract);
  }, [tenantSelect]);

  const renderSelectTenant = (item: any, index: number) => {
    return (
      <CustomPersonInfor
        styleView={{marginBottom: 10}}
        userName={`${item?.fullName}`}
        phoneNumber={`${item?.phoneNumber}`}
        avatar={item?.avatarImage?.fileUrl}
      />
    );
  };

  const renderSelectSevice = (item: any, index: number) => {
    return (
      <RenderServiceInput
        viewComponent={{marginBottom: 10}}
        isProgressive={item?.isProgressive}
        placeholder={'Nhập chỉ số ban đầu'}
        name={item?.chargeService?.name}
        fee={item?.chargeService?.fee}
        calculateUnit={item?.chargeService?.calculateUnit}
        value={`${formatNumber(`${item?.initUsageAmount}` ?? '')}`}
        onChangeText={(text: any) => {
          let eachContract = {...contract};
          let eachService = eachContract?.chargeServices;
          eachService[index] = {...item, initUsageAmount: text};
          let newContract = {...contract, chargeService: eachService};
          setContract(newContract);
        }}
      />
    );
  };

  const renderSelectAmenity = (item: any, index: number) => {
    return <RenderAmenity label={item?.name} />;
  };
  const openCamera = () => {
    setModalCamera(false);
    onOpenCamera().then((image:any) => {
      let eachImg = {...image[0]};
      const eachResult: any = [...contractImages, eachImg];
      setContractImages(eachResult);
    })
    .catch(e => {
      setModalCamera(false);
    });
  };

  const openGallery = () => {
    setModalCamera(false);
    onOpenLibrary().then(async (image:any) => {
      const eachResult = [...contractImages];
      const newResult = eachResult.concat(image);
      setContractImages(newResult);
    })
    .catch(e => {
      setModalCamera(false);
    });
  };

  const deleteImage = async (item: any) => {
    if (typeof item?.fileUrl == 'string') {
      Alert.alert(
        'Lưu ý',
        'Ảnh này đang được lưu trên hệ thống,bạn có muốn xóa ảnh này?',
        [
          {
            text: 'Hủy',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Xóa',
            onPress: async () => {
              setLoading(true);
              await DeleteImageApi(tokenStore, item?.id).then((res: any) => {
                if (res?.status == 200) {
                  let result = [...contractImages];
                  let newResult = result.filter(
                    itemResult => itemResult !== item,
                  );
                  setContractImages(newResult);
                  setLoading(false);
                } else {
                  Alert.alert('Cảnh báo', 'Có lỗi xảy ra,không xóa được ảnh!');
                  setLoading(false);
                }
              });
            },
          },
        ],
      );
    } else {
      let result = [...contractImages];
      let newResult = result.filter(itemResult => itemResult !== item);
      setContractImages(newResult);
    }
  };

  const warning = () => {
    setModalEditContract(false);
    Alert.alert('Cảnh báo !!!', 'Vui lòng điền đủ thông tin cần thiết');
  };

  const valueIsReady = () =>
    contract?.startDate != null &&
    contract?.endDate != null &&
    contract?.startChargeDate != null &&
    contract?.paymentDuration != null &&
    contract?.leasingFee != null &&
    contract?.depositMoney != null;

  const createNewContract = async () => {
    setModalEditContract(false);
    setLoading(true);
    let eachServiceIds: any = [];
    let eachAmenityIds: any = [];
    let eachTenantIds: any = [];
    contract?.chargeServices?.map((item: any, index: number) => {
      let serviceId = {
        id: item?.chargeService?.id,
        initUsageAmount: parseInt(
          `${validateNumber(`${item?.initUsageAmount ?? '0'}`)}`,
        ),
      };
      eachServiceIds.push(serviceId);
    });
    contract?.amenities?.map((item: any, index: number) => {
      eachAmenityIds.push(item?.id);
    });
    contract?.tenants?.map((item: any, index: number) => {
      eachTenantIds.push(item?.id);
    });
    let data = {
      startDate: contract?.startDate,
      endDate: contract?.endDate,
      startChargeDate: contract?.startChargeDate,
      paymentDuration: parseInt(`${contract?.paymentDuration ?? 0}`),
      leasingFee: parseInt(`${validateNumber(`${contract?.leasingFee ?? 0}`)}`),
      depositMoney: parseInt(
        `${validateNumber(`${contract?.depositMoney ?? 0}`)}`,
      ),
      description: contract?.description ?? '',
      termAndCondition: contract?.termAndCondition ?? '',
      status: contract?.status,
      unitId: contract?.unit?.id,
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
      tenantIds: eachTenantIds,
    };
    // console.log(data,'dataaaa');

    await PutContractAPi(tokenStore, data, contractId)
      .then(async (res: any) => {
        if (res?.status == 200) {
          if (contractImages.length > 0) {
            let photo: any = [];
            contractImages.map((image, index) => {
              if (typeof image !== 'string') {
                photo.push(image);
              }
            });
            await PostImageContractApi(tokenStore, contractId, photo)
              .then((res: any) => {
                if (res?.status == 200) {
                  dispatch(updateReloadStatus('EditContractSuccess'));
                  navigation.navigate('ContractManager');
                  setLoading(false);
                }
              })
              .catch(error => {
                console.log(error, 'sendImageError');
              });
          }
          dispatch(updateReloadStatus('EditContractSuccess'));
          navigation.navigate('ContractManager');
          setLoading(false);
        } else {
          Alert.alert('Lỗi', 'Có lỗi sảy ra,vui lòng thử lại !');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      {modalEditContract && (
        <CustomModalNotify
          title={'Chỉnh sửa hợp đồng'}
          label={'Bạn có muốn chỉnh sửa hợp đồng này ?'}
          modalVisible={modalEditContract}
          onRequestClose={() => setModalEditContract(false)}
          pressConfirm={() => {
            valueIsReady() == true ? createNewContract() : warning();
          }}
        />
      )}
      {modalStartDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalStartDate(false)}
          value={new Date(contract?.startDate)}
          mode={'date'}
          openPicker={modalStartDate}
          onDateChange={(value: any) => {
            let eachContract = {
              ...contract,
              startDateValue: dateToDMY(value),
              startDate: dateToYMD(value),
            };
            setContract(eachContract);
          }}
          onPress={() => setModalStartDate(false)}
        />
      )}
      {modalEndDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalEndDate(false)}
          value={new Date(contract?.endDate)}
          mode={'date'}
          openPicker={modalEndDate}
          onDateChange={(value: any) => {
            let eachContract = {
              ...contract,
              endDateValue: dateToDMY(value),
              endDate: dateToYMD(value),
            };
            setContract(eachContract);
          }}
          onPress={() => setModalEndDate(false)}
        />
      )}
      {modalStartChargeDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalStartChargeDate(false)}
          value={new Date(contract?.startChargeDate)}
          mode={'date'}
          openPicker={modalStartChargeDate}
          onDateChange={(value: any) => {
            let eachContract = {
              ...contract,
              startChargeDateValue: dateToDMY(value),
              startChargeDate: dateToYMD(value),
            };
            setContract(eachContract);
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
            let eachContract = {
              ...contract,
              paymentDuration: item?.value,
            };
            setContract(eachContract);
            setModalPaymentDuration(false);
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
        label={'Chỉnh sửa hợp đồng'}
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
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Phòng'}
          placeholder={'Chọn phòng'}
          value={contract?.unit?.name}
          editable={false}
        />

        <CustomTimeButtons
          important={true}
          styleContainer={{marginTop: 20}}
          title={'Thời hạn'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={`${contract?.startDateValue}`}
          valueRight={`${contract?.endDateValue}`}
          onPressLeft={() => {
            setModalStartDate(true);
          }}
          onPressRightt={() => {
            setModalEndDate(true);
          }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Ngày bắt đầu tính tiền'}
          placeholder={'Chọn ngày'}
          value={`${contract?.startChargeDateValue}`}
          onPress={() => {
            setModalStartChargeDate(true);
          }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Kỳ thanh toán tiền phòng'}
          placeholder={`Chọn kỳ thanh toán`}
          value={`${contract?.paymentDuration} Tháng`}
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
          value={`${formatNumber(`${contract?.leasingFee}`)}`}
          onChangeText={(text: any) => {
            let newData = {...contract, leasingFee: text};
            setContract(newData);
          }}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputUnit'}
          title={'Tiền cọc'}
          placeholder={'Nhập tiền cọc'}
          keyboardType={'number-pad'}
          unit={'VNĐ'}
          value={`${formatNumber(`${contract?.depositMoney}`)}`}
          onChangeText={(text: any) => {
            let newData = {...contract, depositMoney: text};
            setContract(newData);
          }}
        />

        {StraightLine()}
        <TextTitleComponent
          label={'Điều khoản hợp đồng'}
          labelButton={'Xem chi tiết'}
          onPress={() => navigation.navigate('ContractTermsDetail')}
        />
        {StraightLine()}

        <TextTitleComponent
          label={'Danh sách người ở'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseTenant')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.tenants?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={1}
                keyExtractor={key => key.id}
                data={contract?.tenants}
                renderItem={({item, index}) => renderSelectTenant(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        {StraightLine()}

        <TextTitleComponent
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseService')}
        />

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.chargeServices?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={1}
                keyExtractor={key => key.id}
                data={contract?.chargeServices}
                renderItem={({item, index}) => renderSelectSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${contract?.chargeServices?.length}`}</Text>
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
            {contract?.amenities?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={key => key.id}
                data={contract?.amenities}
                renderItem={({item, index}) => renderSelectAmenity(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={styles.pickerTotal}>{`${contract?.amenities?.length}`}</Text>
        </View>

        {StraightLine()}
        <ComponentRenderImage
          title={'Ảnh hợp đồng'}
          label={'Thêm ảnh hợp đồng'}
          labelUpload={'Thêm ảnh'}
          data={contractImages}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={(item: any) => deleteImage(item)}
        />
        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hủy'}
        rightLabel={'Hoàn tất'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setModalEditContract(true)}
      />
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
export default EditContractInfor;
