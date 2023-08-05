import React from 'react';
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

const RenderAmenity = (props: any) => {
  const widthImage = Dimensions.get('window').width / 2 - 20;
  const {label, isDelete, deleteAmenity, onPress, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, {width: widthImage}]}>
      <View style={[{flexDirection: 'row'}, styles.viewCenter]}>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={[styles.text]}>
            {label}
          </Text>
        </View>
        {isDelete && (
          <ButtonComponent
            styleIcon={styles.iconDelete}
            icon={icons.ic_close}
            onPress={deleteAmenity}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
  },
  styleIcon: {width: 12, height: 12, tintColor: 'white', marginLeft: 3},
  text: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.mainColor,
    textAlign: 'center',
    alignSelf: 'center',
  },
  iconDelete: {
    width: 15,
    height: 15,
    tintColor: '#FF1E1E',
    marginHorizontal: 5,
  },
  viewCenter: {justifyContent: 'center', alignItems: 'center', flex: 1},
});
export default RenderAmenity;
