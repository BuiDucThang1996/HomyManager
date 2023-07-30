import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../constants';
const CustomPickerDay = (props: any) => {
  const {modalVisible, onRequestClose, data, onPress} = props;

  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={styles.buttonRender}
        onPress={() => onPress(item)}>
        <Text style={styles.textKey}>{item.key}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <View style={styles.viewRender}>
            <FlatList
              data={data}
              keyExtractor={key => key?.key}
              renderItem={({item, index}) => renderItem(item, index)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',

    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(1,1,1,0.5)',
  },
  viewRender: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    maxHeight: 350,
    width: '90%',
    borderRadius: 8,
  },
  textKey: {fontSize: 16, color: 'black', fontWeight: '600'},
  buttonRender: {
    borderBottomWidth: 0.5,
    marginVertical: 10,
    borderBottomColor: colors.borderInput,
  },
});
export default CustomPickerDay;
