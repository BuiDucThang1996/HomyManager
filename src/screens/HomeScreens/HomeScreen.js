import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetUserAPi} from '../../apis/homeApi/userApi';
import LoadingComponent from '../../components/commonComponent/LoadingComponent';
import AppBarSearchComponent from '../../components/appBarComponent/AppBarSearchComponent';
import {colors, icons, images} from '../../constants';
import {token} from '../../store/slices/tokenSlice';
import {updateUser, userInfor} from '../../store/slices/userInforSlice';
import CustomModalNotify from '../../components/commonComponent/CustomModalNotify';
import {GetHomeScreenInforApi} from '../../apis/homeApi/homeInforApi';
import {reloadState} from '../../store/slices/reloadSlice';
import useKeyboard from '../../hooks/useKeyboard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const reload = useSelector(reloadState);
  const userStore = useSelector(userInfor);
  const [loading, setLoading] = useState(true);
  const [modalNotify, setModalNotify] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [homeInfor, setHomeInfor] = useState();
  const widthImage = Dimensions.get('window').width / 2 - 20;
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const keyboard = useKeyboard();
  //   console.log(userStore?.avatarImage?.fileUrl);
  useEffect(() => {
    const getData = async () => {
      if (tokenStore != null && tokenStore != undefined && tokenStore != '') {
        await GetHomeScreenInforApi(tokenStore)
          .then(res => {
            if (res?.status == 200) {
              setHomeInfor(res?.data);
            }
          })
          .catch(error => console.log(error));
        await GetUserAPi(tokenStore)
          .then(res => {
            if (res?.status == 200) {
              setLoading(false);
              dispatch(updateUser(res?.data));
            }
          })
          .catch(error => console.log(error));
      }
    };
    getData();
  }, [reload]);

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent modalVisible={loading} />}
      {modalNotify && (
        <CustomModalNotify
          title={'Thông báo'}
          label={'Bạn có một thông báo mới,vui lòng xác nhận'}
          modalVisible={modalNotify}
          onRequestClose={() => setModalNotify(false)}
          pressConfirm={() => {
            console.log('123');
          }}
        />
      )}
      <AppBarSearchComponent
        iconLeft={icons.ic_logoApp}
        label={'Trang chủ'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconRightTextInput={icons.ic_option}
        iconSecondRight={
          userStore?.avatarImage?.fileUrl
            ? userStore?.avatarImage?.fileUrl
            : icons.ic_user
        }
        pressSeccodIconRight={() =>
          navigation.navigate('StackAccountNavigatior')
        }
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />

      <ScrollView style={styles.eachContainer}>
        <View style={styles.viewRow}>
          <CustomViewButton
            styleButton={{width: 175, height: 91}}
            styleImageBG={{width: widthImage}}
            imageBG={images.im_frame1}
            icon={icons.ic_building}
            label={'Số tòa nhà'}
            labelNumber={`${homeInfor?.houseTotal}`}
            onPress={() => navigation.navigate('HouseManager')}
          />

          <CustomViewButton
            styleButton={{width: widthImage}}
            styleImageBG={{width: widthImage}}
            imageBG={images.im_frame3}
            icon={icons.ic_peoples}
            label={'Tổng số người'}
            labelNumber={`${homeInfor?.tenantTotal}`}
            onPress={() => navigation.navigate('TenantManager')}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 20}]}></View>
        <View style={styles.viewOption}>
          <Text style={styles.title}>Quản lý cho thuê</Text>
          <View style={[styles.viewRow, {marginTop: 15}]}>
            <CustomOptionBT
              title={'Hợp đồng'}
              content={`${homeInfor?.contractTotal}`}
              icon={icons.ic_homeContract}
              styleBGIcon={{backgroundColor: '#ebf9fd'}}
              onPress={() => navigation.navigate('ContractManager')}
            />
            <CustomOptionBT
              title={'Hóa đơn'}
              content={`${homeInfor?.invoiceTotal}`}
              ic_homeDocument
              icon={icons.ic_homeDocument}
              styleBGIcon={{backgroundColor: '#e6f6e2'}}
              onPress={() => navigation.navigate('InvoiceManager')}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 15}]}>
            <CustomOptionBT
              title={'Dịch vụ'}
              icon={icons.ic_homeService}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
              onPress={() => navigation.navigate('ServiceManager')}
            />
            <CustomOptionBT
              title={'Tiện ích'}
              icon={icons.ic_homeAmenity}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
              onPress={() => navigation.navigate('AmenityManager')}
            />
            <CustomOptionBT
              title={'Thanh toán'}
              icon={icons.ic_homePayment}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
              onPress={() => navigation.navigate('BankAccountManager')}
            />
            <CustomOptionBT
              title={'Điện-nước'}
              icon={icons.ic_homeWater}
              styleBGIcon={{backgroundColor: '#edfcfb'}}
              onPress={() => navigation.navigate('InvoiceClosingManager')}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 15}]}></View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.backgroundGrey,
    paddingTop: 30,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  viewOption: {
    width: '100%',
    marginTop: 30,
    borderRadius: 10,
    zIndex: 1,
    backgroundColor: 'white',
    margin: 2,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  title: {fontSize: 17, fontWeight: 'bold', color: 'black'},
  textTitle: {fontSize: 17, fontWeight: 'bold', color: '#163a5f'},
});

const CustomViewButton = props => {
  const {
    imageBG,
    styleImageBG,
    styleButton,
    icon,
    label,
    labelNumber,
    onPress,
  } = props;

  return (
    <TouchableOpacity style={[styleBT.button, styleButton]} onPress={onPress}>
      <Image
        source={imageBG}
        style={[styleBT.image, styleImageBG]}
        resizeMode={'cover'}
      />
      <View style={styles.viewRow}>
        <View style={styleBT.viewIcon}>
          <Image source={icon} style={{width: 32, height: 32}} />
        </View>
        <Text style={styleBT.labelNumber}>{labelNumber}</Text>
      </View>
      <Text style={styleBT.label}>{label}</Text>
    </TouchableOpacity>
  );
};
const styleBT = StyleSheet.create({
  button: {
    height: 91,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: 175,
    borderRadius: 10,
  },
  image: {height: 91, position: 'absolute', borderRadius: 10},
  viewIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  labelNumber: {
    color: '#374047',
    fontWeight: '600',
    fontSize: 22,
  },
  label: {
    color: '#374047',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  },
});
const CustomOptionBT = props => {
  const {styleButton, icon, title, content, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styleOption.button, styleButton]}>
      {icon && <Image source={icon} style={{width: 24, height: 24}} />}
      {title && <Text style={styleOption.title}>{title}</Text>}
      {content && <Text style={styleOption.content}>{content}</Text>}
    </TouchableOpacity>
  );
};
const styleOption = StyleSheet.create({
  button: {
    width: 90,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {height: 24, width: 24},
  title: {fontSize: 9, color: 'grey', textAlign: 'center'},
  content: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  backgroundIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default HomeScreen;
