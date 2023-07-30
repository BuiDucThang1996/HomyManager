import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import BoxShowInfor from '../../../components/homeComponent/BoxShowInfor';
import {colors, icons, images} from '../../../constants';
import {useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {GetTenantDetailApi} from '../../../apis/homeApi/tenantApi';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import RenderImage from '../../../components/renderComponent/RenderImage';
import {convertDate, dateToDMY} from '../../../utils/common';
const TenantDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const tenantId: any = route.params;

  const [loadingTenant, setLoadingTenant] = useState(true);
  const [tenant, setTenant] = useState<any>();

  useEffect(() => {
    const getTenantInfor = async () => {
      await GetTenantDetailApi(tokenStore, tenantId)
        .then((res: any) => {
          if (res?.status == 200) {
            setTenant(res?.data);
            setLoadingTenant(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getTenantInfor();
  }, []);

  return (
    <View style={styles.container}>
      {loadingTenant && <LoadingComponent />}
      <AppBarComponent
        label={'Thông tin người thuê'}
        iconLeft={icons.ic_back}
        // iconRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{height: 170, width: '100%'}}>
          <Image
            source={images.im_appBar}
            style={{height: 100, width: '100%'}}
            resizeMode={'cover'}
          />
          <Image
            source={
              tenant?.avatarImage
                ? {uri: tenant?.avatarImage?.fileUrl}
                : icons.ic_user
            }
            style={styles.imageAvatar}
            resizeMode={'cover'}
          />
          <View style={{height: 70, marginLeft: 140}}>
            <Text style={styles.textName}>{`${tenant?.fullName}`}</Text>
            <Text
              style={styles.textNumberPhone}>{`${tenant?.phoneNumber}`}</Text>
          </View>
        </View>

        {/* <View style={{paddingHorizontal: 10}}>
          <TextTitleComponent label={'Phòng đang ở'} />
          <View style={styles.viewBetween}>
            <BoxShowInfor label={'Tòa nhà'} content={'Tòa nhà D2'} />
            <View style={{width: 5}} />
            <BoxShowInfor label={'Tầng'} content={'1'} />
          </View>
          <View style={[styles.viewBetween, {marginTop: 5}]}>
            <BoxShowInfor label={'Phòng'} content={'P101'} unit={'Người'} />
            <View style={{width: 5}} />
            <BoxShowInfor label={'Loại phòng'} content={'Studio'} />
          </View>
        </View> */}

        <View style={{paddingHorizontal: 10}}>
          <TextTitleComponent label={'Thông tin cá nhân'} />
          <BoxShowInfor label={'Địa chỉ'} content={`${tenant?.address}`} />
          <View style={[styles.viewBetween, {marginTop: 5}]}>
            <BoxShowInfor
              label={'Số điện thoại'}
              content={`${tenant?.phoneNumber}`}
            />
            <View style={{width: 5}} />
            <BoxShowInfor label={'Email'} content={`${tenant?.email}`} />
          </View>

          <View style={[styles.viewBetween, {marginTop: 5}]}>
            <BoxShowInfor
              label={'Ngày sinh'}
              content={`${convertDate(tenant?.birthDay)}`}
            />
            <View style={{width: 5}} />
            <BoxShowInfor
              label={'Số CMNN/CCCD'}
              content={`${tenant?.identityNumber}`}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <TextTitleComponent label={'Ảnh CMND/CCCD'} />
          {tenant?.identityImages?.length > 0 && (
            <FlatList
              horizontal
              data={tenant?.identityImages}
              keyExtractor={key => key?.id}
              renderItem={({item, index}) => {
                return <RenderImage data={item} />;
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  imageAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white',
    position: 'absolute',
    left: 20,
    bottom: 0,
  },
  textName: {color: '#374047', fontSize: 17, fontWeight: '600'},
  textNumberPhone: {color: colors.mainColor},
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default TenantDetail;
