import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../constants';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {useDispatch, useSelector} from 'react-redux';
import {houseState} from '../../../store/slices/houseInforSlice';
import {token} from '../../../store/slices/tokenSlice';
import {amenityState, updateAmenity} from '../../../store/slices/amenitySlice';
import {serviceState, updateService} from '../../../store/slices/serviceSlice';
import RenderService from '../../../components/renderComponent/RenderService';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {CreateNewBuildingApi} from '../../../apis/homeApi/houseApi';
import CustomStepAppBar from '../../../components/appBarComponent/CustomStepAppBar';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import {PostImageBuildingApi} from '../../../apis/homeApi/fileDataApi';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import {StraightLine} from '../../../components/commonComponent/LineConponent';

const AddNewHouseStep3 = () => {
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [modalNotify, setModalNotify] = useState(false);
  const createBuildingInfor: any = useSelector(houseState);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const tokenStore = useSelector(token);

  const [notice, setNotice] = useState('');
  const [billNotice, setBillNotice] = useState('');

  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);

  useEffect(() => {
    dispatch(updateAmenity([]));
    dispatch(updateService([]));
  }, []);

  useMemo(() => {
    let eachService: any = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item: any, index: number) => {
        if (item?.isCheck == true) {
          eachService.push(item);
        }
      });
      setListService(eachService);
    }
  }, [serviceSelect]);

  useMemo(() => {
    let eachAmenityIds: any = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item: any, index: number) => {
        if (item?.isCheck == true) {
          eachAmenityIds.push(item);
        }
      });
      setListAmenity(eachAmenityIds);
    }
  }, [amenitySelect]);

  const renderPaidSevice = (item: any, index: number) => {
    return (
      <RenderService
        disabled={true}
        name={item?.name}
        fee={item?.fee}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderFreeSevice = (item: any, index: number) => {
    return <RenderAmenity label={item?.name} disabled={true} />;
  };

  const createNewBuilding = async () => {
    setModalNotify(false);
    setLoading(true);
    let eachServiceIds: any = [];
    let eachAmenityIds: any = [];
    listService.map((item: any, index: number) => {
      eachServiceIds.push(item?.id);
    });
    listAmenity.map((item: any, index: number) => {
      eachAmenityIds.push(item?.id);
    });
    let data = {
      ...createBuildingInfor,
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
      notice: notice,
      billNotice: billNotice,
    };
    await CreateNewBuildingApi(tokenStore, data)
      .then(async (res: any) => {
        if (res?.status == 200) {
          let hauseId = res?.data?.id;
          let hauseImages = createBuildingInfor?.hauseImages;
          if (hauseImages?.length > 0) {
            await PostImageBuildingApi(tokenStore, hauseId, hauseImages)
              .then((res: any) => {
                if (res?.status == 200) {
                  dispatch(updateReloadStatus('uploadHouseSuccess'));
                  setLoading(false);
                  navigation.navigate('HouseManager');
                }
              })
              .catch(error => {
                Alert.alert(error);
              });
          } else {
            dispatch(updateReloadStatus('uploadHouseSuccess'));
            setLoading(false);
            navigation.navigate('HouseManager');
          }
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <LoadingComponent />}
      {modalNotify && (
        <CustomModalNotify
          title={'Tạo tòa nhà'}
          label={'Bạn có muốn tạo tòa nhà này ?'}
          modalVisible={modalNotify}
          onRequestClose={() => setModalNotify(false)}
          pressConfirm={() => createNewBuilding()}
        />
      )}
      <CustomStepAppBar
        iconLeft={icons.ic_back}
        label={'Thiết lập dịch vụ'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressSeccodIconRight={async () => {}}
        pressIconLeft={() => navigation.goBack()}
        step={3}
      />

      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={styles.eachContainer}>
        <SuggestComponent
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />

        <TextTitleComponent
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseService')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listService.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(key: any) => `${key?.id}`}
                data={listService}
                renderItem={({item, index}) => renderPaidSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listService.length}`}</Text>
        </View>

        {StraightLine()}

        <TextTitleComponent
          label={'Tiện ích miễn phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('ChooseAmenity')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listAmenity.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(key: any) => `${key?.id}`}
                data={listAmenity}
                renderItem={({item, index}) => renderFreeSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
        </View>

        {StraightLine()}

        <TextTitleComponent label={'Lưu ý'} />

        <ComponentInput
          type={'inputNote'}
          title={'Lưu ý của tòa nhà'}
          placeholder={'Nhập lưu ý của tòa nhà'}
          value={notice}
          onChangeText={(text: any) => setNotice(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Ghi chú hóa đơn'}
          placeholder={'Nhập ghi chú hóa đơn'}
          value={billNotice}
          onChangeText={(text: any) => setBillNotice(text)}
        />

        <View style={{marginBottom: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Hoàn tất'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalNotify(true)}
        />
      </ScrollView>
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
  textPicker: {fontSize: 11, fontWeight: '400', color: 'orange'},
  pickerTotal: {
    fontSize: 15,
    color: 'orange',
    fontWeight: '600',
  },
});
export default AddNewHouseStep3;
