import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function App(): JSX.Element {
const [base64Image,setBase64Image]=useState()
  console.log(base64Image);
  
  const openCamera = async () => {
    const result = await launchCamera({
      includeBase64: true,
      quality: 0.8,
    });
    setBase64Image(result?.assets[0]?.base64)
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      quality: 0.8,
      selectionLimit: 100,
    });
    setBase64Image(result?.assets[0]?.base64)
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.camera} onPress={openCamera}>
          <Text style={styles.text}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={openGallery}
        style={[styles.camera, {marginTop: 40}]}>
          <Text style={styles.text}>Open Gallery</Text>
        </TouchableOpacity>
        <Image resizeMode='contain' style={styles.image} source={{uri: `data:image/jpeg;base64,${base64Image}`}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  camera: {
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: 16, fontWeight: '600'},
  image:{width:200,height:200}
});

export default App;
