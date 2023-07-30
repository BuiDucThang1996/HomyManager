import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {icons} from '../../../constants';
import {useSelector} from 'react-redux';
import {reloadState} from '../../../store/slices/reloadSlice';
import {token} from '../../../store/slices/tokenSlice';
import {GetNotificationDetailApi} from '../../../apis/homeApi/notificationApis';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
const DetailNotification = (props: any) => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const reload = useSelector(reloadState);
  const tokenStorage = useSelector(token);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<any>();
  const notifiId = route?.params?.id;

  useEffect(() => {
    getData();
  }, [reload]);
  // console.log(listNotifi);

  const getData = async () => {
    await GetNotificationDetailApi(tokenStorage, notifiId)
      .then((res: any) => {
        if (res?.status == 200) {
          setNotification(res?.data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent modalVisible={loading} />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Nội dung thông báo'}
      />
      <ScrollView style={{paddingHorizontal: 10}}>
        <TextTitleComponent label={notification?.title} />

        <Text style={styles.bodyMessage}>{`${notification?.body}`}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  bodyMessage: {color: 'rgba(55, 64, 71, 1)', fontSize: 13, marginBottom: 20},
});
export default DetailNotification;
