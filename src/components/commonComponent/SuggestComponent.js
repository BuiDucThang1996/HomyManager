import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CustomSuggest = props => {
  const {label, labelStyle} = props;
  return <Text style={[styles.label, labelStyle]}>{label}</Text>;
};
const styles = StyleSheet.create({
  label: {fontSize: 12, color: '#7F8A93'},
});
export default CustomSuggest;
