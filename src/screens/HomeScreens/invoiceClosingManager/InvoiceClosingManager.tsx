import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {colors, icons, images} from '../../../constants';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {GetAllInvoiceUnClosingsApi} from '../../../apis/homeApi/invoiceClosingApi';
import RenderInvoiceClosing from '../../../components/renderComponent/RenderInvoiceClosing';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';

const InvoiceClosingManager = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const [isActive, setIsActive] = useState(1);
  const [loading, setLoading] = useState(true);
  const [listInvoiceClosing, setListInvoiceClosing] = useState<any>([]);
  const [listInvoiceUnClosing, setListInvoiceUnClosing] = useState<any>([]);
  // console.log(tokenStore);
  useEffect(() => {
    const getData = async () => {
      await GetAllInvoiceUnClosingsApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let listData = res?.data;
            let closing = [];
            let unClosing = [];
            for (let index = 0; index < listData?.length; index++) {
              const element = listData[index];
              if (element?.status == 2) {
                closing.push(element);
              } else if (element?.status == 0 || element?.status == 1) {
                unClosing.push(element);
              }
            }
            setListInvoiceClosing(closing);
            setListInvoiceUnClosing(unClosing);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error,'get list InvoiceUnClosings error');
        });
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        label={'Chốt dịch vụ'}
      />

      <View style={styles.viewButtonTop}>
        <ButtonComponent
          styleButton={[
            {
              backgroundColor:
                isActive == 1 ? colors.backgroundOrange : 'white',
            },
            styles.viewButton,
          ]}
          label={'Chưa chốt'}
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
          label={'Đã chốt'}
          styleLabel={{color: isActive == 2 ? 'white' : '#7F8A93'}}
          onPress={() => setIsActive(2)}
        />
      </View>
      {isActive == 1 ? (
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <FlatList
            data={listInvoiceUnClosing}
            keyExtractor={key => `${key?.id}`}
            renderItem={({item, index}) => {
              return (
                <RenderInvoiceClosing
                  data={item}
                  onPress={() => {
                    dispatch(updateReloadStatus('toDoUpdate'));
                    navigation.navigate('ConfirmInvoiceClosing', item?.id);
                  }}
                />
              );
            }}
          />
        </View>
      ) : isActive == 2 ? (
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <FlatList
            data={listInvoiceClosing}
            keyExtractor={key => `${key?.id}`}
            renderItem={({item, index}) => {
              return (
                <RenderInvoiceClosing
                  data={item}
                  onPress={() =>
                    navigation.navigate('InvoiceClosing', item?.id)
                  }
                />
              );
            }}
          />
        </View>
      ) : isActive == 3 ? null : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
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
    marginHorizontal: 10,
  },
  viewButton: {
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    flex: 1,
  },
});
export default InvoiceClosingManager;
