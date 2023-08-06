import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {GetContractDetailAPi} from '../../../apis/homeApi/contractApi';
import {colors, icons} from '../../../constants';
import {token} from '../../../store/slices/tokenSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {dateToDMY, formatNumber} from '../../../utils/common';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import CustomPersonInfor from '../../../components/homeComponent/CustomPersonInfor';
import {StraightLine} from '../../../components/commonComponent/LineConponent';
import RenderService from '../../../components/renderComponent/RenderService';
import RenderAmenity from '../../../components/renderComponent/RenderAmenity';
import RenderImage from '../../../components/renderComponent/RenderImage';
const ContractDetail = () => {
  const route = useRoute();
  const contractId: any = route.params;
  const navigation: any = useNavigation();
  const tokenStore = useSelector(token);
  const [contract, setContract] = useState<any>();
  const [loadingContract, setLoadingContract] = useState(true);
  // console.log(contract?.id);
  // console.log(tokenStore);
  
  useEffect(() => {
    const getData = async () => {
      await GetContractDetailAPi(tokenStore, contractId)
        .then((res: any) => {
          if (res?.status == 200) {
            let dataResponse = res?.data;
            let eachStartDate = new Date(dataResponse?.startDate);
            let eachEndDate = new Date(dataResponse?.endDate);
            let startDate = dateToDMY(eachStartDate);
            let endDate = dateToDMY(eachEndDate);
            setContract({...dataResponse, startDate, endDate});
            setLoadingContract(false);
          }
        })
        .catch(error => {
          Alert.alert(error);
        });
    };
    getData();
  }, []);
  const renderListService = (item: any, index: any) => {
    return (
      <RenderService
        calculateUnit={item?.chargeService?.calculateUnit}
        name={`${item?.chargeService?.name}`}
        fee={`${item?.chargeService?.fee?.toLocaleString()}`}
        onPress={() => navigation.navigate('ServiceDetail', item?.id)}
      />
    );
  };

  const renderListAcmenity = (item: any, index: any) => {
    return <RenderAmenity label={item?.name} onPress={() => navigation.navigate('AmenityDetail', item?.id)} />;
  };

const renderTenants = (item:any,index:number)=>{
  return (
    <CustomPersonInfor
      avatar={item?.avatarImage?.fileUrl}
      userName={item?.fullName}
      phoneNumber={item?.phoneNumber}
      pressAvatar={()=>navigation.navigate('TenantDetail',item?.id)}
    />
  );
}

  return (
    <View style={styles.container}>
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Thông tin hợp đồng'}
        pressIconLeft={() => navigation.goBack()}
      />
      {loadingContract && <LoadingComponent />}
      <ScrollView style={{paddingTop: 10, paddingHorizontal: 10}}>
        <View style={[styles.viewRow, {marginTop: 10}]}>
          <Image
            source={icons.ic_homeTabBar}
            style={[styles.icon, {marginRight: 5}]}
          />
          <Text
            style={
              styles.textInfor
            }>{`${contract?.unit?.house?.name} - ${contract?.unit?.name}`}</Text>
        </View>

        <View style={[styles.viewRow]}>
          <Image
            source={icons.ic_calendar}
            style={[styles.icon, {marginRight: 5}]}
          />
          <Text
            style={
              styles.textInfor
            }>{`Từ ${contract?.startDate} Đến ${contract?.endDate}`}</Text>
        </View>

        {StraightLine()}

        <CustomViewShowBetween
          title={'Tiền phòng'}
          value={`${formatNumber(`${contract?.leasingFee}`)}`}
          unit={'VNĐ'}
        />
        <CustomViewShowBetween
          title={'Tiền cọc'}
          value={`${formatNumber(`${contract?.depositMoney}`)}`}
          unit={'VNĐ'}
        />
        <CustomViewShowBetween
          title={'Kỳ thanh toán'}
          value={`${contract?.paymentDuration}`}
          unit={'Tháng'}
        />

        {StraightLine()}

        <TextTitleComponent label={'Dịch vụ có phí'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.chargeServices?.length > 0 && (
              <FlatList
                numColumns={2}
                data={contract?.chargeServices}
                keyExtractor={(key, index) => `${key?.id}${index.toString()}`}
                renderItem={({item, index}) => renderListService(item, index)}
              />
            )}
          </ScrollView>
        </View>

        {StraightLine()}

        <TextTitleComponent label={'Tiện ích miễn phí'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.amenities.length > 0 && (
              <FlatList
                numColumns={3}
                data={contract?.amenities}
                keyExtractor={(key, index) => `${key?.id}${index.toString()}`}
                renderItem={({item, index}) => renderListAcmenity(item, index)}
              />
            )}
          </ScrollView>
        </View>

        {StraightLine()}
        <TextTitleComponent label={'Danh sách người thuê'} />

        <View>
          <ScrollView style={{width: '100%'}} horizontal={true}>
            {contract?.tenants?.length > 0 && (
              <FlatList
                data={contract?.tenants}
                keyExtractor={key => key?.id}
                renderItem={({item, index}) => renderTenants(item,index)}
              />
            )}
          </ScrollView>
        </View>

        <TextTitleComponent label={'Ảnh hợp đồng'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.images?.length > 0 && (
              <FlatList
                data={contract?.images}
                keyExtractor={key => key?.id}
                renderItem={({item, index}) => <RenderImage data={item} />}
              />
            )}
          </ScrollView>
        </View>

        <View style={{height: 56}} />
      </ScrollView>
    </View>
  );
};

const CustomViewShowBetween = (props: any) => {
  const {styleView, title, value, unit} = props;
  return (
    <View style={[styles.viewBetween, styleView]}>
      <Text style={{color: 'rgba(127, 138, 147, 1)', fontSize: 13}}>
        {title}
      </Text>
      <View style={styles.viewRow}>
        <Text
          style={{
            color: 'rgba(55, 64, 71, 1)',
            fontWeight: '600',
            fontSize: 15,
          }}>
          {value}
        </Text>
        <Text
          style={{
            color: 'rgba(127, 138, 147, 1)',
            fontSize: 13,
          }}>{` ${unit}`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  viewBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  icon: {width: 20, height: 20},

  textInfor: {color: '#374047', fontSize: 13},
});
export default ContractDetail;
