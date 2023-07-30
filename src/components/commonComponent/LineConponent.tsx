import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const arrays = Array(20).fill('');

export const StraightLine = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#97A1A7',
        marginVertical: 15,
      }}
    />
  );
};

export const BreakLine = () => {
  return (
    <View style={styles.container}>
      {arrays.map((value, index) => {
        return <View key={index.toString()} style={styles.line} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 1.5,
    width: '100%',
    marginVertical: 15,
    flexDirection: 'row',
  },
  line: {height: 0.5, width: 10, marginRight: 10, backgroundColor: '#97A1A7'},
});
