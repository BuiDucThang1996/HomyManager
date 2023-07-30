import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ButtonComponent from '../commonComponent/ButtonComponent';
import {icons, colors} from '../../constants';

const CustomStepAppBar = (props: any) => {
  const {
    iconLeft,
    label,
    iconRight,
    iconSecondRight,
    pressIconLeft,
    pressIconRight,
    pressSeccodIconRight,
    step,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.styleAppBar}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', flex: 1}}
          onPress={pressIconLeft}>
          {iconLeft && (
            <ButtonComponent
              styleButton={styles.styleButtonTop}
              icon={iconLeft}
              styleIcon={styles.icon}
              disabled={true}
            />
          )}
          {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>

        {iconRight && (
          <ButtonComponent
            styleButton={[styles.styleButtonTop, {marginHorizontal: 10}]}
            icon={iconRight}
            styleIcon={styles.icon}
            onPress={pressIconRight}
          />
        )}
        {iconSecondRight && (
          <ButtonComponent
            styleButton={styles.styleButtonTop}
            icon={iconSecondRight}
            styleIcon={styles.icon}
            onPress={pressSeccodIconRight}
          />
        )}
      </View>
      <View style={styles.line} />

      <View style={styles.viewContainer}>
        <View style={styles.viewStep}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={[styles.step, {backgroundColor: 'orange'}]} />
            <View style={{height: 1, backgroundColor: 'white', flex: 1}} />
            <View
              style={[
                styles.step,
                {backgroundColor: step >= 2 ? 'orange' : colors.mainColor},
              ]}
            />
            <View style={{height: 1, backgroundColor: 'white', flex: 1}} />
            <View
              style={[
                styles.step,
                {backgroundColor: step >= 3 ? 'orange' : colors.mainColor},
              ]}
            />
          </View>
          <View style={styles.viewRow}>
            <Text style={[styles.title, {position: 'absolute', left: 0}]}>
              Thông tin
            </Text>
            <Text style={styles.title}>Tiền nhà</Text>
            <Text style={[styles.title, {position: 'absolute', right: 0}]}>
              Dịch vụ
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 134,
    backgroundColor: colors.mainColor,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 10,
  },
  styleAppBar: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 24, height: 24, tintColor: 'white'},
  label: {
    color: 'white',
    marginLeft: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
  styleButtonTop: {width: 25, height: 56},
  viewSearch: {
    height: 64,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  line: {height: 0.5, width: '100%', backgroundColor: 'white'},
  viewContainer: {
    backgroundColor: colors.mainColor,
    height: 64,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  viewStep: {
    height: 64,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    width: '100%',
    justifyContent: 'center',
  },
  step: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  title: {color: 'white', fontSize: 13, alignSelf: 'center'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 3,
  },
});
export default CustomStepAppBar;
