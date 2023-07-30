import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import CustomBankAccountInfor from '../../../components/commonComponent/CustomBankAccountInfor';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {colors, icons} from '../../../constants';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';
import {token} from '../../../store/slices/tokenSlice';
import {
  bankAccountState,
  updateBankAccount,
} from '../../../store/slices/bankAccountSlice';
import {GetBankAccountsApi} from '../../../apis/homeApi/bankAccountApi';
const ChooseABank = () => {
  const navigation: any = useNavigation();
  const bankAccountsStore = useSelector(bankAccountState);
  const statusLoading = useSelector(reloadState);
  const tokenStore = useSelector(token);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [eachBankAccounts, setEachBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bank, setBank] = useState();
  useEffect(() => {
    setBankAccounts(bankAccountsStore);
    setEachBankAccounts(bankAccountsStore);
  }, [bankAccountsStore]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      await GetBankAccountsApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let data = res?.data;
            let eachData = [];
            for (let index = 0; index < data.length; index++) {
              let element = data[index];
              let newElement = {...element, isCheck: false};
              eachData.push(newElement);
            }
            setEachBankAccounts(res?.data);
            setBankAccounts(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, [statusLoading]);

  const renderItem = (item: any, index: number) => {
    return (
      <CustomBankAccountInfor
        isSelect={true}
        viewCustom={{marginBottom: 10}}
        imageUrl={item?.bank?.logo}
        userName={item?.name}
        accountNo={item?.accountNo}
        isCheck={item?.isCheck}
        onPress={() => {
          let newBankAccount: any = [...eachBankAccounts];
          newBankAccount[index] = {...item, isCheck: true};
          setBankAccounts(newBankAccount);
          setBank(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Danh sách ngân hàng'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        {bankAccounts?.length > 0 && (
          <FlatList
            data={bankAccounts}
            keyExtractor={(key: any) => key?.id}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        )}
      </View>
      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => {
          dispatch(updateBankAccount(bank));
          navigation.goBack();
        }}
        onPressRight={() => {
          dispatch(updateReloadStatus('addNewBankAccount'));
          navigation.navigate('AddNewBankAccount');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  eachContainer: {paddingHorizontal: 10, paddingTop: 10, flex: 1},
});
export default ChooseABank;
