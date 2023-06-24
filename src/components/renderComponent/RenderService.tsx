import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {icons} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
import {formatNumber} from '../../utils/common';

const RenderService = (props:any) => {
  const {
    viewStyle,
    calculateUnit,
    name,
    fee,
    onPress,
    isDelete,
    deleteService,
    disabled,
  } = props;
  const widthWindow = Dimensions.get('window').width / 2 - 20;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.viewContainer, viewStyle, {width: widthWindow}]}>
      <View style={{flex: 1}}>
        {name && (
          <Text
            numberOfLines={1}
            style={{fontSize: 13, fontWeight: '600', color: '#374047'}}>
            {`${name}`}
          </Text>
        )}
        {fee && (
          <Text
            numberOfLines={1}
            style={{
              fontSize: 11,
              color: '#0191FF',
            }}>{`${formatNumber(`${fee}`)} VNĐ/${calculateUnit}`}</Text>
        )}
      </View>
      {isDelete && (
        <ButtonComponent
          styleIcon={styles.iconService}
          icon={icons.ic_close}
          onPress={deleteService}
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  iconService: {
    width: 15,
    height: 15,
    tintColor: '#FF1E1E',
    marginHorizontal: 5,
  },
});
export default RenderService;
