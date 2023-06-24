import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';

const AppBarComponent = props => {
  const {
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
      {iconLeft && (
        <ButtonComponent
          styleButton={styles.styleButton}
          icon={iconLeft}
          styleIcon={styles.icon}
          onPress={pressIconLeft}
        />
      )}
      {label && <Text style={styles.label}>{label}</Text>}
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
          styleButton={styles.styleButton}
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
  icon: {width: 24, height: 24},
  label: {
    color: 'white',
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  styleButton: {width: 25, height: 56},
});
export default AppBarComponent;
