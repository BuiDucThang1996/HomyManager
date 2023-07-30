import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput,
} from 'react-native';
import {colors, icons} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
import useKeyboard from '../../hooks/useKeyboard';
const CustomModalListBank = (props: any) => {
  const {modalVisible, onRequestClose, data, onPress, pressClose} = props;
  const [search, setSearch] = useState('');
  const keyboard = useKeyboard();

  const filteredItem = () =>
    data.filter((eachVoucher: any) =>
      eachVoucher?.code || eachVoucher?.name
        ? eachVoucher?.code
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          eachVoucher?.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        : null,
    );

  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={styles.buttonRender}
        onPress={() => onPress(item)}>
        <Image
          source={typeof item?.logo == 'string' ? {uri: item?.logo} : null}
          style={{width: 100, height: 40, marginRight: 10}}
          resizeMode={'cover'}
        />
        <View style={{flex: 1}}>
          <Text numberOfLines={2}>{item?.name}</Text>
        </View>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
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
            <ButtonComponent
              styleButton={styles.buttonClose}
              icon={icons.ic_close}
              styleIcon={styles.iconClose}
              onPress={pressClose}
            />
          </View>
          <FlatList
            data={filteredItem()}
            keyExtractor={key => key?.id}
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
    position: 'absolute',
    backgroundColor: 'rgba(1,1,1,0.5)',
    zIndex: 1,
  },
  eachContainer: {
    height: '80%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonRender: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.borderInput,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.backgroundButton,
    borderRadius: 5,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginHorizontal: 10,
  },
  iconClose: {tintColor: 'white', width: 15, height: 15},
});
export default CustomModalListBank;
