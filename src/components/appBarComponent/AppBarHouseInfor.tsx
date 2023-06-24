import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, icons, images} from '../../constants';
import ButtonComponent from '../commonComponent/ButtonComponent';
const widthLine = Dimensions.get('window').width - 20;

const AppBarHouseInfor = (props:any) => {
  const {
    onPressLeft,
    nameBuilding,
    addressBuilding,
    pressIconRight,
    pressDelete,
  } = props;
  return (
    <ImageBackground source={images.im_appBar} style={{paddingHorizontal: 10}}>
      <View style={styles.viewTabBarTop}>
        <ButtonComponent
          styleIcon={styles.iconTop}
          icon={icons.ic_back}
          onPress={onPressLeft}
        />
        <Text style={{color: 'white', flex: 1}}>Thông tin tòa nhà</Text>
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
      <View style={styles.whiteLine} />
      <View style={{height: 130, paddingVertical: 5}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 20, fontWeight: '600', color: 'white', flex: 1}}>
            {nameBuilding}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{marginTop: 5}}>
            <Image source={icons.ic_locationHouse} style={{width:32,height:32}} />
          </View>
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{color: 'white', fontSize: 10}}>
              {addressBuilding}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  viewTabBarTop: {height: 56, alignItems: 'center', flexDirection: 'row'},
  iconTop: {width: 24, height: 24, tintColor: 'white', marginRight: 10},
  whiteLine: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 1,
    position: 'absolute',
    top: 56,
  },
});
export default AppBarHouseInfor;
