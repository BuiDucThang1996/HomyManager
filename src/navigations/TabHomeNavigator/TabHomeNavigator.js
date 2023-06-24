import React from 'react';
import {Image, Text, View, StyleSheet, Animated} from 'react-native';
import {icons, colors} from '../../constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackHomeNavigator from './StackHomeNavigator';
import StackAccountNavigatior from './StackAccountNavigatior';

const Tab = createBottomTabNavigator();

const TabHomeNavigator = () => {
  const renderTabBar = (focused, icon, title) => {
    return (
      <View style={styles.view}>
        <Image
          source={icon}
          style={[
            {tintColor: focused ? colors.mainColor : 'black'},
            styles.image,
          ]}
          resizeMode="contain"
        />
        <Text
          style={[
            {color: focused ? colors.mainColor : 'rgb(119,119,119)'},
            styles.text,
          ]}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {height: 56},
      })}
      initialRouteName="StackHomeNavigator">
      <Tab.Screen
        component={StackHomeNavigator}
        name={'StackHomeNavigator'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_homeTabBar, 'Trang chủ'),
        }}
      />

      <Tab.Screen
        component={StackAccountNavigatior}
        name={'StackAccountNavigatior'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_personAppBar, 'Tài khoản'),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  view: {justifyContent: 'center', alignItems: 'center'},
  image: {width: 28, height: 28},
  text: {textAlign: 'center', fontSize: 10},
});
export default TabHomeNavigator;
