import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, icons, images} from '../../../constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import AppBarSearchComponent from '../../../components/appBarComponent/AppBarSearchComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {useDispatch, useSelector} from 'react-redux';
import {tenantState, updateTenant} from '../../../store/slices/tenantSlice';
import CustomPersonInfor from '../../../components/homeComponent/CustomPersonInfor';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {GetListTenantsApi} from '../../../apis/homeApi/tenantApi';
import {token} from '../../../store/slices/tokenSlice';
import useKeyboard from '../../../hooks/useKeyboard';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';

const ChooseTenant = () => {
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(true);
  const loadingState = useSelector(reloadState);
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const keyboard = useKeyboard();
  const [textSearch, setTextSearch] = useState('');
  const [listTenants, setListTenants] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await GetListTenantsApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachArray: any = [];
            eachData.map((data: any, index: any) => {
              let newData = {...data, isCheck: false};
              eachArray.push(newData);
            });
            setListTenants(eachArray);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, [loadingState]);

  const renderListTenants = (item: any, index: any) => {
    const updateItem = () => {
      let newList: any = [...listTenants];
      let itemCheck: any = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListTenants(newList);
    };
    return (
      <CustomPersonInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatarImage?.fileUrl}
        userName={item?.fullName}
        phoneNumber={item?.phoneNumber}
        isCheck={item?.isCheck}
        onPressCheck={() => updateItem()}
      />
    );
  };

  const updateTenantList = () => {
    let tenants: any = [];
    for (let index = 0; index < listTenants.length; index++) {
      const element: any = listTenants[index];
      if (element?.isCheck == true) {
        tenants.push(element);
      }
    }
    dispatch(updateTenant(tenants));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <LoadingComponent />}
      <AppBarSearchComponent
        iconLeft={icons.ic_back}
        label={'Danh sách người thuê'}
        // iconRight={icons.ic_bell}
        // iconSecondRight={icons.ic_moreOption}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={(text: any) => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={{paddingHorizontal: 10, paddingTop: 10, flex: 1}}>
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

      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => updateTenantList()}
        onPressRight={() => {
          dispatch(updateReloadStatus('addTenantSuccess'));
          navigation.navigate('AddNewTenant');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default ChooseTenant;
