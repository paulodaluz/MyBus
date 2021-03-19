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
import SettingsPassenger from './src/pages/passengerPages/SettingsPassenger';
import SettingsCompany from './src/pages/companyPages/SettingsCompany';
import EditProfilePassenger from './src/pages/passengerPages/EditProfilePassenger';
import EditProfileCompany from './src/pages/companyPages/EditProfileCompany';
import AddNewPrivateVehicle from './src/pages/passengerPages/AddNewPrivateVehicle';
import LeaveYourOpinion from './src/pages/passengerPages/LeaveYourOpinion';

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

				<Stack.Screen name="EditProfilePassenger" component={EditProfilePassenger} initialParams={{ navigation }} options={{headerShown: false}} />
        <Stack.Screen name="EditProfileCompany" component={EditProfileCompany} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="Map" component={Map} initialParams={{ navigation }} options={{headerShown: false}}/>

				<Stack.Screen name="SettingsPassenger" component={SettingsPassenger} initialParams={{ navigation }} options={{headerShown: false}} />
				<Stack.Screen name="SettingsCompany" component={SettingsCompany} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="ChooseTypeOfVehicle" component={ChooseTypeOfVehicle} initialParams={{ navigation }} options={{headerShown: false}} />
				<Stack.Screen name="AddNewPrivateVehicle" component={AddNewPrivateVehicle} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="LeaveYourOpinion" component={LeaveYourOpinion} initialParams={{ navigation }} options={{headerShown: false}} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
