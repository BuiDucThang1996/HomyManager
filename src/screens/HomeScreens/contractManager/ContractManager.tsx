import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {icons, colors} from '../../../constants';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import AppBarSearchComponent from '../../../components/appBarComponent/AppBarSearchComponent';
import ButtonComponentBottom from '../../../components/commonComponent/CustomButtonBottom';
import {useDispatch, useSelector} from 'react-redux';
import {reloadState, updateReloadStatus} from '../../../store/slices/reloadSlice';
import useKeyboard from '../../../hooks/useKeyboard';
import {
  DeleteContractAPi,
  GetListContractsApi,
  LiquidationContractApi,
} from '../../../apis/homeApi/contractApi';
import {token} from '../../../store/slices/tokenSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import RenderContract from '../../../components/renderComponent/RenderContract';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {convertDate} from '../../../utils/common';

const ContractManager = () => {
  const navigation:any = useNavigation();
  const keyboard = useKeyboard();
  const [textSearch, setTextSearch] = useState('');
  const tokenStore = useSelector(token);
  const [isActive, setIsActive] = useState(1);
  const dispatch = useDispatch();
  const statusLoading = useSelector(reloadState);
  const [listContractActive, setListContractActive] = useState<any>([]);
  const [listContractOutOfDate, setListContractOutOfDate] = useState<any>([]);
  const [listContractLiquidation, setListContractLiquidation] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [modalDeleteContract, setModalDeleteContract] = useState(false);
  const [modalLiquidationContract, setModalLiquidationContract] =
    useState(false);
  const [selectContract, setSelectContract] = useState<any>();

  useEffect(() => {
    const getListData = async () => {
      await GetListContractsApi(tokenStore)
        .then((res:any) => {
          if (res?.status == 200) {
            let response = res?.data;
            let active = [];
            let outOfDate = [];
            let liquidation = [];
            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              if (element?.status == 0) {
                active.push(element);
              } else if (element?.status == 2) {
                outOfDate.push(element);
              } else if (element?.status == 3) {
                liquidation.push(element);
              }
            }
            setListContractActive(active);
            setListContractOutOfDate(outOfDate);
            setListContractLiquidation(liquidation);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, [statusLoading]);

  const liquidationContract = async () => {
    setModalLiquidationContract(false);
    setLoading(true);
    await LiquidationContractApi(tokenStore, selectContract?.id)
      .then((res:any) => {
        if (res?.status == 200) {
          dispatch(updateReloadStatus(`liquidation${selectContract?.id}`));
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteContract = async () => {
    setModalDeleteContract(false);
    setLoading(true);
    await DeleteContractAPi(tokenStore, selectContract?.id)
      .then((res:any) => {
        if (res?.status == 200) {
          dispatch(updateReloadStatus(`deleteContract${selectContract?.id}`));
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {modalLiquidationContract && (
        <CustomModalNotify
          modalVisible={modalLiquidationContract}
          title={'Thanh lý hợp đồng'}
          label={'Bạn có muốn thanh lý hợp đồng này ?'}
          onRequestClose={() => setModalLiquidationContract(false)}
          pressConfirm={() => liquidationContract()}
        />
      )}
      {modalDeleteContract && (
        <CustomModalNotify
          modalVisible={modalDeleteContract}
          title={'Xóa hợp đồng'}
          label={'Bạn có muốn xóa hợp đồng này ?'}
          onRequestClose={() => setModalDeleteContract(false)}
          pressConfirm={() => deleteContract()}
        />
      )}
      {loading && <LoadingComponent />}
      <AppBarSearchComponent
        iconLeft={icons.ic_back}
        label={'Quản lý hợp đồng'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={(text:any) => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View style={styles.viewButtonTop}>
          <ButtonComponent
            styleButton={[
              {
                backgroundColor:
                  isActive == 1 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Hoạt động'}
            styleLabel={{color: isActive == 1 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(1)}
          />
          <ButtonComponent
            styleButton={[
              {
                backgroundColor:
                  isActive == 2 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Quá hạn'}
            styleLabel={{color: isActive == 2 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(2)}
          />
          <ButtonComponent
            styleButton={[
              {
                backgroundColor:
                  isActive == 3 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Đã thanh lý'}
            styleLabel={{color: isActive == 3 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(3)}
          />
        </View>
        {isActive == 1 ? (
          <View style={styles.container}>
            <TextTitleComponent label={'Hợp đồng đang hoạt động'} />
            <FlatList
              data={listContractActive}
              keyExtractor={key => key.id}
              renderItem={({item, index}) => {
                return (
                  <RenderContract
                    status={item?.status}
                    description={item?.description}
                    startDate={`${convertDate(item?.startDate)}`}
                    endDate={`${convertDate(item?.endDate)}`}
                    houseName={`${item?.unit?.house?.name}`}
                    unitName={`${item?.unit?.name}`}
                    contractOwner={`${item?.contractOwner?.fullName}`}
                    onPress={() =>
                      navigation.navigate('ContractDetail', item?.id)
                    }
                    pressEdit={() =>
                      navigation.navigate('EditContractInfor', item?.id)
                    }
                    pressLiquidation={() => {
                      setSelectContract(item);
                      setModalLiquidationContract(true);
                    }}
                    pressDelete={() => {
                      setSelectContract(item);
                      setModalDeleteContract(true);
                    }}
                  />
                );
              }}
            />
          </View>
        ) : isActive == 2 ? (
          <View style={styles.container}>
            <TextTitleComponent label={'Hợp đồng quá hạn'} />
            <FlatList
              data={listContractOutOfDate}
              keyExtractor={key => key.id}
              renderItem={({item, index}) => {
                return (
                  <RenderContract
                    status={item?.status}
                    description={item?.description}
                    startDate={`${convertDate(item?.startDate)}`}
                    endDate={`${convertDate(item?.endDate)}`}
                    houseName={`${item?.unit?.house?.name}`}
                    unitName={`${item?.unit?.name}`}
                    contractOwner={`${item?.contractOwner?.fullName}`}
                    onPress={() =>
                      navigation.navigate('ContractDetail', item?.id)
                    }
                    pressEdit={() =>
                      navigation.navigate('EditContractInfor', item?.id)
                    }
                    pressLiquidation={() => {
                      setSelectContract(item);
                      setModalLiquidationContract(true);
                    }}
                    pressDelete={() => {
                      setSelectContract(item);
                      setModalDeleteContract(true);
                    }}
                  />
                );
              }}
            />
          </View>
        ) : isActive == 3 ? (
          <View style={styles.container}>
            <TextTitleComponent label={'Hợp đồng đã thanh lý'} />
            <FlatList
              data={listContractLiquidation}
              keyExtractor={key => key.id}
              renderItem={({item, index}) => {
                return (
                  <RenderContract
                    status={item?.status}
                    description={item?.description}
                    startDate={`${convertDate(item?.startDate)}`}
                    endDate={`${convertDate(item?.endDate)}`}
                    houseName={`${item?.unit?.house?.name}`}
                    unitName={`${item?.unit?.name}`}
                    contractOwner={`${item?.contractOwner?.fullName}`}
                    onPress={() =>
                      navigation.navigate('ContractDetail', item?.id)
                    }
                    pressEdit={() =>
                      navigation.navigate('EditContract', item?.id)
                    }
                    pressLiquidation={() => {
                      setSelectContract(item);
                      setModalLiquidationContract(true);
                    }}
                    pressDelete={() => {
                      setSelectContract(item);
                      setModalDeleteContract(true);
                    }}
                  />
                );
              }}
            />
          </View>
        ) : null}
        <ButtonComponentBottom
          label={'Thêm hợp đồng'}
          onPress={() => {
            dispatch(updateReloadStatus(false));
            navigation.navigate('CreateContract');
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  eachContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
  styleLabel: {color: 'white', fontWeight: '500', marginLeft: 5},
  topButton: {marginRight: 15, height: 44, borderBottomWidth: 3},
  labelTop: {fontWeight: 'bold', fontSize: 16},
  viewButtonTop: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
});
export default ContractManager;
