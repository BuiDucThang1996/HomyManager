import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {colors, icons} from '../../constants';

const CustomTimeButtons = (props:any) => {
  const {
    styleContainer,
    styleButtonLeft,
    styleButtonRight,
    title,
    leftLabel,
    rightLabel,
    valueLeft,
    valueRight,
    onPressLeft,
    onPressRightt,
    iconLeft,
    iconRight,
    important,
  } = props;
  return (
    <View style={styleContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.label}>{title}</Text>
        {important && <Text style={{color: 'red', fontSize: 14}}> *</Text>}
      </View>
      <View style={[styles.viewRow, {marginTop: 5}]}>
        {leftLabel && (
          <TouchableOpacity
            style={[styles.viewButton, styleButtonLeft]}
            onPress={onPressLeft}>
            <Text style={styles.placeholder}>{leftLabel}</Text>
            <View style={styles.backgroundValue}>
              <Text style={styles.time}>{`${valueLeft}`}</Text>
            </View>
            {iconLeft && (
              <Image
                source={iconLeft}
                style={{width: 20, height: 20, tintColor: '#374047'}}
              />
            )}
          </TouchableOpacity>
        )}
        {rightLabel && (
          <TouchableOpacity
            style={[styles.viewButton, styleButtonRight]}
            onPress={onPressRightt}>
            <Text style={styles.placeholder}>{rightLabel}</Text>
            <View style={styles.backgroundValue}>
              <Text style={styles.time}>{`${valueRight}`}</Text>
            </View>
            {iconRight && (
              <Image
                source={iconRight}
                style={{width: 20, height: 20, tintColor: '#374047'}}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {fontSize: 14, color: '#374047'},
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: colors.borderInput,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  time: {
    borderRadius: 5,
    color: '#374047',
    fontSize: 14,
    marginHorizontal: 5,
  },
  backgroundValue: {
    backgroundColor: '#ebedee',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderRadius: 4,
  },
  placeholder: {color: '#5F6E78'},
});
export default CustomTimeButtons;
