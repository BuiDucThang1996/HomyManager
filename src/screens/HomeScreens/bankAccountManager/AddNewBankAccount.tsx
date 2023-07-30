import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CreateBankAccountApi,
  GetAllBanksApi,
} from '../../../apis/homeApi/bankAccountApi';
import CustomAppBar from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {colors, icons} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';
import CustomViewBank from '../../../components/homeComponent/CustomViewBank';
import CustomModalListBank from '../../../components/homeComponent/CustomModalListBank';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';

const AddNewBankAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [loading, setLoading] = useState(true);
  const [listBank, setListBank] = useState([]);
  const [bank, setBank] = useState();
  const [modalBank, setModalBank] = useState(false);
  const [modalAddAccountBank, setModalAddAccountBank] = useState(false);

  const [name, setName] = useState();
  const [accountNo, setAccountNo] = useState();
  const [accountName, setAccountName] = useState();
  const [notice, setNotice] = useState();
  const [bankId, setBankId] = useState();

  useEffect(() => {
    const getListData = async () => {
      await GetAllBanksApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            setListBank(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, []);

  const createBankAccount = async () => {
    setModalAddAccountBank(false);
    setLoading(true);
    let data = {
      name: name,
      accountNo: accountNo,
      accountName: accountName,
      notice: notice,
      bankId: bankId,
    };
    await CreateBankAccountApi(tokenStore, data)
      .then((res: any) => {
        if (res?.status == 200) {
          dispatch(updateReloadStatus('AddNewBankAccountSuccess'));
          setLoading(false);
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Cảnh báo !!!', 'Có lỗi sảy ra,vui lòng liên hệ admin...');
      });
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      {modalAddAccountBank && (
        <CustomModalNotify
          onRequestClose={() => setModalAddAccountBank(false)}
          modalVisible={modalAddAccountBank}
          title={'Thêm ngân hàng'}
          label={'Bạn có muốn thêm ngân hàng này ?'}
          pressConfirm={() => createBankAccount()}
        />
      )}
      {modalBank && (
        <CustomModalListBank
          modalVisible={modalBank}
          onRequestClose={() => setModalBank(false)}
          pressClose={() => setModalBank(false)}
          data={listBank}
          onPress={(bank: any) => {
            setBankId(bank?.id);
            setBank(bank);
            setModalBank(false);
          }}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thêm ngân hàng'}
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
        <TextTitleComponent label={'Thông tin thanh toán'} />
        <ComponentInput
          type={'input'}
          title={'Tên gợi nhớ'}
          placeholder={'Nhập tên gợi nhớ'}
          value={name}
          onChangeText={(text: any) => setName(text)}
        />

        <CustomViewBank
          important={true}
          styleViewInput={{marginTop: 10}}
          title={'Ngân hàng'}
          placeholder={'Chọn ngân hàng'}
          bank={bank}
          onPress={() => setModalBank(true)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'input'}
          title={'Số tài khoản'}
          placeholder={'Nhập số tài khoản'}
          value={accountNo}
          onChangeText={(text: any) => setAccountNo(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Tên chủ tài khoản'}
          placeholder={'Nhập tên chủ tài khoản'}
          value={accountName}
          onChangeText={(text: any) => setAccountName(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Ghi chú'}
          placeholder={'Nhập ghi chú'}
          value={notice}
          onChangeText={(text: any) => setNotice(text)}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Hủy'}
          rightLabel={'Hoàn tất'}
          styleButtonLeft={styles.styleButtonLeft}
          styleLabelLeft={styles.styleLabelLeft}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalAddAccountBank(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  styleButtonLeft: {
    borderColor: 'orange',
    backgroundColor: 'white',
    marginRight: 5,
  },
  styleLabelLeft: {color: 'orange', fontSize: 15, fontWeight: '600'},
});
export default AddNewBankAccount;
