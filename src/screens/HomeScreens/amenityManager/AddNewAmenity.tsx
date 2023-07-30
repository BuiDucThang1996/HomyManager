import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import CustomTwoButtonBottom from '../../../components/commonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../constants';
import TextTitleComponent from '../../../components/commonComponent/TextTitleComponent';
import {CreateNewAmenityApi} from '../../../apis/homeApi/amenityApi';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../store/slices/tokenSlice';
import LoadingComponent from '../../../components/commonComponent/LoadingComponent';
import CustomModalNotify from '../../../components/commonComponent/CustomModalNotify';
import SuggestComponent from '../../../components/commonComponent/SuggestComponent';
import ComponentInput from '../../../components/commonComponent/ComponentInput';
import {updateReloadStatus} from '../../../store/slices/reloadSlice';

const AddNewAmenity = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [loadingAddAmenity, setLoadingAddAmenity] = useState(false);
  const [modalAddAmenity, setModalAddAmenity] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createNewAmenity = async () => {
    setModalAddAmenity(false);
    setLoadingAddAmenity(true);
    let data = {name: name, description: description};
    await CreateNewAmenityApi(tokenStore, data)
      .then((res: any) => {
        if (res?.status == 200) {
          setLoadingAddAmenity(false);
          dispatch(updateReloadStatus('addAmenitySuccess'));
          navigation.goBack();
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loadingAddAmenity && <LoadingComponent />}
      {modalAddAmenity && (
        <CustomModalNotify
          title={'Tạo mới tiện ích'}
          label={'Bạn có muốn thêm mới tiện ích này ?'}
          modalVisible={modalAddAmenity}
          onRequestClose={() => setModalAddAmenity(false)}
          pressConfirm={() => createNewAmenity()}
        />
      )}
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Thêm tiện ích'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={[styles.eachContainer]}>
        <SuggestComponent
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />

        <TextTitleComponent label={'Thông tin tiện ích'} />

        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên tiện ích'}
          placeholder={'Nhập tên tiện ích'}
          value={name}
          onChangeText={(text: any) => setName(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Mô tả tiện ích'}
          placeholder={'Nhập mô tả tiện ích'}
          value={description}
          onChangeText={(text: any) => setDescription(text)}
        />

        <View style={{marginBottom: 56}} />
      </ScrollView>

      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hủy'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => {
          dispatch(updateReloadStatus(false));
          navigation.goBack();
        }}
        onPressRight={() => setModalAddAmenity(true)}
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
  styleButtonLeft: {
    borderColor: '#FE7A37',
    backgroundColor: 'white',
    marginRight: 5,
  },
  styleLabelLeft: {color: '#FE7A37', fontSize: 15, fontWeight: '600'},
});
export default AddNewAmenity;
