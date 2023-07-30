import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

const ComponentInput = (props: any) => {
  const {
    type,
    title,
    unit,
    placeholder,
    keyboardType,
    important,
    viewComponent,
    value,
    onChangeText,
    styleInput,
    styleButton,
  } = props;
  return (
    <View style={viewComponent}>
      <View
        style={{flexDirection: 'row', marginBottom: 3, alignItems: 'center'}}>
        <Text style={styles.label}>{title}</Text>
        {important && <Text style={{color: 'red'}}> *</Text>}
      </View>
      {type == 'input' && (
        <View style={[styles.viewButton, styleInput]}>
          <TextInput
            style={{flex: 1}}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      )}
      {type == 'inputUnit' && (
        <View style={[styles.viewButton, styleButton]}>
          <TextInput
            style={{flex: 1}}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={'grey'}
            value={value}
            onChangeText={onChangeText}
          />
          {unit && (
            <View style={styles.viewUnit}>
              <Text style={styles.textUnit}>{unit}</Text>
            </View>
          )}
        </View>
      )}
      {type == 'inputNote' && (
        <View style={styles.viewInput}>
          <TextInput
            style={{flex:1, textAlignVertical: 'top'}}
            multiline={true}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={'grey'}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {fontSize: 15, color: '#374047'},
  viewButton: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ACB4B9',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  viewUnit: {
    height: 32,
    paddingHorizontal: 5,
    backgroundColor: '#EBEDEE',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUnit: {borderRadius: 5, color: '#374047', fontSize: 13},
  viewInput: {
    backgroundColor: 'white',
    height: 120,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ACB4B9',
  },
});
export default ComponentInput;
