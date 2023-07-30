import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import {colors, icons, images} from '../../../constants';
import BoxShowInfor from '../../../components/homeComponent/BoxShowInfor';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomPersonInfor from '../../../components/homeComponent/CustomPersonInfor';
import RenderService from '../../../components/renderComponent/RenderService';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import AppBarHouseInfor from '../../../components/appBarComponent/AppBarHouseInfor';
import {GetUnitDetailAPi} from '../../../apis/homeApi/unitApi';
import {useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {convertDate, formatNumber} from '../../../utils/common';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import RenderImage from '../../../components/renderComponent/RenderImage';
import RenderContract from '../../../components/renderComponent/RenderContract';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import {StraightLine} from '../../../components/commonComponent/LineConponent';
import AppBarUnitInfor from '../../../components/appBarComponent/AppBarRoomInfor';

const UnitDetail = () => {
  const route: any = useRoute();
  const unitId: any = route.params.unitId;
  const tokenStore = useSelector(token);
  const navigation: any = useNavigation();
  const [unit, setUnit] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [modalDeleteRoom, setModalDeleteRoom] = useState(false);

  useEffect(() => {
    const getListData = async () => {
      await GetUnitDetailAPi(tokenStore, unitId)
        .then((res: any) => {
          if (res?.status == 200) {
            setUnit(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error, 'error unit detail'));
    };
    getListData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <LoadingComponent />}
      {modalDeleteRoom && (
        <CustomModalNotify
          modalVisible={modalDeleteRoom}
          title={'Xóa phòng'}
          label={'Bạn có muốn xóa phòng này ?'}
          onRequestClose={() => setModalDeleteRoom(false)}
          pressConfir={() => {}}
        />
      )}
      <AppBarUnitInfor
        addressBuilding={unit?.house?.fullAddress}
        nameRoom={`${unit?.name ?? ''}`}
        onPressLeft={() => navigation.goBack()}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        pressDelete={() => setModalDeleteRoom(true)}
        pressQuickAddRoom={() =>
          navigation.navigate('QuickAddUnit', route.params)
        }
        pressEdit={() =>
          navigation.navigate('EditUnitInfor', route.params)
        }
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <TextTitleComponent label={'Thông tin phòng'} />

        <View style={styles.viewRow}>
          <BoxShowInfor label={'Tầng'} content={`${unit?.floorNumber ?? ''}`} />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Diện tích'}
            content={`${unit?.area ?? ''}`}
            unit={'m2'}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <BoxShowInfor
            label={'Số người tối đa'}
            content={`${unit?.limitTenantNumber ?? ''}`}
            unit={'Người'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            styleView={{marginTop: 10}}
            label={'Loại phòng'}
            content={`${unit?.roomType ?? ''}`}
          />
        </View>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <BoxShowInfor
            label={'Đặt cọc'}
            content={`${formatNumber(`${unit?.depositMoney}`) ?? ''}`}
            unit={'VNĐ'}
          />
          <View style={{width: 10}} />
          <BoxShowInfor
            label={'Giá'}
            content={`${formatNumber(`${unit?.rentMonthlyFee}`) ?? ''}`}
            unit={'VNĐ'}
          />
        </View>

        {StraightLine()}

        <TextTitleComponent
          label={'Hợp đồng cho thuê'}
          labelButton={unit?.activeContract ? '' : 'Thêm hợp đồng +'}
          onPress={() => navigation.navigate('CreateContractFromUnit', unitId)}
        />
        {unit?.activeContract && (
          <RenderContract
            description={unit?.activeContract?.description}
            startDate={`${convertDate(unit?.activeContract?.startDate)}`}
            endDate={`${convertDate(unit?.activeContract?.endDate)}`}
            houseName={`${unit?.activeContract?.unit?.house?.name}`}
            unitName={`${unit?.activeContract?.unit?.name}`}
            contractOwner={`${unit?.activeContract?.contractOwner?.fullName}`}
            onPress={() =>
              navigation.navigate('ContractDetail', unit?.activeContract?.id)
            }
          />
        )}
        {StraightLine()}

        <TextTitleComponent label={'Thông tin người ở'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {unit?.activeContract?.tenants.length > 0 && (
              <FlatList
                data={unit?.activeContract?.tenants}
                keyExtractor={key => key?.id}
                renderItem={({item, index}) => {
                  return (
                    <CustomPersonInfor
                      styleView={{marginTop: 10}}
                      avatar={item?.avatarImage?.fileUrl}
                      userName={item?.fullName}
                      phoneNumber={item?.phoneNumber}
                      pressAvatar={() =>
                        navigation.navigate('TenantDetail', item?.id)
                      }
                    />
                  );
                }}
              />
            )}
          </ScrollView>
        </View>

        {StraightLine()}

        <TextTitleComponent label={'Dịch vụ có phí'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {unit?.chargeServices?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(key, index) => `${key?.id}${index.toString()}`}
                data={unit?.chargeServices}
                renderItem={({item, index}) => {
                  return (
                    <RenderService
                      name={item?.name}
                      fee={item?.fee}
                      calculateUnit={item?.calculateUnit}
                      onPress={() =>
                        navigation.navigate('ServiceDetail', item?.id)
                      }
                    />
                  );
                }}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${
            unit?.chargeServices?.length ?? 0
          }`}</Text>
        </View>

        {StraightLine()}
        <TextTitleComponent label={'Tiện ích miễn phí'} />

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {unit?.amenities?.length > 0 ? (
              <FlatList
                horizontal={false}
                scrollEnabled={false}
                numColumns={3}
                keyExtractor={(key, index) => `${key?.id}${index.toString()}`}
                data={unit?.amenities}
                renderItem={({item, index}) => {
                  return (
                    <RenderAmenity
                      label={item?.name}
                      onPress={() =>
                        navigation.navigate('AmenityDetail', item?.id)
                      }
                    />
                  );
                }}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${
            unit?.amenities?.length ?? 0
          }`}</Text>
        </View>

        {StraightLine()}

        <TextTitleComponent label={'Ảnh phòng'} />
        {unit?.images?.length > 0 && (
          <FlatList
            horizontal
            data={unit?.images}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => {
              return <RenderImage data={item} deleteItem={async () => {}} />;
            }}
          />
        )}
        {StraightLine()}

        <TextTitleComponent label={'Mô tả phòng'} />
        <Text style={{color: 'black', fontSize: 14}}>{unit?.description}</Text>
        {StraightLine()}

        <TextTitleComponent label={'Lưu ý cho người thuê'} />
        <Text style={{color: 'black', fontSize: 14}}>{unit?.notice}</Text>

        <View style={{height: 56}} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBuilding: {fontSize: 25, fontWeight: 'bold', color: 'white'},
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
});

export default UnitDetail;
