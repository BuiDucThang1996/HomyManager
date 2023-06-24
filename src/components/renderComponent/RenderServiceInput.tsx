import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {formatNumber} from '../../utils/common';
const widthView = Dimensions.get('window').width - 20;
const RenderServiceInput = (props: any) => {
  const {
    viewComponent,
    name,
    fee,
    calculateUnit,
    placeholder,
    value,
    onChangeText,
    isProgressive,
  } = props;
  return (
    <View style={viewComponent}>
      <View style={styles.viewBetween}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{`Đơn giá: ${formatNumber(
          `${fee}`,
        )}/ ${calculateUnit}`}</Text>
      </View>
      <View style={[styles.viewRow, styles.viewInput]}>
        <TextInput
          keyboardType="number-pad"
          style={{flex: 1}}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        {isProgressive && (
          <View style={styles.viewUnit}>
            <Text style={styles.textUnit}>{'Lũy tiến'}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthView,
  },
  title: {fontSize: 13, color: '#374047'},
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  viewInput: {
    height: 50,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ACB4B9',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  viewUnit: {
    height: 32,
    paddingHorizontal: 5,
    backgroundColor: '#CFD3D6',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUnit: {borderRadius: 5, color: '#374047', fontSize: 13},
});
export default RenderServiceInput;
