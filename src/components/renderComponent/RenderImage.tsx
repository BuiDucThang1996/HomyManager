import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
const RenderImage = (props:any) => {
  const {data, deleteItem, deleteButton} = props;
  const [showImage, setShowImage] = useState(false);
  // console.log(showImage);
  return (
    <View>
      {showImage && (
        <ModalShowImage
          modalVisible={showImage}
          onRequestClose={() => setShowImage(false)}
          pressClose={() => setShowImage(false)}
          data={data}
        />
      )}
      <View style={styles.viewRender}>
        {deleteButton && (
          <ButtonComponent
            onPress={deleteItem}
            styleButton={styles.ButtonComponentIcon}
            styleIcon={styles.imageStyle}
            icon={icons.ic_cancel}
          />
        )}
        <TouchableOpacity onPress={() => setShowImage(true)}>
          <Image
            source={
              data?.uri
                ? {uri: data?.uri}
                : data?.fileUrl
                ? {uri: data?.fileUrl}
                : null
            }
            style={styles.image}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ModalShowImage = (props:any) => {
  const {modalVisible, onRequestClose, data, pressClose} = props;
  return (
    <View style={styles.viewModal}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachViewModal}>
          <Image
            source={
              data?.uri
                ? {uri: data?.uri}
                : data?.fileUrl
                ? {uri: data?.fileUrl}
                : null
            }
            style={{width: '100%', height: '90%'}}
            resizeMode={'contain'}
          />
          <ButtonComponent
            onPress={pressClose}
            icon={icons.ic_close}
            styleIcon={{width: 15, height: 15, tintColor: 'red'}}
            styleButton={styles.buttonClose}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {width: 180, height: 180, marginHorizontal: 5},
  imageStyle: {width: 20, height: 20},
  viewRender: {
    height: 210,
    width: 210,
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  ButtonComponentIcon: {position: 'absolute', right: 3, top: 3, zIndex: 1},
  viewModal: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  eachViewModal: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(1,1,1,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
});
export default RenderImage;
