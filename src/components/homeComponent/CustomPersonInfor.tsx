import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
const widthView = Dimensions.get('window').width - 22;
const CustomPersonInfor = (props: any) => {
  const {
    styleView,
    avatar,
    userName,
    phoneNumber,
    isCheck,
    onPressCheck,
    pressAvatar,
    disabled,
  } = props;

  return (
    <View style={[styles.container, styleView]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isCheck != null && isCheck != undefined && (
          <ButtonComponent
            icon={isCheck ? icons.ic_check : icons.ic_unCheck}
            styleIcon={styles.iconCheck}
            onPress={onPressCheck}
          />
        )}
        <TouchableOpacity
          disabled={disabled}
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={pressAvatar}>
          <Image
            resizeMode="contain"
            style={styles.avatar}
            source={typeof avatar == 'string' ? {uri: avatar} : icons.ic_user}
          />
          <View
            style={{
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text numberOfLines={1} style={styles.userName}>
              {userName}
            </Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ButtonComponent
          icon={icons.ic_phone}
          styleIcon={styles.styleButtonRight}
          styleButton={styles.styleButton}
          onPress={() => {}}
        />
        <ButtonComponent
          icon={icons.ic_chatAppBar}
          styleIcon={styles.styleButtonRight}
          styleButton={styles.styleButton}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 62,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    width: widthView,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ebedee',
  },
  styleButton: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  userName: {fontSize: 14, fontWeight: 'bold', color: 'rgba(55, 64, 71, 1)'},
  phoneNumber: {fontSize: 12, color: 'rgba(85, 204, 239, 1)'},
  iconCheck: {
    width: 25,
    height: 25,
    marginRight: 8,
    tintColor: colors.mainColor,
  },
  styleButtonRight: {width: 30, height: 30, tintColor: colors.mainColor},
});
export default CustomPersonInfor;
