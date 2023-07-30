import React from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
import ButtonComponent from './ButtonComponent';
import { colors } from '../../constants';
const TextInputComponent = (props:any) => {
  const {
    styleViewTextInput,
    styleTextinput,
    placeholder,
    value,
    secureTextEntry,
    onChangeText,
    numberOfLines,
    keyboardType,
    iconRight,
    styleIconRight,
    onPressIconRight,
    iconLeft,
    styleIconLeft,
    onPressIconLeft,
    defaultValue,
    onEndEditing,
  } = props;
  return (
    <View style={[styleViewTextInput, styles.viewInput]}>
      {iconLeft && (
        <ButtonComponent
          icon={iconLeft}
          styleIcon={styleIconLeft}
          onPress={onPressIconLeft}
        />
      )}
      <TextInput
        numberOfLines={numberOfLines ? numberOfLines : 1}
        secureTextEntry={secureTextEntry}
        style={[{flex: 1, color: 'black'}, styleTextinput]}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        defaultValue={defaultValue}
        onEndEditing={onEndEditing}
      />
      {iconRight && (
        <ButtonComponent
          icon={iconRight}
          styleIcon={styleIconRight}
          onPress={onPressIconRight}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  viewInput: {flexDirection: 'row', alignItems: 'center'},
});
export default TextInputComponent;
