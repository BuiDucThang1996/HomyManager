import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors, icons} from '../../../constants';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {ScrollView} from 'react-native-gesture-handler';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import CustomButtonBottom from '../../../components/commonComponent/CustomButtonBottom';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import {
  GetAmenityDetalApi,
  PutAmenityApi,
} from '../../../apis/homeApi/amenityApi';

const EditAmenity = () => {
  const route: any = useRoute();
  const amenityId = route.params;
  const tokenStore = useSelector(token);
  const [amenity, setAmenity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  // console.log(amenity);

  useEffect(() => {
    getamenityDetail();
  }, []);
  const getamenityDetail = async () => {
    await GetAmenityDetalApi(tokenStore, amenityId)
      .then((res: any) => {
        if (res?.status == 200) {
          setAmenity(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const handlerEditAmenity = async () => {
    setLoading(true);
    let data = {
      name: amenity?.name ?? '',
      description: amenity?.description ?? '',
    };
    await PutAmenityApi(tokenStore, data, amenityId)
      .then((res: any) => {
        if (res?.status === 200) {
          dispatch(updateReloadStatus('editAmenitySuccess'));
          setLoading(false);
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Chỉnh sửa tiện ích'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, marginTop: 10}}>
        <SuggestComponent
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />

        <TextTitleComponent label={'Thông tin tiện ích'} />

        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên tiện ích'}
          placeholder={'Nhập tên tiện ích'}
          value={amenity?.name}
          onChangeText={(text: any) => {
            let eachAmenity = {...amenity, name: text};
            setAmenity(eachAmenity);
          }}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Mô tả tiện ích'}
          placeholder={'Nhập mô tả tiện ích'}
          value={amenity?.description}
          onChangeText={(text: any) => {
            let eachAmenity = {...amenity, description: text};
            setAmenity(eachAmenity);
          }}
        />

        <View style={{marginBottom: 56}} />
      </ScrollView>
      <CustomButtonBottom
        label={'Xác nhận'}
        isAddNew={true}
        onPress={() => handlerEditAmenity()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
});
export default EditAmenity;
