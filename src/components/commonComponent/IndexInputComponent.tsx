import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
const widthView = Dimensions.get('window').width / 2 - 15;
const IndexInputComponent = (props: any) => {
  const {
    viewComponent,
    title,
    styleInput,
    value,
    placeholder,
    editable,
    onChangeText,
    unit,
  } = props;
  return (
    <View style={[viewComponent]}>
      <View style={[styles.container, styles.viewShadow]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.viewRow}>
          <TextInput
            style={[styleInput, styles.input]}
            keyboardType="number-pad"
            editable={editable}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
          />
          <Text style={styles.label}>{unit}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: widthView,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 4,
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  title: {color: '#374047', fontSize: 13, fontWeight: '600'},
  label: {color: '#5F6E78', fontSize: 12, marginLeft: 10},
  input: {
    flex: 1,
    borderBottomColor: '#ACB4B9',
    fontWeight: '600',
    fontSize: 15,
  },
  viewShadow: {
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
});
export default IndexInputComponent;
