import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const BoxShowInfor = (props: any) => {
  const {label, content, unit, styleBox} = props;
  return (
    <View style={[styles.container, styles.shadowView, styleBox]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.viewBetween}>
        {content && (
          <Text numberOfLines={1} style={styles.content}>
            {content}
          </Text>
        )}
        {unit && (
          <Text numberOfLines={1} style={styles.label}>
            {unit}
          </Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 1,
  },
  label: {fontSize: 12, color: 'rgba(151, 161, 167, 1)'},
  content: {color: 'rgba(55, 64, 71, 1)', fontWeight: '600'},
  viewBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default BoxShowInfor;
