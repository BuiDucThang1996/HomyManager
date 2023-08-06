import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {colors, icons, images} from '../../../constants';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import IndexInputComponent from '../../../components/commonComponent/IndexInputComponent';
import {
  formatNumber,
  onOpenCamera,
  onOpenLibrary,
  validateNumber,
} from '../../../utils/common';
import ButtonComponent from '../../../components/commonComponent/ButtonComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  GetDetailInvoiceUnClosingsApi,
  PutInvoiceUnClosingsApi,
} from '../../../apis/homeApi/invoiceClosingApi';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import {
  DeleteImageApi,
  PostInvoiceServiceFilesUploadApi,
} from '../../../apis/homeApi/fileDataApi';
import {
  BreakLine,
  StraightLine,
} from '../../../components/commonComponent/LineConponent';
import { useActionSheet } from '@expo/react-native-action-sheet';
const widthView = Dimensions.get('window').width / 2 - 15;

const InvoiceClosing = () => {
  const navigation: any = useNavigation();
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const route = useRoute();
  const confirmId: any = route.params;
  const [modalShowImage, setModalShowImage] = useState(false);
  const [confirmInvoice, setConfirmInvoice] = useState<any>();
  // console.log(confirmInvoice.contract);

  const [loading, setLoading] = useState(true);
  const [progressiveServiceClosings, setProgressiveServiceClosings] =
    useState<any>();
  const [indexValue, setIndexValue] = useState<any>();
  const [selectedPhoto, setSelectedPhoto] = useState();

  useEffect(() => {
    const getData = async () => {
      await GetDetailInvoiceUnClosingsApi(tokenStore, confirmId)
        .then((res: any) => {
          if (res?.status == 200) {
            setConfirmInvoice(res?.data);
            let data = res?.data?.progressiveServiceClosings;
            let array = [];
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              let newElement = {
                ...element,
                imageUsageNumber: null,
              };
              array.push(newElement);
            }
            setProgressiveServiceClosings(array);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getData();
  }, []);

  

  const checkData = () => {
    let array = [];
    for (let index = 0; index < progressiveServiceClosings.length; index++) {
      const element = progressiveServiceClosings[index];
      let thisStageUsageNumber = parseInt(
        `${validateNumber(`${element?.thisStageUsageNumber}`)}`,
      );
      let previousStageUsageNumber = parseInt(
        `${validateNumber(`${element?.previousStageUsageNumber}`)}`,
      );
      let subtract = thisStageUsageNumber - previousStageUsageNumber;
      if (subtract < 0) {
        Alert.alert('Có lỗi sảy ra', 'Vui lòng kiểm tra lại thông tin đã nhập');
        break;
      }
      let object = {
        id: element?.id,
        thisStageUsageAmount: subtract,
        thisStageUsageNumber: parseInt(`${element?.thisStageUsageNumber}`),
      };
      array.push(object);
    }
    return array;
  };

  const saveInvoiceClosings = async () => {
    checkData();
    const data = {progressiveServiceClosings: checkData()};
    if (
      data?.progressiveServiceClosings?.length ==
      progressiveServiceClosings?.length
    ) {
      setLoading(true);
      await PutInvoiceUnClosingsApi(tokenStore, data, confirmId)
        .then(async (res: any) => {
          if (res?.status == 200) {
            for (
              let index = 0;
              index < progressiveServiceClosings.length;
              index++
            ) {
              const element = progressiveServiceClosings[index];
              let image = [];
              if (
                element?.image != null &&
                typeof element?.image?.uri == 'string'
              ) {
                image.push(element?.image);
                await PostInvoiceServiceFilesUploadApi(
                  tokenStore,
                  element?.id,
                  image,
                )
                  .then((res: any) => {
                    if (res?.status == 200) {
                      console.log(res?.status);
                    }
                  })
                  .catch(error => {
                    console.log(error, 'upload image error');
                  });
              }
            }
            dispatch(updateReloadStatus('updateInvoiceClosings'));
            navigation.navigate('InvoiceClosingManager');
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const goToConfirmInvoiceClosings = async () => {
    checkData();
    const data = {progressiveServiceClosings: checkData()};
    if (
      data?.progressiveServiceClosings?.length ==
      progressiveServiceClosings?.length
    ) {
      setLoading(true);
      await PutInvoiceUnClosingsApi(tokenStore, data, confirmId)
        .then(async (res: any) => {
          if (res?.status == 200) {
            for (
              let index = 0;
              index < progressiveServiceClosings.length;
              index++
            ) {
              const element = progressiveServiceClosings[index];
              let image = [];
              if (
                element?.image != null &&
                typeof element?.image?.uri == 'string'
              ) {
                image.push(element?.image);
                await PostInvoiceServiceFilesUploadApi(
                  tokenStore,
                  element?.id,
                  image,
                )
                  .then((res: any) => {
                    if (res?.status == 200) {
                      console.log(res?.status);
                    }
                  })
                  .catch(error => {
                    console.log(error, 'upload image error');
                  });
              }
            }

            dispatch(updateReloadStatus('updateInvoiceClosings'));
            navigation.navigate('CheckInvoice', confirmId);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const renderItem = (item:any,index:number) => {
    return (
      <View>
        <TextTitleComponent
          label={`Chỉ số ${item?.serviceName}`}
        />
        <View style={styles.viewBetween}>
          <View>
            <IndexInputComponent
              title={'Số cũ'}
              styleInput={{color: '#FE7A37'}}
              editable={false}
              unit={`${item?.calculateUnit}`}
              value={`${formatNumber(
                `${item?.previousStageUsageNumber}`,
              )}`}
            />
            <TouchableOpacity
              onPress={() => {
                setSelectedPhoto(
                  item?.previousStageImage
                    ? item?.previousStageImage
                    : null,
                );
                setModalShowImage(true);
              }}
              style={styles.buttonImage}>
              <Image
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={
                  item?.previousStageImage
                    ? {
                        uri: item?.previousStageImage?.fileUrl,
                      }
                    : images.im_frame1
                }
              />
            </TouchableOpacity>
          </View>

          <View>
            <IndexInputComponent
              title={'Số mới'}
              unit={`${item?.calculateUnit}`}
              placeholder={'Nhập số'}
              editable={false}
              styleInput={{
                color: colors.mainColor,
                borderBottomWidth: 1,
              }}
              value={
                item?.thisStageUsageNumber == 0
                  ? ''
                  : `${formatNumber(
                      `${item?.thisStageUsageNumber}`,
                    )}`
              }
              onChangeText={(text: any) => {
                let newValue = {
                  ...item,
                  thisStageUsageNumber: text,
                };
                let newData = [...progressiveServiceClosings];
                newData[index] = newValue;
                setProgressiveServiceClosings(newData);
              }}
            />
            {item?.image ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedPhoto(
                    item?.image ? item?.image : null,
                  );
                  setModalShowImage(true);
                }}
                style={styles.buttonImage}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{
                    uri: item?.image?.fileUrl
                      ? item?.image?.fileUrl
                      : item?.image?.uri,
                  }}
                />
                
              </TouchableOpacity>
            ) : (
              <ButtonComponent
                styleButton={[
                  styles.buttonImage,
                  styles.buttonPicture,
                ]}
                label={'Thêm ảnh'}
                styleLabel={{color: colors.mainColor}}
                icon={icons.ic_plus}
                styleIcon={styles.addImageIcon}
                onPress={() => {
                  setIndexValue(index);
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  const renderProgressive = (item:any,index:number)=>{
    return (
      <View>
        <IndexInputComponent
          title={`Chỉ số ${item?.serviceName}`}
          styleInput={{color: '#FE7A37'}}
          editable={false}
          unit={`${item?.calculateUnit}`}
          value={
            `${parseInt(`${item?.thisStageUsageNumber}`)}` -
              `${parseInt(`${item?.previousStageUsageNumber}`)}` >
            0
              ? formatNumber(
                  `${
                    `${parseInt(
                      `${item?.thisStageUsageNumber}`,
                    )}` -
                    `${parseInt(
                      `${item?.previousStageUsageNumber}`,
                    )}`
                  }`,
                )
              : `${formatNumber(`${0}`)}`
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && <LoadingComponent />}
      {modalShowImage && (
        <ModalshowImage
          modalVisible={modalShowImage}
          onRequestClose={() => setModalShowImage(false)}
          pressClose={() => setModalShowImage(false)}
          data={selectedPhoto}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        label={'Dịch vụ đã chốt'}
      />

      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={styles.scrollView}>
        <View style={[styles.viewInfor, styles.shadow]}>
          <Text style={styles.textTitle}>{'Chủ hợp đồng'}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.labelBold}>{'Họ tên : '}</Text>
            <Text style={styles.labelNomal}>
              {confirmInvoice?.closingOwner?.fullName}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.labelBold}>{'SĐT : '}</Text>
            <Text style={styles.labelNomal}>
              {confirmInvoice?.closingOwner?.phoneNumber}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.labelBold}>{'Email : '}</Text>
            <Text style={styles.labelNomal}>
              {confirmInvoice?.closingOwner?.email}
            </Text>
          </View>
          {BreakLine()}
          <Text style={styles.textTitle}>{'Người thuê'}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.labelBold}>{'Họ tên : '}</Text>
            <Text style={styles.labelNomal}>
              {confirmInvoice?.closingTenant?.fullName}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.labelBold}>{'SĐT : '}</Text>
            <Text style={styles.labelNomal}>
              {confirmInvoice?.closingTenant?.phoneNumber}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.labelBold}>{'Email : '}</Text>
            <Text style={styles.labelNomal}>
              {confirmInvoice?.closingTenant?.email}
            </Text>
          </View>
          {StraightLine()}
          <Text style={styles.textTitle}>{'Thông tin phòng'}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.labelBold}>{'Địa chỉ\ntòa nhà : '}</Text>
            <Text style={styles.labelNomal}>
              {confirmInvoice?.contract?.unit?.house?.fullAddress}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.labelBold}>{'Tên phòng : '}</Text>
            <Text style={styles.labelNomal}>
              {confirmInvoice?.contract?.unit?.name}
            </Text>
          </View>
        </View>

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {progressiveServiceClosings?.length > 0 && (
              <FlatList
                data={progressiveServiceClosings}
                keyExtractor={key => key?.id}
                renderItem={({item, index}) => renderItem(item,index)} 
              />
            )}
          </ScrollView>
        </View>

        <TextTitleComponent label={'Mức tiêu thụ tháng này'} />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {progressiveServiceClosings?.length > 0 && (
              <FlatList
                data={progressiveServiceClosings}
                keyExtractor={key => key?.id}
                numColumns={2}
                renderItem={({item, index}) => renderProgressive(item,index)}
              />
            )}
          </ScrollView>
        </View>

        <View style={{height: 56}} />
      </ScrollView>
      {confirmInvoice?.status != 2 && (
        <CustomTwoButtonBottom
          leftLabel={'Lưu lại'}
          rightLabel={'Chốt dịch vụ'}
          styleLabelLeft={styles.styleLabelLeft}
          styleButtonLeft={styles.styleButtonLeft}
          onPressLeft={() => saveInvoiceClosings()}
          onPressRight={() => goToConfirmInvoiceClosings()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  scrollView: {paddingHorizontal: 10, marginTop: 10},
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eachViewModal: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(1,1,1,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonImage: {
    height: widthView * 0.6,
    width: widthView,
    marginTop: 10,
  },
  buttonPicture: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addImageIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: colors.mainColor,
  },
  styleLabelLeft: {
    color: colors.backgroundOrange,
    fontSize: 15,
    fontWeight: '600',
  },
  styleButtonLeft: {
    borderColor: colors.backgroundOrange,
    backgroundColor: 'white',
    marginRight: 5,
  },
  shadow: {
    margin: 1,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textTitle: {
    fontSize: 17,
    color: colors.textTitle,
    fontWeight: '600',
  },
  viewInfor: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 4,
  },
  labelBold: {color: 'black', fontWeight: '600', fontSize: 11},
  labelNomal: {color: 'black', fontWeight: '300', fontSize: 11},
});
export default InvoiceClosing;

const ModalshowImage = (props: any) => {
  const {modalVisible, onRequestClose, data, pressClose} = props;
  return (
    <View style={{}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachViewModal}>
          <Image
            source={
              data?.uri
                ? {uri: data?.uri}
                : data?.fileUrl
                ? {uri: data?.fileUrl}
                : data
                ? data
                : null
            }
            style={{width: '100%', height: '90%'}}
            resizeMode={'contain'}
          />
          <ButtonComponent
            onPress={pressClose}
            icon={icons.ic_close}
            styleIcon={{width: 15, height: 15, tintColor: 'red'}}
            styleButton={styles.buttonClose}
          />
        </View>
      </Modal>
    </View>
  );
};
