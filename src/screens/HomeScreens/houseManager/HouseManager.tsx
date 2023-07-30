import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetListHausesApi} from '../../../apis/homeApi/houseApi';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom'
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import AppBarSearchComponent from '../../../components/appBarComponent/AppBarSearchComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {colors, icons, images} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';
import {updateReloadStatus, reloadState} from '../../../store/slices/reloadSlice';
import useKeyboard from '../../../hooks/useKeyboard';

const HouseManager = () => {
  const navigation :any= useNavigation();
  const dispatch = useDispatch();
  const reload = useSelector(reloadState);
  const keyboard = useKeyboard();
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [listHauses, setListHauses] = useState([]);
  const tokenStore = useSelector(token);

  useEffect(() => {
    getData();
  }, [reload]);
  
  const getData = async () => {
    await GetListHausesApi(tokenStore)
      .then((res:any) => {
        if (res?.status == 200) {
          setListHauses(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const renderlistHauses = (item:any, index:number) => {
    return (
      <CustomRenderBuilding
        imageBuilding={item?.image?.fileUrl}
        name={`${item?.name}`}
        fullAddress={`${item?.fullAddress}`}
        numberRooms={`${item?.rooms ?? 0}`}
        unitTotal={`${item?.unitTotal}`}
        issueTotal={`${item?.issueTotal}`}
        emptyUnitTotal={`${item?.emptyUnitTotal ?? 0}`}
        onPress={() => {
          let hauseId = item?.id;
          navigation.navigate('HouseDetail', hauseId);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarSearchComponent
        iconLeft={icons.ic_back}
        label={'Quản lý tòa nhà'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_circle}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={(text:string) => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />

      <View style={{flex: 1}}>
        {loading && <LoadingComponent />}
        <View style={{paddingHorizontal: 10, flex: 1}}>
          <TextTitleComponent label={'Tòa nhà hiện có'} />
          <FlatList
            data={listHauses}
            keyExtractor={(item:any, index) => `${item?.id}`}
            renderItem={({item, index}) => renderlistHauses(item, index)}
          />
        </View>
        <CustomButtonBottom
          label={'Thêm tòa nhà mới'}
          onPress={() => {
            dispatch(updateReloadStatus('addNewHouse'));
            navigation.navigate('AddNewHouseStep1');
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
});

const CustomRenderBuilding = (props:any) => {
  const {
    name,
    fullAddress,
    onPress,
    issueTotal,
    imageBuilding,
    unitTotal,
    emptyUnitTotal,
  } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styleRender.button}>
      <Image
        source={
          typeof imageBuilding == 'string'
            ? {uri: `${imageBuilding}`}
            : icons.ic_building
        }
        style={styleRender.image}
      />
      <View style={styleRender.viewBetween}>
        <View style={styleRender.viewRow}>
          <Text style={styleRender.name}>{name}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text numberOfLines={2} style={styleRender.address}>
            {fullAddress}
          </Text>
        </View>
        <View style={[styleRender.viewRow]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styleRender.viewImage}>
              <Image
                source={icons.ic_home}
                style={{width: 20, height: 20, tintColor: colors.mainColor}}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: '#5F6E78',
                }}>
                {unitTotal}
              </Text>
              <Text style={{fontSize: 10, color: '#7F8A93'}}>Phòng</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styleRender.viewImage}>
              <Image
                source={icons.ic_key}
                style={{width: 18, height: 18, tintColor: '#7ACE68'}}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: '#5F6E78',
                }}>
                {emptyUnitTotal}
              </Text>
              <Text style={{fontSize: 10, color: '#7F8A93'}}>Trống</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styleRender.viewImage}>
              <Image
                source={icons.ic_exclamation}
                style={{width: 18, height: 18, tintColor: '#FE7A37'}}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: '#5F6E78',
                }}>
                {issueTotal}
              </Text>
              <Text style={{fontSize: 10, color: '#7F8A93'}}>Sự cố</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styleRender = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 2,
    padding: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 4,
    marginBottom: 20,
  },
  viewImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'rgba(116,116,116,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBetween: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: 76,
    height: 92,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'grey',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {width: 18, height: 18, tintColor: 'black', marginRight: 5},
  name: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  styleButton: {flexDirection: 'row', alignItems: 'center'},
  address: {fontSize: 9, color: 'grey'},
});
export default HouseManager;
