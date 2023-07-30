import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, FlatList} from 'react-native';
import {icons, colors} from '../../../constants';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import AppBarSearchComponent from '../../../components/appBarComponent/AppBarSearchComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {GetListInvoicesApi} from '../../../apis/homeApi/invoiceApi';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';
import {token} from '../../../store/slices/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';
import useKeyboard from '../../../hooks/useKeyboard';
import RenderInvoice from '../../../components/renderComponent/RenderInvoice';

const InvoiceManager = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const loadingInvoice = useSelector(reloadState);
  const [loading, setLoading] = useState(true);
  const tokenStore = useSelector(token);
  const keyboard = useKeyboard();
  const [textSearch, setTextSearch] = useState('');
  const [isActive, setIsActive] = useState(1);
  const [listInvoiceUnpaid, setListInvoiceUnpaid] = useState<any>([]);
  const [listInvoicePaid, setListInvoicePaid] = useState<any>([]);

  useEffect(() => {
    const getListData = async () => {
      await GetListInvoicesApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let eachListInvoice = res?.data;
            let unpaid = [];
            let paid = [];
            for (let index = 0; index < eachListInvoice.length; index++) {
              const element = eachListInvoice[index];
              if (element?.status == 1) {
                unpaid.push(element);
              } else if (element?.status == 2) {
                paid.push(element);
              }
            }
            setListInvoiceUnpaid(unpaid);
            setListInvoicePaid(paid);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, [loadingInvoice]);

  const renderBillUnPaid = (item: any, index: number) => {
    return (
      <RenderInvoice
        totalFee={`${item?.totalFee?.toLocaleString()}`}
        status={`${item?.status}`}
        name={`${item?.name}`}
        houseName={`${item?.contract?.unit?.house?.name}`}
        unitName={`${item?.contract?.unit?.name}`}
        onPress={() => {
          dispatch(updateReloadStatus(true));
          navigation.navigate('InvoiceUnpaidDetail', item?.id);
        }}
      />
    );
  };

  const renderBillPaid = (item: any, index: number) => {
    return (
      <RenderInvoice
        totalFee={`${item?.totalFee?.toLocaleString()}`}
        status={`${item?.status}`}
        name={`${item?.name}`}
        houseName={`${item?.contract?.unit?.house?.name}`}
        unitName={`${item?.contract?.unit?.name}`}
        onPress={() => {
          navigation.navigate('InvoicePaidDetail', item?.id);
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <LoadingComponent />}
      <AppBarSearchComponent
        iconLeft={icons.ic_back}
        label={'Quản lý hóa đơn'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={(text: any) => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View style={styles.viewButtonTop}>
          <ButtonComponent
            styleButton={[
              {
                backgroundColor:
                  isActive == 1 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Chưa thanh toán'}
            styleLabel={{color: isActive == 1 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(1)}
          />
          <ButtonComponent
            styleButton={[
              {
                backgroundColor:
                  isActive == 2 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Đã thanh toán'}
            styleLabel={{color: isActive == 2 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(2)}
          />
        </View>

        {isActive == 1 ? (
          <FlatList
            data={listInvoiceUnpaid}
            keyExtractor={(key: any) => key?.id}
            renderItem={({item, index}) => renderBillUnPaid(item, index)}
          />
        ) : isActive == 2 ? (
          <FlatList
            data={listInvoicePaid}
            keyExtractor={(key: any) => key?.id}
            renderItem={({item, index}) => renderBillPaid(item, index)}
          />
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  viewButtonTop: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    flex: 1,
  },
});
export default InvoiceManager;
