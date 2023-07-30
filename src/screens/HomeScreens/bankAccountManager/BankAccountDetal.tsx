import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GetBankAccountDetailApi} from '../../../apis/homeApi/bankAccountApi';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import {colors, icons, images} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';

const BankAccountDetal = () => {
  const [loading, setLoading] = useState(true);
  const [bankAccount, setBankAccount] = useState<any>(null);
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const route: any = useRoute();
  //   console.log(bankAccount);
  useEffect(() => {
    getBankAccount();
  }, []);
  const getBankAccount = async () => {
    await GetBankAccountDetailApi(tokenStore, route.params)
      .then((res: any) => {
        if (res?.status == 200) {
          setBankAccount(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Chi tiết tiện ích'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewDetail]}>
          <Image
            source={
              bankAccount ? {uri: bankAccount?.bank?.logo} : images.im_frame1
            }
            style={{width: 250, height: 150, alignSelf: 'center'}}
            resizeMode="contain"
          />
          <SuggestComponent
            labelStyle={{alignSelf: 'center'}}
            label={`${bankAccount?.bank?.name}`}
          />
          <View style={[styles.viewBetween, {height: 30}]}>
            <Text style={styles.title}>Tên gợi nhớ:</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                numberOfLines={1}
                style={styles.label}>{`${bankAccount?.name}`}</Text>
            </View>
          </View>

          <View style={[styles.viewBetween, {height: 30}]}>
            <Text style={styles.title}>Chủ tài khoản:</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                numberOfLines={1}
                style={styles.label}>{`${bankAccount?.accountName}`}</Text>
            </View>
          </View>

          <View style={[styles.viewBetween, {height: 30}]}>
            <Text style={styles.title}>Số tài khoản:</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                numberOfLines={1}
                style={styles.label}>{`${bankAccount?.accountNo}`}</Text>
            </View>
          </View>

          <View style={[styles.viewBetween, {height: 30}]}>
            <Text style={styles.title}>Ghi chú:</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                numberOfLines={10}
                style={styles.label}>{`${bankAccount?.notice}`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewDetail: {backgroundColor: 'white', padding: 10, borderRadius: 8},
  title: {color: 'black', fontSize: 13, fontWeight: '600', marginRight: 10},
  label: {color: 'black', fontSize: 15, fontWeight: '600'},
  viewBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default BankAccountDetal;
