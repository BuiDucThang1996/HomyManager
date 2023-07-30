import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../constants';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {CreateNewService} from '../../../apis/homeApi/serviceApi';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import {formatNumber, validateNumber} from '../../../utils/common';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';

const AddNewService = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const [loadingService, setLoadingService] = useState(false);
  const [modalService, setModalService] = useState(false);

  const [name, setName] = useState('');
  const [calculateUnit, setCalculateUnit] = useState('');
  const [fee, setFee] = useState('');
  const [description, setDescription] = useState('');
  const [isCheck, setIsCheck] = useState(false);

  const createNewService = async () => {
    setModalService(false);
    setLoadingService(true);
    let data = {
      name: name ?? '',
      calculateUnit: calculateUnit ?? '',
      fee: validateNumber(fee) ?? 0,
      description: description ?? '',
      isProgressive: isCheck ?? false,
    };
    await CreateNewService(tokenStore, data)
      .then((res: any) => {
        if (res?.status == 200) {
          dispatch(updateReloadStatus(false));
          setLoadingService(false);
          navigation.goBack();
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loadingService && <LoadingComponent />}
      {modalService && (
        <CustomModalNotify
          title={'Tạo mới dịch vụ'}
          label={'Bạn có muốn thêm mới dịch vụ này ?'}
          modalVisible={modalService}
          onRequestClose={() => setModalService(false)}
          pressConfirm={() => createNewService()}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        label={'Thêm dịch vụ'}
        // iconRight={icons.ic_bell}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={[styles.eachContainer]}>
        <SuggestComponent
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />
        <TextTitleComponent label={'Thông tin dịch vụ'} />

        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên dịch vụ'}
          placeholder={'Nhập tên dịch vụ'}
          value={name}
          onChangeText={(text: any) => setName(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Đơn vị tính'}
          placeholder={'Đơn vị tính'}
          value={calculateUnit}
          onChangeText={(text: any) => setCalculateUnit(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          keyboardType={'number-pad'}
          title={'Phí dịch vụ/ đơn vị tính'}
          placeholder={'Nhập phí dịch vụ'}
          value={`${formatNumber(`${fee}`)}`}
          onChangeText={(text: any) => setFee(text)}
        />
        <CustomProgressive
          onPress={() => setIsCheck(prev => (prev == false ? true : false))}
          isCheck={isCheck}
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
          value={description}
          onChangeText={(text: any) => setDescription(text)}
        />

        <View style={{marginBottom: 56}} />
      </ScrollView>

      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hủy'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setModalService(true)}
      />
    </View>
  );
};
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
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  viewComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  styleIconCheck: {width: 25, height: 25, tintColor: colors.mainColor},
  textProgressive: {marginLeft: 10, fontSize: 15, color: '#374047'},
  styleButtonLeft: {
    borderColor: '#FE7A37',
    backgroundColor: 'white',
    marginRight: 5,
  },
  styleLabelLeft: {color: '#FE7A37', fontSize: 15, fontWeight: '600'},
});
export default AddNewService;
