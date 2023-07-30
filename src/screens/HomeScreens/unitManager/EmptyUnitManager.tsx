import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import {colors, icons, images} from '../../../constants';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import ButtonComponentBottom from '../../../components/commonComponent/CustomButtonBottom';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import AppBarFloorInfor from '../../../components/appBarComponent/AppBarFloorInfor';
import {GetListUnitsApi} from '../../../apis/homeApi/unitApi';
import {HauseDetailApi} from '../../../apis/homeApi/houseApi';
import {token} from '../../../store/slices/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';

const EmptyUnitManager = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const [listFloors, setListFloors] = useState<any>([]);
  const [listRoomOfFloor, setListRoomOfFloor] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [hauseInfor, setHauseInfor] = useState<any>();
  const hauseId: any = route.params;
  const statusLoading = useSelector(reloadState);
  // console.log(listRoomOfFloor);

  useEffect(() => {
    setLoading(true);
    const getListUnit = async () => {
      await HauseDetailApi(tokenStore, hauseId)
        .then(async (res: any) => {
          if (res?.status == 200) {
            // console.log(res?.data?.numberOfFloor);
            setHauseInfor(res?.data);
            let listFloor = [];
            for (let index = 0; index < res?.data?.numberOfFloor + 1; index++) {
              let obj = {floorNumber: index, floorInfor: []};
              listFloor.push(obj);
            }
            setListRoomOfFloor(listFloor);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
    getListUnit();
  }, [statusLoading]);

  useEffect(() => {
    const getData = async () => {
      await GetListUnitsApi(tokenStore, hauseId)
        .then((res: any) => {
          if (res?.status == 200) {
            let response = res?.data;
            let listEmptyRoom: any[] = [];
            response.forEach((element: any) => {
              if (element?.status === 'Trống') {
                listEmptyRoom.push(element);
              }
            });
            let eachListFloors = [...listRoomOfFloor];
            for (let index = 0; index < listEmptyRoom.length; index++) {
              const element = listEmptyRoom[index];
              const floorNumber = element?.floorNumber;
              eachListFloors[floorNumber]?.floorInfor?.push(element);
            }
            setListFloors(eachListFloors);
            setLoading(false);
          }
        })
        .catch((error: any) => console.log(error));
    };
    getData();
  }, [listRoomOfFloor]);

  const renderListFloor = (item: any, index: number) => {
    return (
      <View>
        {item?.floorInfor?.length > 0 && (
          <View>
            <TextTitleComponent
              viewTitle={{paddingHorizontal: 10}}
              label={`Tầng ${item?.floorNumber}`}
            />
            <FlatList
              numColumns={2}
              data={item?.floorInfor}
              keyExtractor={(key, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <CustomFloorInfor
                    numberRoom={`${item?.name}`}
                    status={`${item?.status}`}
                    username={`${item?.tenantUser}` ?? ''}
                    price={`${item?.rentMonthlyFee?.toLocaleString()}`}
                    onPress={() => {
                      dispatch(updateReloadStatus(false));
                      let id = {houseId: hauseId, unitId: item?.id};
                      navigation.navigate('UnitDetail', id);
                    }}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarFloorInfor
        hauseName={`${hauseInfor?.name ?? ''}`}
        address={`${hauseInfor?.fullAddress ?? ''}`}
        onPressLeft={() => navigation.goBack()}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
      />
      {loading ? (
        <ActivityIndicator color={colors.mainColor} size={'large'} />
      ) : (
        <>
          <ScrollView style={{paddingHorizontal: 5, paddingTop: 10}}>
            <View>
              <ScrollView horizontal={true} style={{width: '100%'}}>
                {listFloors.length > 0 ? (
                  <FlatList
                    numColumns={1}
                    data={listFloors}
                    keyExtractor={(key, index) => index.toString()}
                    renderItem={({item, index}) => renderListFloor(item, index)}
                  />
                ) : null}
              </ScrollView>
            </View>

            <View style={{height: 56}} />
          </ScrollView>
          <ButtonComponentBottom
            styleButton={{backgroundColor: colors.mainColor}}
            label={'Thêm phòng'}
            onPress={() => {
              dispatch(updateReloadStatus(false));
              navigation.navigate('AddNewUnit', route.params);
            }}
          />
        </>
      )}
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
  buttonEdit: {
    height: 22,
    flexDirection: 'row',
    borderRadius: 5,
  },
  labelEdit: {color: 'white', marginLeft: 3, fontSize: 10, marginHorizontal: 3},
  styleButton: {
    backgroundColor: colors.backgroundButton,
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  icon: {width: 15, height: 15, tintColor: 'white', marginRight: 5},
  icHome: {width: 18, height: 18, tintColor: colors.primary},
  viewFloor: {
    padding: 5,
    borderWidth: 1,
    borderColor: colors.mainColor,
    borderRadius: 10,
    margin: 5,
    height: 86,
  },
  buttomAddFloor: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.backgroundButton,
    marginTop: 30,
    flexDirection: 'row',
  },
  iconAddFloor: {width: 20, height: 20, tintColor: 'white', marginRight: 5},
  labelAddFloor: {fontSize: 16, fontWeight: '500', color: 'white'},
  textPrice: {color: colors.primary, fontSize: 13},
});

const CustomFloorInfor = (props: any) => {
  const widthView = Dimensions.get('window').width / 2 - 15;
  const {numberRoom, status, username, price, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{width: widthView}, styles.viewFloor]}>
      <View style={styles.viewRow}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={icons.ic_home}
            style={[styles.icHome, {marginRight: 5}]}
          />
          <Text style={{color: '#97A1A7', fontSize: 12}}>{numberRoom}</Text>
        </View>
        <ButtonComponent
          disabled={true}
          label={status == 'Trống' ? 'Trống' : 'Đã thuê'}
          styleLabel={styles.labelEdit}
          styleButton={[
            styles.buttonEdit,
            {
              backgroundColor:
                status == 'Trống' ? 'orange' : colors.backgroundButton,
            },
          ]}
        />
      </View>
      <Text style={{color: '#5F6E78', fontWeight: '400', fontSize: 13}}>
        {username}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textPrice}>Giá:</Text>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={styles.textPrice}>{` ${price} `}</Text>
        </View>
        <Text style={styles.textPrice}>VNĐ</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EmptyUnitManager;
