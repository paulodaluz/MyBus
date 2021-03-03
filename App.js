import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import InitialPage from './src/pages/InitialPage';
import RegisterUser from './src/pages/usersPages/RegisterUser';
import Login from './src/pages/Login';

export default function App({navigation}) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer initialRouteName="InitialPage">
      <StatusBar style="auto" />

      <Stack.Navigator>
        <Stack.Screen name="InitialPage" component={InitialPage} initialParams={{ navigation }} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} initialParams={{ navigation }} />
        <Stack.Screen name="Login" component={Login} initialParams={{ navigation }} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}