import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';

const AppBarComponent = (props: any) => {
  const {
    iconHome,
    iconLeft,
    label,
    iconRight,
    iconSecondRight,
    pressIconLeft,
    pressIconRight,
    pressSeccodIconRight,
  } = props;
  return (
    <View style={styles.styleAppBar}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
        onPress={pressIconLeft}>
        {iconLeft && (
          <ButtonComponent
            disabled={true}
            styleButton={styles.styleButton}
            icon={iconLeft}
            styleIcon={styles.icon}
          />
        )}
        {iconHome && (
          <ButtonComponent
            icon={iconHome}
            styleIcon={styles.iconHome}
            disabled={true}
          />
        )}
        {label && <Text style={styles.label}>{label}</Text>}
      </TouchableOpacity>
      {iconRight && (
        <ButtonComponent
          styleButton={styles.styleButton}
          icon={iconRight}
          styleIcon={styles.icon}
          onPress={pressIconRight}
        />
      )}
      {iconSecondRight && (
        <ButtonComponent
          styleButton={[styles.styleButton, {marginLeft: 15}]}
          icon={iconSecondRight}
          styleIcon={styles.icon}
          onPress={pressSeccodIconRight}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  styleAppBar: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    paddingHorizontal: 10,
  },
  icon: {width: 24, height: 24, tintColor: 'white'},
  label: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  styleButton: {width: 25, height: 56},
  iconHome: {width: 24, height: 24},
});
export default AppBarComponent;
