import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AllPages from './src/pages/AllPages';
import InitialPage from './src/pages/InitialPage';
import Login from './src/pages/Login';
import RegisterUser from './src/pages/usersPages/RegisterUser';
import RegisterCompany from './src/pages/companyPages/RegisterCompany';
import Map from './src/pages/Map';
import ChooseTypeOfVehicle from './src/pages/usersPages/ChooseTypeOfVehicle';

export default function App({navigation}) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer initialRouteName="AllPages">
      <StatusBar style="auto" />

      <Stack.Navigator>
        <Stack.Screen name="AllPages" component={AllPages} initialParams={{ navigation }} />
        <Stack.Screen name="InitialPage" component={InitialPage} initialParams={{ navigation }} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} initialParams={{ navigation }} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} initialParams={{ navigation }} />
        <Stack.Screen name="RegisterCompany" component={RegisterCompany} initialParams={{ navigation }} />
        <Stack.Screen name="Map" component={Map} initialParams={{ navigation }} options={{headerShown: false}}/>
        <Stack.Screen name="ChooseTypeOfVehicle" component={ChooseTypeOfVehicle} initialParams={{ navigation }} options={{headerShown: false}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}