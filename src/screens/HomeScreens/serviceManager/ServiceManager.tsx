import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import useKeyboard from '../../../hooks/useKeyboard';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import {icons, colors} from '../../../constants';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import AppBarSearchComponent from '../../../components/appBarComponent/AppBarSearchComponent';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import RenderService from '../../../components/renderComponent/RenderService';
import {
  DeleteServiceApi,
  GetListServicesApi,
} from '../../../apis/homeApi/serviceApi';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';

const ServiceManager = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const keyboard = useKeyboard();
  const isLoading = useSelector(reloadState);
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const tokenStore = useSelector(token);

  useEffect(() => {
    getListService();
  }, [isLoading]);

  const getListService = async () => {
    setLoading(true);
    await GetListServicesApi(tokenStore)
      .then((res: any) => {
        if (res?.status == 200) {
          setListSevice(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const [listSevice, setListSevice] = useState([]);

  const renderListService = (item: any, index: number) => {
    return (
      <RenderService
        isDelete={true}
        icon={`${item?.icon}`}
        name={`${item?.name}`}
        calculateUnit={`${item?.calculateUnit}`}
        fee={`${item?.fee?.toLocaleString()}`}
        onPress={() => navigation.navigate('ServiceDetail', item?.id)}
        deleteService={() => {
          Alert.alert('Xóa dịch vụ', 'Bạn có muốn xóa dịch vụ này ?', [
            {text: 'Hủy', style: 'cancel'},
            {text: 'Xóa', onPress: () => deleteService(item?.id)},
          ]);
        }}
      />
    );
  };
  const deleteService = async (id: any) => {
    setLoading(true);
    await DeleteServiceApi(tokenStore, id)
      .then((res: any) => {
        if (res?.status == 200) {
          getListService();
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
        label={'Quản lý dịch vụ'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={(text: any) => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />

      <View style={styles.eachContainer}>
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
        label={'Thêm dịch vụ mới'}
        onPress={() => {
          dispatch(updateReloadStatus(true));
          navigation.navigate('AddNewService');
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
export default ServiceManager;
