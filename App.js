import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AllPages from './src/pages/AllPages';
import InitialPage from './src/pages/InitialPage';
import Login from './src/pages/Login';
import RegisterPassenger from './src/pages/passengerPages/RegisterPassenger';
import RegisterCompany from './src/pages/companyPages/RegisterCompany';
import Map from './src/pages/Map';
import ChooseTypeOfVehicle from './src/pages/passengerPages/ChooseTypeOfVehicle';
import Settings from './src/pages/passengerPages/Settings';
import EditProfile from './src/pages/passengerPages/EditProfile';

export default function App({navigation}) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer initialRouteName="InitialPage">
      <StatusBar style="auto" />

      <Stack.Navigator>
				<Stack.Screen name="AllPages" component={AllPages} initialParams={{ navigation }} />

        <Stack.Screen name="InitialPage" component={InitialPage} initialParams={{ navigation }} options={{headerShown: false}}/>

				<Stack.Screen name="Login" component={Login} initialParams={{ navigation }} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterPassenger" component={RegisterPassenger} initialParams={{ navigation }} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterCompany" component={RegisterCompany} initialParams={{ navigation }} options={{headerShown: false}} />
        <Stack.Screen name="EditProfile" component={EditProfile} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="Map" component={Map} initialParams={{ navigation }} options={{headerShown: false}}/>

				<Stack.Screen name="Settings" component={Settings} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="ChooseTypeOfVehicle" component={ChooseTypeOfVehicle} initialParams={{ navigation }} options={{headerShown: false}} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
