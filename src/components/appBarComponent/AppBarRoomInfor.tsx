import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {colors, icons, images} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';

const widthLine = Dimensions.get('window').width - 20;

const AppBarUnitInfor = (props: any) => {
  const {
    onPressLeft,
    pressIconRight,
    nameRoom,
    addressBuilding,
    pressQuickAddRoom,
    pressEdit,
    pressDelete,
  } = props;
  return (
    <ImageBackground source={images.im_appBar} style={{paddingHorizontal: 10}}>
      <View style={styles.viewAppBarTop}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center',flex:1}}
          onPress={onPressLeft}>
          <ButtonComponent
            disabled={true}
            styleIcon={styles.iconTop}
            icon={icons.ic_back}
          />
          <Text style={styles.titleScreen}>Thông tin phòng</Text>
        </TouchableOpacity>

        {/* <ButtonComponent
          styleIcon={styles.iconTop}
          icon={icons.ic_bell}
          onPress={pressIconRight}
        /> */}
        <ButtonComponent
          styleIcon={styles.iconTop}
          icon={icons.ic_trash}
          onPress={pressDelete}
        />
      </View>
      <View style={styles.line} />
      <View style={{height: 130}}>
        <View style={styles.viewRow}>
          <View>
            <Text
              style={{
                fontSize: 17,
                color: 'white',
                fontWeight: '600',
                marginTop: 5,
              }}>
              {nameRoom}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{marginTop: 5}}>
            <Image
              source={icons.ic_locationHouse}
              style={{width: 32, height: 32}}
            />
          </View>
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{color: 'white', fontSize: 10}}>
              {addressBuilding}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <ButtonComponent
            label={'Sao chép phòng'}
            icon={icons.ic_plus}
            styleButton={[
              {backgroundColor: colors.backgroundOrange, marginRight: 10},
              styles.styleButton,
            ]}
            styleIcon={styles.icon}
            styleLabel={{color: 'white', fontSize: 12}}
            onPress={pressQuickAddRoom}
          />
          <ButtonComponent
            label={'Sửa'}
            icon={icons.ic_edit}
            styleButton={[{backgroundColor: colors.green}, styles.styleButton]}
            styleIcon={styles.icon}
            styleLabel={{color: 'white', fontSize: 12}}
            onPress={pressEdit}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  line: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 1,
    position: 'absolute',
    top: 56,
  },
  styleButton: {
    flexDirection: 'row',
    height: 26,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  icon: {tintColor: 'white', width: 18, height: 18, marginRight: 2},
  iconTop: {width: 24, height: 24, tintColor: 'white', marginRight: 10},
  titleScreen: {color: 'white', fontWeight: '600', fontSize: 17},
  viewAppBarTop: {height: 56, alignItems: 'center', flexDirection: 'row'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default AppBarUnitInfor;
