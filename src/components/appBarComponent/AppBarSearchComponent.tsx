import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TextInputComponent from '../commonComponent/TextInputComponent';
import ButtonComponent from '../commonComponent/ButtonComponent';
import {icons, colors} from '../../constants';

const CustomSearchAppBar = (props: any) => {
  const {
    iconLeft,
    label,
    iconRight,
    iconSecondRight,
    pressIconLeft,
    pressIconRight,
    pressSeccodIconRight,
    keyboard,
    textSearch,
    value,
    placeholder,
    onChangeText,
    onPress,
    iconRightTextInput,
  } = props;

  return (
    <View
      style={{
        height: 134,
        backgroundColor: colors.mainColor,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingHorizontal: 10,
      }}>
      <View style={styles.styleAppBar}>
        {iconLeft && (
          <ButtonComponent
            icon={iconLeft}
            styleIcon={styles.icon}
            onPress={pressIconLeft}
          />
        )}
        {label && <Text style={styles.label}>{label}</Text>}
        {iconRight && (
          <ButtonComponent
            styleButton={{marginHorizontal: 15}}
            icon={iconRight}
            styleIcon={styles.icon}
            onPress={pressIconRight}
          />
        )}
        {typeof iconSecondRight == 'string' ? (
          <ButtonComponent
            icon={{uri: iconSecondRight}}
            styleIcon={{width: 30, height: 30, borderRadius: 30}}
            onPress={pressSeccodIconRight}
          />
        ) : iconSecondRight == null || iconSecondRight == undefined ? (
          <ButtonComponent
            icon={icons.ic_user}
            styleIcon={{width: 24, height: 24}}
            onPress={pressSeccodIconRight}
          />
        ) : null}
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.viewSearch}>
          <TextInputComponent
            styleViewTextInput={styles.viewInput}
            placeholder={placeholder}
            iconLeft={
              textSearch == '' && keyboard == false ? icons.ic_search : null
            }
            styleIconLeft={styles.styleIconLeft}
            value={value}
            onChangeText={onChangeText}
          />
          {iconRightTextInput && (
            <ButtonComponent
              styleButton={styles.styleButton}
              styleIcon={styles.styleIcon}
              icon={iconRightTextInput}
              onPress={onPress}
            />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  styleAppBar: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 24, height: 24},
  label: {
    color: 'white',
    marginLeft: 8,
    flex: 1,
    fontSize: 17,
  },
  viewContainer: {
    height: 76,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  viewSearch: {
    height: 64,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: 'white',
    alignItems: 'center',
  },
  viewInput: {
    backgroundColor: 'white',
    height: 48,
    flex: 1,
    borderRadius: 10,
    width: 298,
  },
  styleButton: {
    height: 48,
    width: 48,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  styleIcon: {height: 40, width: 40, tintColor: 'white'},
  styleIconLeft: {
    width: 25,
    height: 25,
    tintColor: colors.mainColor,
    marginLeft: 10,
  },
});
export default CustomSearchAppBar;
