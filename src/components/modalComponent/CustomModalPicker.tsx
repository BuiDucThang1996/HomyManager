import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from './ButtonComponent';
import useKeyboard from '../../hooks/useKeyboard';

const CustomModalPicker = (props:any) => {
  const {modalVisible, onRequestClose, onPressItem, data, pressClose} = props;
  const [search, setSearch] = useState('');
  const keyboard=useKeyboard()

 

  const filteredItem = () =>
    data.filter((eachVoucher:any) =>
      eachVoucher?.name
        ? eachVoucher?.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        : null,
    );

  const renderItem = (item:any, index:number) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)} style={styles.button}>
        <Text style={styles.text}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <ButtonComponent
            styleButton={styles.buttonClose}
            icon={icons.ic_close}
            styleIcon={styles.iconClose}
            onPress={pressClose}
          />
          <View style={styles.input}>
            {!keyboard && search == '' && (
              <Image source={icons.ic_search} style={styles.iconSearch} />
            )}
            <TextInput
              style={{flex: 1}}
              value={search}
              placeholder={'Tìm kiếm...'}
              placeholderTextColor={colors.backgroundButton}
              onChangeText={text => setSearch(text)}
            />
          </View>
          <FlatList
            style={{marginTop: 20}}
            data={filteredItem()}
            keyExtractor={(item, index) => `${index.toString()}`}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(1,1,1,0.5)',
    position: 'absolute',
    zIndex: 9999,
  },
  eachContainer: {
    backgroundColor: 'white',
    height: 350,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderInput,
    height: 55,
    width: 300,
  },
  text: {color: 'black', fontWeight: '600', fontSize: 15, margin: 5},
  input: {
    height: 55,
    borderWidth: 2,
    borderColor: colors.backgroundButton,
    borderRadius: 5,
    width: 300,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    color: colors.backgroundButton,
  },
  iconSearch: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
    tintColor: colors.backgroundButton,
  },
  buttonClose: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.mainColor,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  iconClose: {tintColor: 'white', width: 15, height: 15},
});
export default CustomModalPicker;
