import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {formatNumber} from '../../utils/common';

const widthView = Dimensions.get('window').width - 40;

const CustomViewServiceFee = (props:any) => {
  const {chargeServiceName, usageAmount, totalPrice} = props;
  return (
    <View style={[styles.viewBetween, {width: widthView}]}>
      <View style={{width: '33%'}}>
        <Text numberOfLines={1} style={styles.label}>
          {chargeServiceName}
        </Text>
      </View>
      <View
        style={{
          width: '33%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{color:'grey'}}>{`SL: ${`${formatNumber(
          `${usageAmount}`,
        )}`}`}</Text>
      </View>
      <View style={[{alignItems: 'flex-end', width: '33%'}]}>
        <Text numberOfLines={1} style={styles.label}>
          {`${formatNumber(`${totalPrice}`)}`}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {color: '#374047', fontSize: 15, fontWeight: '600'},
});
export default CustomViewServiceFee;
