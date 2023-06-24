import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {colors} from '../../constants';

const CustomModalCamera = props => {
  const {onRequestClose, modalVisible, openCamera, openGallery, cancel} = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <View style={styles.eachContainer}>
            <TouchableOpacity
              onPress={openCamera}
              style={styles.buttonTakePicture}>
              <Text style={styles.title}>Chụp ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openGallery}
              style={styles.buttonUploadImage}>
              <Text style={styles.title}>Tải ảnh lên</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancel} style={styles.buttonCancel}>
              <Text style={styles.title}>Hủy bỏ</Text>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(1,1,1,0.5)',
    zIndex: 9999,
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTakePicture: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 110,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBotomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    zIndex: 2,
  },
  buttonUploadImage: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    zIndex: 2,
  },
  buttonCancel: {
    height: 45,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    zIndex: 2,
    marginBottom: 5,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: colors.mainColor},
});
export default CustomModalCamera;
