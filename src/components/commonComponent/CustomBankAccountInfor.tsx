import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, icons, images} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
const CustomBankAccountInfor = (props:any) => {
  const {
    imageUrl,
    userName,
    accountNo,
    viewCustom,
    isSelect,
    isCheck,
    onPress,
    pressDetail,
    disabledDetail,
  } = props;
  return (
    <View style={[styles.container, styles.shadowView, viewCustom]}>
      <TouchableOpacity
        disabled={disabledDetail}
        onPress={pressDetail}
        style={[styles.viewRow, {flex: 1}]}>
        <Image
          source={typeof imageUrl == 'string' ? {uri: imageUrl} : images.im_frame1}
          style={styles.image}
          resizeMode={'contain'}
        />
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={styles.userName}>
            {userName}
          </Text>
          <Text numberOfLines={1} style={styles.accountNo}>
            {accountNo}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        {isSelect && (
          <View >
            {isCheck ? (
              <ButtonComponent
                icon={icons.ic_check}
                styleIcon={styles.styleIcon}
                onPress={onPress}
              />
            ) : (
              <ButtonComponent
                icon={icons.ic_unCheck}
                styleIcon={styles.styleIcon}
                onPress={onPress}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};
const widthView = Dimensions.get('window').width - 22;
const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: widthView,
  },
  image: {
    height: 32,
    width: 80,
    marginRight: 10,
    borderRadius: 5,
  },
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
  userName: {color: '#374047', fontWeight: '600', fontSize: 15},
  accountNo: {color: '#5F6E78', fontSize: 13},
  styleIcon: {width: 20, height: 20, tintColor: colors.mainColor},
  viewRow: {flexDirection: 'row', alignItems: 'center'},
});
export default CustomBankAccountInfor;
