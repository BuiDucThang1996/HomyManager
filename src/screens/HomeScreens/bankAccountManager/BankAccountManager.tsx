import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {token} from '../../../store/slices/tokenSlice';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';
import {colors, icons} from '../../../constants';
import {GetBankAccountsApi} from '../../../apis/homeApi/bankAccountApi';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import CustomBankAccountInfor from '../../../components/commonComponent/CustomBankAccountInfor';

const BankAccountManager = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const loadingPayment = useSelector(reloadState);
  const [loading, setLoading] = useState(true);
  const [listBankAccount, setListBankAccount] = useState([]);

  useEffect(() => {
    const getListData = async () => {
      await GetBankAccountsApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            setListBankAccount(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, [loadingPayment]);

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Ngân hàng hiện có'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={{paddingHorizontal: 10, paddingTop: 10, flex: 1}}>
        {listBankAccount.length > 0 && (
          <FlatList
            data={listBankAccount}
            keyExtractor={(key: any) => key?.id}
            renderItem={({item, index}) => {
              return (
                <CustomBankAccountInfor
                  viewCustom={{marginBottom: 10}}
                  imageUrl={item?.bank?.logo}
                  userName={item?.accountName}
                  accountNo={item?.accountNo}
                  pressDetail={() =>
                    navigation.navigate('BankAccountDetal', item?.id)
                  }
                />
              );
            }}
          />
        )}
      </View>
      <CustomButtonBottom
        label={'Thêm ngân hàng'}
        onPress={() => {
          dispatch(updateReloadStatus('todoAddNewBankAccount'));
          navigation.navigate('AddNewBankAccount');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default BankAccountManager;
