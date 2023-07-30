import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {icons, colors} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
const RenderContract = (props:any) => {
  const {
    status,
    description,
    startDate,
    endDate,
    houseName,
    unitName,
    contractOwner,
    onPress,
    pressEdit,
    pressLiquidation,
    pressDelete,
  } = props;
  return (
    <View style={styles.viewContract}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
          <Text style={{fontWeight: '600', color: '#5F6E78'}}>
            {description}
          </Text>
          <ButtonComponent
            disabled={true}
            styleButton={styles.buttonActive}
            label={'Hoạt động'}
            styleLabel={{fontSize: 11, color: 'white'}}
          />
        </View>
        <View style={[styles.viewRow]}>
          <Image source={icons.ic_calendar} style={styles.icon} />
          <Text style={styles.content}>{`Từ ${startDate} đến ${endDate}`}</Text>
        </View>
        <View style={[styles.viewRow]}>
          <Image source={icons.ic_homeTabBar} style={styles.icon} />
          <Text
            numberOfLines={1}
            style={styles.content}>{`${houseName} - ${unitName}`}</Text>
        </View>
        <View style={[styles.viewRow]}>
          <Text style={styles.content}>{'Người tạo: '}</Text>
          <Text style={styles.label}>{`${contractOwner}`}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={[
          styles.viewRow,
          {justifyContent: 'space-between', marginTop: 3},
        ]}>
        <ButtonComponent
          styleButton={[
            styles.buttonRender,
            {borderColor: colors.backgroundOrange},
          ]}
          label={'Chỉnh sửa'}
          styleLabel={{fontWeight: '600', color: colors.backgroundOrange}}
          onPress={pressEdit}
        />
        {/* <ButtonComponent
          styleButton={[styles.buttonRender, {borderColor: colors.mainColor}]}
          label={'Thanh lý'}
          styleLabel={{fontWeight: '600', color: colors.mainColor}}
          onPress={pressLiquidation}
        /> */}
        <ButtonComponent
          styleButton={[styles.buttonRender, {borderColor: 'red'}]}
          label={'Xóa'}
          styleLabel={{fontWeight: '600', color: 'red'}}
          onPress={pressDelete}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewContract: {
    height: 176,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    margin: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  buttonActive: {
    backgroundColor: '#55CCEF',
    width: 100,
    height: 30,
    borderRadius: 4,
  },
  content: {fontSize: 13, color: '#374047'},
  label: {fontSize: 15, color: '#374047', fontWeight: '600'},
  icon: {height: 20, width: 20, marginRight: 5},
  buttonRender: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    height: 35,
    width: 110,
  },
});
export default RenderContract;
