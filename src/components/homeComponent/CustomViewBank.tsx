import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {icons} from '../../constants';
const CustomViewBank = (props: any) => {
  const {
    styleViewInput,
    title,
    important,
    onPress,
    styleButton,
    value,
    placeholder,
    bank,
  } = props;
  return (
    <View style={styleViewInput}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
        <Text style={styles.label}>{title}</Text>
        {important && <Text style={{color: 'red', fontSize: 14}}> *</Text>}
      </View>

      {bank ? (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.viewBank, styleButton]}>
          <Image
            source={typeof bank?.logo == 'string' ? {uri: bank?.logo} : null}
            style={{width: 80, height: 32}}
          />
          <View style={{flex: 1}}>
            <Text numberOfLines={1}>{bank?.name}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.viewButton, {paddingHorizontal: 10}, styleButton]}>
          <Text style={{color: value ? 'black' : 'grey'}}>
            {value ? value : placeholder}
          </Text>
          <Image
            source={icons.ic_down}
            resizeMode={'contain'}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {fontSize: 15, color: '#374047'},
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    // borderColor: '#ACB4B9',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderColor: '#dadee0',
    width: '100%',
  },
  icon: {width: 20, height: 20},
  viewBank: {
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    // borderColor: '#ACB4B9',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderColor: '#dadee0',
    flexDirection: 'row',
    width: '100%',
  },
});
export default CustomViewBank;
