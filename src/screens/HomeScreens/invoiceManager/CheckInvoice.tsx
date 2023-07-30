import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import {colors, icons} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';
import {BreakLine} from '../../../components/commonComponent/LineConponent';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import {convertDate, formatNumber, validateNumber} from '../../../utils/common';
import CustomViewServiceFee from '../../../components/homeComponent/CustomViewServiceFee';
import {
  GetInvoiceRequestClosingsApi,
  PostInvoiceRequestClosingsApi,
} from '../../../apis/homeApi/invoiceClosingApi';

const CheckInvoice = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const tokenStore = useSelector(token);
  const invoiceId: any = route.params;
  const [loading, setLoading] = useState(true);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
  const [invoiceServices, setInvoiceServices] = useState([]);
  const timeNow = new Date();
  const [totalFee, setTotalFee] = useState<any>();

  const [otherFee, setOtherFee] = useState<any>();
  const [discountFee, setDiscountFee] = useState<any>();
  const [notice, setNotice] = useState('');

  useMemo(() => {
    let total =
      parseInt(`${validateNumber(`${invoice?.totalFee ?? '0'}`)}`) +
      parseInt(`${validateNumber(`${otherFee ?? '0'}`)}`) -
      parseInt(`${validateNumber(`${discountFee ?? '0'}`)}`);
    setTotalFee(total);
  }, [otherFee, discountFee]);

  useEffect(() => {
    const getData = async () => {
      await GetInvoiceRequestClosingsApi(tokenStore, invoiceId)
        .then((res: any) => {
          if (res?.status == 200) {
            setInvoiceServices(res?.data?.invoiceServices);
            setInvoice(res?.data);
            setTotalFee(res?.data?.totalFee);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, []);
  const confirmTheInvoice = async () => {
    setModalConfirm(false);
    setLoading(true);
    let data = {
      otherFee: parseInt(`${validateNumber(`${otherFee ?? '0'}`)}`),
      discountFee: parseInt(`${validateNumber(`${discountFee ?? '0'}`)}`),
      notice: notice,
    };
    await PostInvoiceRequestClosingsApi(tokenStore, data, invoiceId)
      .then((res: any) => {
        if (res?.status == 200) {
          dispatch(updateReloadStatus('confirmInvoiceSuccess'));
          navigation.navigate('InvoiceManager');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItem = (item: any, index: any) => {
    let totalPrice =
      parseInt(item?.fee ? item?.fee : 0) *
      parseInt(item?.usageAmount ? item?.usageAmount : 0);
    return (
      <CustomViewServiceFee
        chargeServiceName={item?.chargeServiceName}
        usageAmount={item?.usageAmount}
        totalPrice={totalPrice}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      {modalConfirm && (
        <CustomModalNotify
          title={'Chốt hóa đơn'}
          label={'Bạn có muốn chốt hóa đơn này ?'}
          onRequestClose={() => setModalConfirm(false)}
          pressConfirm={() => confirmTheInvoice()}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Chi tiết hóa đơn'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewInvoice]}>
          <View>
            <Text style={styles.title}>{`${invoice?.name ?? ''}`}</Text>
          </View>
          <View>
            <Text style={{color: 'red', fontSize: 13, alignSelf: 'center'}}>
              {invoice?.statusName}
            </Text>
          </View>

          <View style={styles.viewBetween}>
            <Text style={{color: '#000000', fontSize: 13}}>
              {invoice?.code}
            </Text>
            <Text style={{color: '#000000', fontSize: 13}}>
              {`${convertDate(invoice?.createTime ?? timeNow)}`}
            </Text>
          </View>

          <View style={styles.viewRow}>
            <Image
              source={icons.ic_home}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <Text
              style={{
                color: 'black',
              }}>{`${invoice?.contract?.unit?.house?.name ?? ''} - ${
              invoice?.contract?.unit?.name ?? ''
            }`}</Text>
          </View>

          <View style={styles.viewRow}>
            <Image
              source={icons.ic_location}
              style={{height: 20, width: 20, marginRight: 10}}
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'black',
                }}>{`${
                invoice?.contract?.unit?.house?.fullAddress ?? ''
              }`}</Text>
            </View>
          </View>
          {BreakLine()}
          <View style={styles.viewBetween}>
            <Text style={styles.label}>Tiền phòng</Text>
            <Text style={styles.label}>
              {`${formatNumber(`${invoice?.leasingFee ?? 0}`)}`}
            </Text>
          </View>

          {BreakLine()}
          <View>
            <ScrollView horizontal={true} style={{width: '100%'}}>
              {invoiceServices?.length > 0 && (
                <FlatList
                  data={invoiceServices}
                  keyExtractor={(key: any) => key?.id}
                  renderItem={({item, index}) => renderItem(item, index)}
                />
              )}
            </ScrollView>
          </View>

          {BreakLine()}

          <View style={styles.viewBetween}>
            <View>
              <Text style={styles.label}>Phát sinh</Text>
            </View>
            <View style={styles.viewOtherFee}>
              <TextInput
                style={{flex: 1}}
                keyboardType="number-pad"
                placeholder="0"
                value={`${formatNumber(`${otherFee}`)}`}
                onChangeText={text => {
                  setOtherFee(text);
                }}
              />
              <View style={{backgroundColor: '#F8F9F9', borderRadius: 4}}>
                <Text style={{fontSize: 13, color: '#5F6E78', margin: 5}}>
                  VNĐ
                </Text>
              </View>
            </View>
          </View>
          {BreakLine()}
          <View style={styles.viewBetween}>
            <View>
              <Text style={styles.label}>Giảm giá</Text>
            </View>
            <View style={styles.viewOtherFee}>
              <TextInput
                style={{flex: 1}}
                keyboardType="number-pad"
                placeholder="0"
                value={`${formatNumber(`${discountFee}`)}`}
                onChangeText={text => {
                  setDiscountFee(text);
                }}
              />
              <View style={{backgroundColor: '#F8F9F9', borderRadius: 4}}>
                <Text style={{fontSize: 13, color: '#5F6E78', margin: 5}}>
                  VNĐ
                </Text>
              </View>
            </View>
          </View>
          {BreakLine()}
          <View style={styles.viewBetween}>
            <Text style={styles.label}>Tổng</Text>
            <Text style={{color: 'red', fontSize: 15, fontWeight: '600'}}>
              {`${formatNumber(`${totalFee ?? 0}`)}`}
            </Text>
          </View>

          {BreakLine()}

          <TextTitleComponent label={'Ghi chú'} />
          <ComponentInput
            type={'inputNote'}
            placeholder={'Nhập ghi chú hóa đơn'}
            value={notice}
            onChangeText={(text: any) => setNotice(text)}
          />
        </View>

        <View style={{height: 56}} />
      </ScrollView>
      <CustomButtonBottom
        label={'Xác nhận'}
        onPress={() => setModalConfirm(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    margin: 1,
    elevation: 4,
  },
  viewInvoice: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 8,
  },
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {fontSize: 16, color: '#000000', fontWeight: '600'},
  viewRow: {flexDirection: 'row'},
  label: {color: '#374047', fontSize: 15, fontWeight: '600'},
  textQuality: {
    color: '#374047',
    fontSize: 13,
  },
  line: {
    height: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#97A1A7',
  },
  styleLabelLeft: {color: 'orange', fontSize: 15, fontWeight: '600'},
  styleButtonLeft: {
    borderColor: 'orange',
    backgroundColor: 'white',
    marginRight: 5,
  },
  viewOtherFee: {
    padding: 10,
    width: '70%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#5F6E78',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default CheckInvoice;
