import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeleteAmenityApi,
  GetAmenityDetalApi,
} from '../../../apis/homeApi/amenityApi';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {colors, icons} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';

const AmenityDetail = () => {
  const [loading, setLoading] = useState(true);
  const [amenity, setAmenity] = useState<any>(true);
  const tokenStore = useSelector(token);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const amenityId = route.params;
  const reload = useSelector(reloadState);
  const dispatch = useDispatch();
  // console.log(amenity);

  useEffect(() => {
    getamenityDetail();
  }, [reload]);
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

  const handlerDeleteAmenity = () => {
    Alert.alert('Xóa tiện ích', 'Bạn có muốn xóa tiện ích này ?', [
      {text: 'Hủy', style: 'cancel'},
      {text: 'Xóa', onPress: () => deleteAmenity()},
    ]);
  };

  const deleteAmenity = async () => {
    setLoading(true)
    await DeleteAmenityApi(tokenStore, amenityId)
      .then((res: any) => {
        if (res?.status == 200) {
          dispatch(updateReloadStatus('deleteAmenitySuccess'));
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
        label={'Chi tiết tiện ích'}
        pressIconLeft={() => navigation.goBack()}
        iconRight={icons.ic_edit}
        pressIconRight={() => {
          dispatch(updateReloadStatus('editAmenity'));
          navigation.navigate('EditAmenity', amenityId);
        }}
        iconSecondRight={icons.ic_trash}
        pressSeccodIconRight={() => handlerDeleteAmenity()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewDetail]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Tên tiện ích:</Text>
            <Text style={styles.title}>{`${amenity?.name}`}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Mô tả:</Text>
            <Text style={styles.title}>{`${amenity?.description}`}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewDetail: {backgroundColor: 'white', padding: 10, borderRadius: 8},
  title: {color: 'black', fontSize: 15, fontWeight: '600'},
});
export default AmenityDetail;
