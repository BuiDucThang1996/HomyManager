import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import {colors, icons, images} from '../../../constants';
import {useSelector} from 'react-redux';
import {reloadState} from '../../../store/slices/reloadSlice';
import {token} from '../../../store/slices/tokenSlice';
import {GetListNotificationApi} from '../../../apis/homeApi/notificationApis';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';

const NotificationScreen = (props: any) => {
  const navigation: any = useNavigation();
  const reload = useSelector(reloadState);
  const tokenStorage = useSelector(token);
  const [listNotifi, setListNotifi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [reload]);
  // console.log(listNotifi);

  const getData = async () => {
    await GetListNotificationApi(tokenStorage)
      .then((res: any) => {
        if (res?.status == 200) {
          setListNotifi(res?.data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = (item: any, index: number) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailNotification', item)}
          style={[styles.buttonRender, styles.shadowView]}>
          <ButtonComponent
            disabled={true}
            icon={icons.ic_bell}
            styleIcon={{tintColor: colors.mainColor, width: 22, height: 22}}
            styleButton={styles.viewBell}
          />
          <View>
            <Text style={styles.title}>{item?.title}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text numberOfLines={1} style={styles.duration}>{`${item?.description}  `}</Text>
              {/* <Text style={styles.duration}>{item?.day}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {loading && <LoadingComponent modalVisible={loading} />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Thông báo'}
      />
      <View style={{paddingHorizontal: 10, flex: 1, paddingTop: 10}}>
        <FlatList
          data={listNotifi}
          keyExtractor={(key: any) => key?.id}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  time: {color: '#374047', fontWeight: '600', fontSize: 15},
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 1,
    elevation: 5,
  },
  buttonRender: {
    height: 64,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBell: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#EDFCFB',
    marginHorizontal: 10,
  },
  title: {fontSize: 15, fontWeight: '600', color: '#374047'},
  duration: {fontSize: 13, fontWeight: '400', color: '#374047'},
});
export default NotificationScreen;
