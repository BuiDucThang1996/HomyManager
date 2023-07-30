import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {colors, icons, images} from '../../../constants';
import CustomPersonInfor from '../../../components/homeComponent/CustomPersonInfor';
import AppBarSearchComponent from '../../../components/appBarComponent/AppBarSearchComponent';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {GetListTenantsApi} from '../../../apis/homeApi/tenantApi';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';
import useKeyboard from '../../../hooks/useKeyboard';
import { userInfor } from '../../../store/slices/userInforSlice';

const TenantManager = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const keyboard = useKeyboard();
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [listTenants, setListTenants] = useState([]);
  const tokenStore = useSelector(token);
  const statusLoading = useSelector(reloadState);
  const userStore = useSelector(userInfor);

  useEffect(() => {
    const getListTenants = async () => {
      await GetListTenantsApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            setListTenants(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListTenants();
  }, [statusLoading]);

  const renderListTenants = (item: any, index: number) => {
    return (
      <CustomPersonInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatarImage?.fileUrl}
        userName={item?.fullName}
        phoneNumber={item?.phoneNumber}
        pressAvatar={() => navigation.navigate('TenantDetail', item?.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppBarSearchComponent
        iconLeft={icons.ic_back}
        label={'Quản lý người thuê'}
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
        onChangeText={(text: any) => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        {loading && <LoadingComponent />}
        {listTenants.length > 0 ? (
          <FlatList
            horizontal={false}
            scrollEnabled={false}
            keyExtractor={(key: any, index) => `${key.userName}${index}`}
            data={listTenants}
            renderItem={({item, index}) => renderListTenants(item, index)}
          />
        ) : null}
      </View>

      <CustomButtonBottom
        label={'Thêm mới người thuê'}
        onPress={() => {
          dispatch(updateReloadStatus(true));
          navigation.navigate('AddNewTenant');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  eachContainer: {paddingHorizontal: 10, paddingTop: 10, flex: 1},
});
export default TenantManager;
