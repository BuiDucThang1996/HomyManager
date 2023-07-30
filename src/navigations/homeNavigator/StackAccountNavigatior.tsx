import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen, EditAccount} from '../../screens';
const Stack = createStackNavigator();

const StackAccountNavigatior = () => {
  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen
        component={AccountScreen}
        name={'AccountScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditAccount}
        name={'EditAccount'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackAccountNavigatior;
