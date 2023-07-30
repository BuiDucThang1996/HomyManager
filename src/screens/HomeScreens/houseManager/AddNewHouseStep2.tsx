import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../constants';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import CustomTimeButtons from '../../../components/commonComponent/CustomTimeButtons';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateHouseInfor,
  houseState,
} from '../../../store/slices/houseInforSlice';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import CustomPickerDay from '../../../components/commonComponent/CustomPickerDay';
import {BILLINGDATE, PAYMENTDATE} from '../../../resource/dataPicker';
import CustomStepAppBar from '../../../components/appBarComponent/CustomStepAppBar';
import CustomBankAccountInfor from '../../../components/commonComponent/CustomBankAccountInfor';
import ComponentButton from '../../../components/commonComponent/ComponentButton';
import {
  bankAccountState,
  updateBankAccount,
} from '../../../store/slices/bankAccountSlice';

const AddNewHouseStep2 = (props: any) => {
  const navigation: any = useNavigation();
  const bankAccountsStore = useSelector(bankAccountState);
  const dispatch = useDispatch();
  const createBuildingInfor = useSelector(houseState);
  const [bank, setBank] = useState<any>(null);

  const [billingDate, setBillingDate] = useState(BILLINGDATE[0]);
  const [paymentDateFrom, setPaymentDateFrom] = useState(PAYMENTDATE[0]);
  const [paymentDateTo, setPaymentDateTo] = useState(PAYMENTDATE[4]);
  const [bankAccountId, setBankAccountId] = useState([]);

  const [modalbillingDate, setModalbillingDate] = useState(false);
  const [modalpaymentDateFrom, setModalpaymentDateFrom] = useState(false);
  const [modalpaymentDateTo, setModalpaymentDateTo] = useState(false);

  useEffect(() => {
    dispatch(updateBankAccount(null))
  }, []);

  useMemo(()=>{
    setBank(bankAccountsStore)
    setBankAccountId(bankAccountsStore?.id);
  },[bankAccountsStore])

  const goToStepThree = () => {
    let eachData = {
      ...createBuildingInfor,
      billingDate: billingDate.value,
      paymentDateTo: paymentDateTo.value,
      paymentDateFrom: paymentDateFrom.value,
      bankAccountId: bankAccountId,
    };
    dispatch(updateHouseInfor(eachData));
    navigation.navigate('AddNewHouseStep3');
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {modalbillingDate && (
        <CustomPickerDay
          data={BILLINGDATE}
          modalVisible={modalbillingDate}
          onRequestClose={() => setModalbillingDate(false)}
          onPress={(item: any) => {
            setBillingDate(item);
            setModalbillingDate(false);
          }}
        />
      )}
      {modalpaymentDateTo && (
        <CustomPickerDay
          data={PAYMENTDATE}
          modalVisible={modalpaymentDateTo}
          onRequestClose={() => setModalpaymentDateTo(false)}
          onPress={(item: any) => {
            setPaymentDateTo(item);
            setModalpaymentDateTo(false);
          }}
        />
      )}
      {modalpaymentDateFrom && (
        <CustomPickerDay
          data={PAYMENTDATE}
          modalVisible={modalpaymentDateFrom}
          onRequestClose={() => setModalpaymentDateFrom(false)}
          onPress={(item: any) => {
            setPaymentDateFrom(item);
            setModalpaymentDateFrom(false);
          }}
        />
      )}

      <CustomStepAppBar
        iconLeft={icons.ic_back}
        label={'Thiết lập tiền nhà'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
        step={2}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={[styles.eachContainer]}>
        <SuggestComponent
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />

        <TextTitleComponent label={'Thiết lập tiền nhà'} />

        <ComponentButton
          type={'buttonValue'}
          important={true}
          icon={icons.ic_down}
          title={'Ngày chốt tiền'}
          placeholder={'Chọn ngày'}
          value={billingDate?.key}
          onPress={() => setModalbillingDate(true)}
        />

        <CustomTimeButtons
          styleContainer={{marginTop: 20}}
          title={'Thời gian nộp tiền phòng'}
          leftLabel={'Từ ngày'}
          rightLabel={'Đến ngày'}
          iconLeft={icons.ic_down}
          iconRight={icons.ic_down}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={paymentDateFrom?.value}
          valueRight={paymentDateTo?.value}
          onPressLeft={() => setModalpaymentDateFrom(true)}
          onPressRightt={() => setModalpaymentDateTo(true)}
        />

        <TextTitleComponent
          label={'Thông tin thanh toán'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => {
            dispatch(updateReloadStatus('chooseABank'));
            navigation.navigate('ChooseABank');
          }}
        />
        {bank && (
          <CustomBankAccountInfor
            viewCustom={{marginBottom: 10}}
            imageUrl={bank?.bank?.logo}
            userName={bank?.name}
            accountNo={bank?.accountNo}
          />
        )}
      </ScrollView>
      <CustomTwoButtonBottom
        leftLabel={'Trở lại'}
        rightLabel={'Tiếp tục'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => goToStepThree()}
      />
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
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'grey',
    paddingHorizontal: 5,
  },
});
export default AddNewHouseStep2;
