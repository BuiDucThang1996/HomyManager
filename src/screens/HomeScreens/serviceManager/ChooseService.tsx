import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../constants';
import CustomChecker from '../../../components/commonComponent/CustomChecker';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {useDispatch, useSelector} from 'react-redux';
import {serviceState, updateService} from '../../../store/slices/serviceSlice';
import {token} from '../../../store/slices/tokenSlice';
import {GetListServicesApi} from '../../../apis/homeApi/serviceApi';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {removeDuplicateElements, uuid} from '../../../utils/common';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import {formatNumber} from '../../../utils/common';

const ChooseService = () => {
  const loadingState = useSelector(reloadState);
  const tokenStore = useSelector(token);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [listSevice, setListSevice] = useState<any>([]);
  const [eachService, setEachService] = useState([]);
  const [loading, setLoading] = useState(true);
  const serviceSelect = useSelector(serviceState);
  // console.log(listSevice,'serviceSelect');

  useEffect(() => {
    const getListService = async () => {
      await GetListServicesApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachService: any = [];
            eachData.map((data: any, index: number) => {
              let newData = {...data, isCheck: false};
              eachService.push(newData);
            });
            setEachService(eachService);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListService();
  }, [loadingState]);

  useMemo(() => {
    let newArray = eachService.concat(serviceSelect);
    let resultCheckElement = removeDuplicateElements(newArray);
    setListSevice(resultCheckElement);
  }, [eachService, serviceSelect]);

  const renderListService = (item: any, index: number) => {
    const updateItem = () => {
      let newList: any = [...listSevice];
      let itemCheck: any = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListSevice(newList);
    };
    return (
      <CustomChecker
        label={`${item?.name}`}
        value={`${formatNumber(`${item?.fee}`)}`}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  const updateNewService = () => {
    let services: any = [];
    for (let index = 0; index < listSevice.length; index++) {
      const element: any = listSevice[index];
      if (element?.isCheck == true) {
        services.push(element);
      }
    }
    dispatch(updateService(services));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Dịch vụ'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={[styles.eachContainer]}>
        <SuggestComponent
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />

        <TextTitleComponent label={'Dịch vụ đã thêm'} />

        {listSevice?.length > 0 ? (
          <FlatList
            numColumns={2}
            data={listSevice}
            keyExtractor={uuid}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        ) : null}
      </View>
      <CustomTwoButtonBottom
        leftLabel={'Thêm mới'}
        rightLabel={'Lưu'}
        onPressRight={() => updateNewService()}
        onPressLeft={() => {
          dispatch(updateReloadStatus('addNewService'));
          navigation.navigate('AddNewService');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
});
export default ChooseService;
