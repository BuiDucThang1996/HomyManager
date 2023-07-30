import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import AppBarComponent from '../../../components/appBarComponent/AppBarComponent';
import {icons} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
const ContractTermsDetail = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppBarComponent
        iconLeft={icons.ic_back}
        label={'Chi tiết điều khoản'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, marginTop: 10}}>
        <Text>Danh sách điều khoản</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({container: {flex: 1}});
export default ContractTermsDetail;
