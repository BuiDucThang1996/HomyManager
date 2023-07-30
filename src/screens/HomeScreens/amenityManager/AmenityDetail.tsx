import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GetAmenityDetalApi} from '../../../apis/homeApi/amenityApi';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {colors, icons} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';

const AmenityDetail = () => {
  const [loading, setLoading] = useState(true);
  const [amenity, setAmenity] = useState<any>(true);
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const route: any = useRoute();
  // console.log(amenity);
  useEffect(() => {
    getamenityDetail();
  }, []);
  const getamenityDetail = async () => {
    await GetAmenityDetalApi(tokenStore, route.params)
      .then((res: any) => {
        if (res?.status == 200) {
          setAmenity(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Chi tiết tiện ích'}
        pressIconLeft={() => navigation.goBack()}
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
