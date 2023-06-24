import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNBootSplash from 'react-native-bootsplash';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {
  const [base64Image, setBase64Image] = useState();

  useEffect(() => {
    const closeSplash = async () => {
      await RNBootSplash.hide({fade: true});
    };
    requestCameraPermission();
    closeSplash();
  }, []);

  const openCamera = async () => {
    const result = await launchCamera({
      includeBase64: true,
      quality: 0.8,
    });
    setBase64Image(result?.assets[0]?.base64);
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      quality: 0.8,
      selectionLimit: 100,
    });
    setBase64Image(result?.assets[0]?.base64);
  };
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
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{uri: `data:image/jpeg;base64,${base64Image}`}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {color: 'white', fontSize: 16, fontWeight: '600'},
  image: {width: 200, height: 200},
});

export default App;
