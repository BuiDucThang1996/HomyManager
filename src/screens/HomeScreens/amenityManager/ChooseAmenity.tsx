import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../constants';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import CustomChecker from '../../../components/commonComponent/CustomChecker';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {useDispatch, useSelector} from 'react-redux';
import {amenityState, updateAmenity} from '../../../store/slices/amenitySlice';
import {GetListAmenitysApi} from '../../../apis/homeApi/amenityApi';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {
  reloadState,
  updateReloadStatus,
} from '../../../store/slices/reloadSlice';
import {token} from '../../../store/slices/tokenSlice';
import {removeDuplicateElements} from '../../../utils/common';

const ChooseAmenity = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const loadingState = useSelector(reloadState);
  const [listAmenitys, setListAmenitys] = useState<any>([]);
  const [eachAmenity, setEachAmenity] = useState([]);
  const [loading, setLoading] = useState(true);
  const amenitySelect = useSelector(amenityState);

  useEffect(() => {
    const getListAmenity = async () => {
      await GetListAmenitysApi(tokenStore)
        .then((res: any) => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachArray: any = [];
            eachData.map((data: any, index: number) => {
              let newData = {...data, isCheck: false};
              eachArray.push(newData);
            });
            setEachAmenity(eachArray);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListAmenity();
  }, [loadingState]);

  useMemo(() => {
    let newArray = eachAmenity.concat(amenitySelect);
    let resultCheckElement = removeDuplicateElements(newArray);
    setListAmenitys(resultCheckElement);
  }, [eachAmenity, amenitySelect]);

  const renderListService = (item: any, index: number) => {
    const updateItem = () => {
      let newList: any = [...listAmenitys];
      let itemCheck: any = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListAmenitys(newList);
    };
    return (
      <CustomChecker
        label={`${item?.name}`}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  const updateAmenitys = () => {
    let amenitys: any = [];
    for (let index = 0; index < listAmenitys.length; index++) {
      const element: any = listAmenitys[index];
      if (element?.isCheck == true) {
        amenitys.push(element);
      }
    }
    dispatch(updateAmenity(amenitys));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <LoadingComponent />}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Tiện ích'}
        // iconRight={icons.ic_bell}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={[styles.eachContainer]}>
        <SuggestComponent
          label={'Chọn tiện ích miễn phí đã có hoặc thêm mới tiện ích'}
        />
        <TextTitleComponent label={'Tiện ích hiện có'} />

        {listAmenitys.length > 0 ? (
          <FlatList
            numColumns={2}
            data={listAmenitys}
            keyExtractor={(key: any) => `${key.id}`}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        ) : null}
      </View>
      <CustomTwoButtonBottom
        leftLabel={'Thêm mới'}
        rightLabel={'Lưu'}
        onPressRight={() => updateAmenitys()}
        onPressLeft={() => {
          dispatch(updateReloadStatus('goToUpdateUtilities'));
          navigation.navigate('AddNewAmenity');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.backgroundGrey,
  },
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13, fontWeight: '400'},
  viewButton: {alignSelf: 'center', alignItems: 'center', marginVertical: 50},
});
export default ChooseAmenity;
