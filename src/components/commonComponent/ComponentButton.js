import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {icons} from '../../constants';

const ComponentButton = props => {
  const {
    type,
    title,
    important,
    viewComponent,
    onPress,
    styleButton,
    value,
    placeholder,
    icon,
  } = props;
  return (
    <View style={viewComponent}>
      <View
        style={{flexDirection: 'row', marginBottom: 3, alignItems: 'center'}}>
        <Text style={styles.label}>{title}</Text>
        {important && <Text style={{color: 'red'}}> *</Text>}
      </View>
      {type == 'buttonSelect' && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.viewButton, styleButton]}>
          <Text style={{color: value ? 'black' : 'grey', flex: 1}}>
            {value ? value : placeholder}
          </Text>
          <Image
            source={icons.ic_down}
            resizeMode={'contain'}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      {type == 'buttonValue' && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.viewButton, styleButton]}>
          <Text>{placeholder}</Text>
          <View style={styles.viewRow}>
            <View style={styles.backgroundValue}>
              <Text style={{fontSize: 13, color: '#374047'}}>{value}</Text>
            </View>
            <Image
              source={icon}
              style={{width: 20, height: 20, marginLeft: 10}}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {fontSize: 15, color: '#374047'},
  viewButton: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ACB4B9',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {width: 20, height: 20},
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  backgroundValue: {
    backgroundColor: '#ebedee',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
});
export default ComponentButton;
