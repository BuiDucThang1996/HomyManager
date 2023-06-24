import React from 'react';
import {Modal, View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {icons} from '../../constants';
import ButtonComponent from './ButtonComponent';

const LoadingComponent = props => {
  const {modalVisible, onRequestClose, pressBack} = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          {pressBack && (
            <ButtonComponent
              onPress={pressBack}
              icon={icons.ic_back}
              styleIcon={styles.icon}
              styleButton={styles.button}
            />
          )}
          <Text style={styles.textLoading}>Xin chờ...</Text>
          <ActivityIndicator color={'white'} size={60} />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
  eachContainer: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    fontSize: 28,
    color: 'white',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  button: {position: 'absolute', top: 15, left: 10},
});
export default LoadingComponent;
