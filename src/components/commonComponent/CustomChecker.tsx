import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';

const CustomChecker = (props: any) => {
  const widthImage = Dimensions.get('window').width / 2 - 15;
  const {icon, label, value, isCheck, onPress} = props;

  return (
    <View style={[styles.container, {width: widthImage}]}>
      {icon && (
        <Image style={[styles.icon]} resizeMode={'contain'} source={icon} />
      )}
      <View style={{marginLeft: 5, flex: 1}}>
        {label && <Text style={[styles.text, {color: 'black'}]}>{label}</Text>}
        {value && (
          <Text style={[styles.text, {color: colors.mainColor}]}>{value}</Text>
        )}
      </View>
      <View style={styles.styleButton}>
        {isCheck ? (
          <ButtonComponent
            icon={icons.ic_check}
            styleIcon={styles.styleIcon}
            onPress={onPress}
            styleButton={styles.styleButton}
          />
        ) : (
          <ButtonComponent
            icon={icons.ic_unCheck}
            styleIcon={styles.styleIcon}
            onPress={onPress}
            styleButton={styles.styleButton}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    backgroundColor: '#f8f9f9',
    zIndex: 1,
    padding: 2,
    borderRadius: 4,
    paddingHorizontal: 8,
    margin: 2.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  icon: {width: 20, height: 20},
  styleIcon: {width: 18, height: 18, tintColor: colors.mainColor},
  styleButton: {
    alignSelf: 'center',
    width: 30,
    minHeight: 50,
  },
  text: {fontSize: 12},
});
export default CustomChecker;
