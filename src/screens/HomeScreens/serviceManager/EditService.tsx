import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors, icons} from '../../../constants';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  GetServiceDetailAPi,
  PutServiceApi,
} from '../../../apis/homeApi/serviceApi';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {ScrollView} from 'react-native-gesture-handler';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import {formatNumber, validateNumber} from '../../../utils/common';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';

const EditService = () => {
  const route: any = useRoute();
  const serviceId = route.params;
  const tokenStore = useSelector(token);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  useEffect(() => {
    getServiceDetail();
  }, []);
  const getServiceDetail = async () => {
    await GetServiceDetailAPi(tokenStore, serviceId)
      .then((res: any) => {
        if (res?.status == 200) {
          setService(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };


  const handlerEditService = async () => {
    setLoading(true);
    let data = {
      id: service?.id,
      name: service?.name ?? '',
      isProgressive: service?.isProgressive ?? '',
      calculateUnit: service?.calculateUnit ?? '',
      fee: parseInt(`${validateNumber(`${service?.fee ?? 0}`)}`),
      description: service?.description ?? '',
    };
    await PutServiceApi(tokenStore, data, serviceId)
      .then((res: any) => {
        if (res?.status === 200) {
          dispatch(updateReloadStatus('editServiceSuccess'));
          setLoading(false);
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Chỉnh sửa dịch vụ'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10, width: '100%'}}>
        <SuggestComponent
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />
        <TextTitleComponent label={'Thông tin dịch vụ'} />

        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên dịch vụ'}
          placeholder={'Nhập tên dịch vụ'}
          value={service?.name}
          onChangeText={(text: any) => {
            let eachService = {...service, name: text};
            setService(eachService);
          }}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Đơn vị tính'}
          placeholder={'Đơn vị tính'}
          value={service?.calculateUnit}
          onChangeText={(text: any) => {
            let eachService = {...service, calculateUnit: text};
            setService(eachService);
          }}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          keyboardType={'number-pad'}
          title={'Phí dịch vụ/ đơn vị tính'}
          placeholder={'Nhập phí dịch vụ'}
          value={`${formatNumber(`${service?.fee}`)}`}
          onChangeText={(text: any) => {
            let eachService = {...service, fee: text};
            setService(eachService);
          }}
        />
        <CustomProgressive
          isCheck={service?.isProgressive}
          onPress={() => {
            let eachService = {
              ...service,
              isProgressive: service?.isProgressive === false ? true : false,
            };
            setService(eachService);
          }}
        />
        <SuggestComponent
          labelStyle={{color: '#374047'}}
          label={
            'Dịch phụ thu phí theo lũy tiến sẽ bắt buộc chốt chỉ số từng tháng'
          }
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Ghi chú'}
          placeholder={'Nhập ghi chú'}
          value={service?.description}
          onChangeText={(text: any) => {
            let eachService = {...service, description: text};
            setService(eachService);
          }}
        />

        <View style={{marginBottom: 56}} />
      </ScrollView>
      <CustomButtonBottom
        label={'Xác nhận'}
        isAddNew={true}
        onPress={() => handlerEditService()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  styleIconCheck: {width: 25, height: 25, tintColor: colors.mainColor},
  textProgressive: {marginLeft: 10, fontSize: 15, color: '#374047'},
});
const CustomProgressive = (props: any) => {
  const {isCheck, onPress} = props;
  return (
    <View style={styles.viewComponent}>
      {isCheck ? (
        <ButtonComponent
          onPress={onPress}
          icon={icons.ic_check}
          styleIcon={styles.styleIconCheck}
        />
      ) : (
        <ButtonComponent
          onPress={onPress}
          icon={icons.ic_unCheck}
          styleIcon={styles.styleIconCheck}
        />
      )}
      <Text style={styles.textProgressive}>Thu phí theo lũy tiến</Text>
    </View>
  );
};

export default EditService;
