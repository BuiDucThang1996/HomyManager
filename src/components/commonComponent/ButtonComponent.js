import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
const ButtonComponent = props => {
  const {
    styleButton,
    icon,
    styleIcon,
    label,
    styleLabel,
    onPress,
    disabled,
    svgIcon,
    widthSvg,
    heightSvg,
    iconRigght,
    styleIconRight,
  } = props;
  const IconItem = svgIcon;
  return (
    <TouchableOpacity
      hitSlop={{bottom: 5, left: 5, right: 5, top: 5}}
      disabled={disabled}
      style={[styleButton, styles.button]}
      onPress={onPress}>
      {svgIcon && <IconItem width={widthSvg} height={heightSvg} />}
      {icon && (
        <Image
          source={typeof icon == 'string' ? {uri: `${icon}`} : icon}
          style={styleIcon}
          resizeMode={'contain'}
        />
      )}
      {label && <Text style={styleLabel}>{label}</Text>}
      {iconRigght && (
        <Image
          source={typeof icon == 'string' ? {uri: icon} : iconRigght}
          style={styleIconRight}
          resizeMode={'contain'}
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {justifyContent: 'center', alignItems: 'center'},
});
export default ButtonComponent;
