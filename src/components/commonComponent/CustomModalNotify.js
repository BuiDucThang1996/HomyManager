import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants';
import ButtonComponent from './ButtonComponent';
const CustomModalNotify = props => {
  const {modalVisible, title, label, onRequestClose, pressConfirm} = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <View style={styles.modalView}>
            {title && <Text style={styles.title}>{`${title}`}</Text>}
            <View style={{flex: 1, padding: 10}}>
              {label && <Text style={styles.label}>{`${label}`}</Text>}
            </View>
            <View style={styles.viewBetween}>
              <ButtonComponent
                label={'Đóng'}
                styleLabel={styles.labelClose}
                onPress={onRequestClose}
              />
              <ButtonComponent
                label={'Xác nhận'}
                styleLabel={styles.labelConfirm}
                onPress={pressConfirm}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', position: 'absolute'},
  eachContainer: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  modalView: {
    minHeight: 200,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  title: {fontSize: 17, color: colors.backgroundButton, fontWeight: 'bold'},
  label: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    marginTop: 10,
  },
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  labelClose: {color: 'red', fontSize: 15, fontWeight: '600'},
  labelConfirm: {color: colors.mainColor, fontSize: 15, fontWeight: '600'},
});
export default CustomModalNotify;
