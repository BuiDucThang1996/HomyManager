import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import useKeyboard from '../../hooks/useKeyboard';
import {colors} from '../../constants';
import {removeAccents} from '../../utils/common';

const BottomSheetPicker = (props: any) => {
  const {handlerShow, data, handlerCancel, onPressItem} = props;
  const [search, setSearch] = useState<String>('');

  const filteredItem = () =>
    data.filter((eachVoucher: any) =>
      eachVoucher?.name
        ? removeAccents(`${eachVoucher?.name}`)
            .toLocaleLowerCase()
            .includes(removeAccents(`${search}`).toLocaleLowerCase())
        : null,
    );
  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)} style={styles.button}>
        <Text style={styles.text}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const snapPoints = useMemo(() => ['1%', '5%', '10%', '50%', '90%'], []);

  const sheetRef = useRef<BottomSheet>(null);

  const handleSheetChange = useCallback((index: number) => {
    handlerShow(index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setTimeout(() => {
      handlerCancel();
    }, 150);
  }, []);
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        index={3}
        snapPoints={snapPoints}
        onChange={handleSheetChange}>
        <View style={{flex: 1, backgroundColor: 'rgba(147,147,149,255)'}}>
          <CustomViewSerch
            value={search}
            onChangeText={(text: string) => setSearch(text)}
            handlerCancel={handleClosePress}
          />
          <BottomSheetFlatList
            data={filteredItem()}
            keyExtractor={(i: any) => i?.id}
            renderItem={({item, index}) => renderItem(item, index)}
            contentContainerStyle={styles.contentContainer}
          />
        </View>
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(1,1,1,0.5)',
    position: 'absolute',
    zIndex: 1,
  },
  button: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.borderInput,
    height: 55,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    margin: 5,
  },
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
  contentContainer: {
    backgroundColor: 'rgba(147,147,149,255)',
  },
});

const CustomViewSerch = (props: any) => {
  const {value, onChangeText, handlerCancel} = props;
  const inputRef = useRef<any>();
  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.eachContainer}>
        <TextInput
          ref={inputRef}
          placeholder="Tìm kiếm"
          style={{fontSize: 10, flex: 1}}
          value={value}
          onChangeText={(text: string) => onChangeText(text)}
        />
      </View>
      <TouchableOpacity onPress={handlerCancel} style={{marginLeft: 10}}>
        <Text style={searchStyles.textCancel}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};
const searchStyles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: 'rgba(116,116,116,0.1)',
  },
  eachContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCancel: {
    color: '#ecf1f3',
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
export default BottomSheetPicker;
