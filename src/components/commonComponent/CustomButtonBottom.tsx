import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from './ButtonComponent';

const ButtonComponentBottom = (props: any) => {
  const {label, onPress, styleButton, isAddNew} = props;
  return (
    <View style={[styles.viewContainer]}>
      <ButtonComponent
        styleButton={[styles.button, styleButton]}
        icon={!isAddNew ? icons.ic_plus : null}
        styleIcon={{width: 24, height: 24, tintColor: 'white', marginRight: 5}}
        label={label}
        styleLabel={styles.label}
        onPress={onPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    height: 56,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
  },
  button: {
    height: 44,
    backgroundColor: colors.mainColor,
    flexDirection: 'row',
    width: 358,
    borderRadius: 4,
  },
  label: {color: 'white', fontSize: 15},
});
export default ButtonComponentBottom;
