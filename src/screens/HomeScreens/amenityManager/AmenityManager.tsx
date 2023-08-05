import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import {icons, colors} from '../../../constants';
import AppBarSearchComponent from '../../../components/appBarComponent/AppBarSearchComponent';
import {useDispatch, useSelector} from 'react-redux';
import {updateAmenity} from '../../../store/slices/amenitySlice';
import {token} from '../../../store/slices/tokenSlice';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import {
  GetListAmenitysApi,
  DeleteAmenityApi,
} from '../../../apis/homeApi/amenityApi';
import useKeyboard from '../../../hooks/useKeyboard';

const AmenityManager = () => {
  const navigation: any = useNavigation();
  const isLoading = useSelector(reloadState);
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const keyboard = useKeyboard();
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    getListData();
  }, [isLoading]);

  const getListData = async () => {
    await GetListAmenitysApi(tokenStore)
      .then((res: any) => {
        if (res?.status == 200) {
          let eachData = res?.data;
          let eachArray: any = [];
          eachData.map((data: any, index: number) => {
            let newData = {...data, isCheck: false};
            eachArray.push(newData);
          });
          dispatch(updateAmenity(eachArray));
          setListSevice(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const [listSevice, setListSevice] = useState([]);

  const renderListService = (item: any, index: number) => {
    return (
      <RenderAmenity
        label={item?.name}
        // isDelete={true}
        onPress={() => navigation.navigate('AmenityDetail', item?.id)}
        deleteAmenity={() => {}}
      />
    );
  };

  const deleteAmenity = async (id: string) => {
    setLoading(true);
    await DeleteAmenityApi(tokenStore, id)
      .then((res: any) => {
        if (res?.status == 200) {
          getListData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <LoadingComponent />}
      <AppBarSearchComponent
        iconLeft={icons.ic_back}
        label={'Quản lý tiện ích'}
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
      {loading && <LoadingComponent />}
      <View style={[styles.eachContainer]}>
        {listSevice.length > 0 ? (
          <FlatList
            numColumns={2}
            data={listSevice}
            keyExtractor={(key: any) => key.id}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        ) : null}
      </View>

      <CustomButtonBottom
        label={'Thêm tiện ích mới'}
        onPress={() => {
          dispatch(updateReloadStatus(true));
          navigation.navigate('AddNewAmenity');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colors.backgroundGrey,
    paddingHorizontal: 10,
  },
});
export default AmenityManager;
