import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View,Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteServiceApi, GetServiceDetailAPi} from '../../../apis/homeApi/serviceApi';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {colors, icons} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';

const ServiceDetail = () => {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<any>(null);
  const tokenStore = useSelector(token);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const serviceId = route.params;
  const reload = useSelector(reloadState);
  const dispatch = useDispatch();
  useEffect(() => {
    getServiceDetail();
  }, [reload]);
  const getServiceDetail = async () => {
    await GetServiceDetailAPi(tokenStore, serviceId)
      .then((res: any) => {
        if (res?.status == 200) {
          setService(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const handlerDeleteService = () =>{
    Alert.alert('Xóa dịch vụ', 'Bạn có muốn xóa dịch vụ này ?', [
      {text: 'Hủy', style: 'cancel'},
      {text: 'Xóa', onPress: () => deleteService()},
    ]);
  }

  const deleteService = async () => {
    setLoading(true);
    await DeleteServiceApi(tokenStore, serviceId)
      .then((res: any) => {
        if (res?.status == 200) {
          dispatch(updateReloadStatus('deleteServiceSuccess'));
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
        label={'Chi tiết dịch vụ'}
        pressIconLeft={() => navigation.goBack()}
        iconRight={icons.ic_edit}
        pressIconRight={() => {
          dispatch(updateReloadStatus('editService'));
          navigation.navigate('EditService', serviceId);
        }}
        iconSecondRight={icons.ic_trash}
        pressSeccodIconRight={()=>handlerDeleteService()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.viewDetail]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Tên dịch vụ:</Text>
            <Text style={styles.title}>{`${service?.name}`}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Mức phí:</Text>
            <Text style={styles.title}>{`${service?.fee} VNĐ`}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Đơn vị tính:</Text>
            <Text style={styles.title}>{`${service?.calculateUnit}`}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Mô tả:</Text>
            <Text style={styles.title}>{`${service?.description}`}</Text>
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
export default ServiceDetail;
