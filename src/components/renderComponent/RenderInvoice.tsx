import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
import SuggestComponent from '../commonComponent/SuggestComponent';

const breakLine = Array(19).fill('');

const RenderInvoice = (props: any) => {
  const {totalFee, name, houseName, unitName, status, onPress} = props;
  return (
    <View style={styles.viewAroundBill}>
      <View style={[styles.viewBill, {height: 64}]}>
        <View style={styles.viewRowBetween}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.textTotalFee}>{totalFee}</Text>
              <Text style={{fontSize: 13, color: '#374047'}}>{' VNĐ'}</Text>
            </View>
            <SuggestComponent label={name} />
          </View>
          <ButtonComponent
            label={'Xem'}
            styleLabel={styles.labelShow}
            styleButton={styles.buttonShow}
            onPress={onPress}
          />
        </View>
      </View>
      <View style={styles.viewLine}>
        {breakLine.map((line, index) => {
          return <View key={`${index.toString()}`} style={styles.line} />;
        })}
      </View>
      <View style={[styles.viewBill, {height: 40}]}>
        <View style={styles.viewRowBetween}>
          <Text
            style={{
              color: '#374047',
            }}>{`${houseName} - ${unitName}`}</Text>
          <Text style={{color: colors.backgroundOrange}}>
            {status == 0
              ? 'Chưa chốt'
              : status == 1
              ? 'Chưa thanh toán'
              : status == 2
              ? 'Đã thanh toán'
              : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewAroundBill: {height: 106, marginBottom: 15},
  viewBill: {
    backgroundColor: 'white',
    margin: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 8,
    padding: 5,
  },
  viewRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonShow: {
    backgroundColor: colors.mainColor,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  labelShow: {color: 'white', fontWeight: '600'},
  viewLine: {
    height: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: 63.28,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 1,
    overflow: 'hidden',
  },
  line: {
    height: 0.5,
    width: 16,
    backgroundColor: colors.borderInput,
    marginLeft: 10,
  },
  textTotalFee: {
    fontWeight: '600',
    color: colors.mainColor,
    lineHeight: 20,
    fontSize: 15,
  },
});
export default RenderInvoice;
