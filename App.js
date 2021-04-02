import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AllPages from './src/pages/AllPages';
import InitialPage from './src/pages/InitialPage';
import Login from './src/pages/Login';
import Map from './src/pages/Map';
import ForgotMyPassword from './src/pages/ForgotMyPassword';

import RegisterPassenger from './src/pages/passengerPages/RegisterPassenger';
import ChooseTypeOfVehicle from './src/pages/passengerPages/ChooseTypeOfVehicle';
import SettingsPassenger from './src/pages/passengerPages/SettingsPassenger';
import EditProfilePassenger from './src/pages/passengerPages/EditProfilePassenger';
import AddNewPrivateVehicle from './src/pages/passengerPages/AddNewPrivateVehicle';
import LeaveYourOpinionPassenger from './src/pages/passengerPages/LeaveYourOpinionPassenger';
import ListMyLinkedVehicles from './src/pages/passengerPages/ListMyLinkedVehicles';

import RegisterCompany from './src/pages/companyPages/RegisterCompany';
import SettingsCompany from './src/pages/companyPages/SettingsCompany';
import EditProfileCompany from './src/pages/companyPages/EditProfileCompany';
import LeaveYourOpinionCompany from './src/pages/companyPages/LeaveYourOpinionCompany';
import ReceivedFeedbacks from './src/pages/companyPages/ReceivedFeedbacks';
import CreateNewVehicle from './src/pages/companyPages/CreateNewVehicle';
import AskShowVehicleCode from './src/pages/companyPages/AskShowVehicleCode';
import ShowVehicleCode from './src/pages/companyPages/ShowVehicleCode';
import AskPointsVehicleWillPass from './src/pages/companyPages/AskPointsVehicleWillPass';
import ChoicePointsVehicleWillPass from './src/pages/companyPages/ChoicePointsVehicleWillPass';
import ListVehicleInfosCompany from './src/pages/companyPages/ListVehicleInfosCompany';
import EditVehicle from './src/pages/companyPages/EditVehicle';

import SettingsDriver from './src/pages/driverPages/SettingsDriver';

export default function App({navigation}) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer initialRouteName="AllPages">
      <StatusBar style="auto" />

      <Stack.Navigator>
				<Stack.Screen name="AllPages" component={AllPages} initialParams={{ navigation }} />

        <Stack.Screen name="InitialPage" component={InitialPage} initialParams={{ navigation }} options={{headerShown: false, gestureEnabled: false}}/>

				<Stack.Screen name="Login" component={Login} initialParams={{ navigation }} options={{headerShown: false}}/>
				<Stack.Screen name="ForgotMyPassword" component={ForgotMyPassword} initialParams={{ navigation }} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterPassenger" component={RegisterPassenger} initialParams={{ navigation }} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterCompany" component={RegisterCompany} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="EditProfilePassenger" component={EditProfilePassenger} initialParams={{ navigation }} options={{headerShown: false}} />
        <Stack.Screen name="EditProfileCompany" component={EditProfileCompany} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="Map" component={Map} initialParams={{ navigation }} options={{headerShown: false, gestureEnabled: false}}/>

				<Stack.Screen name="SettingsPassenger" component={SettingsPassenger} initialParams={{ navigation }} options={{headerShown: false}} />
				<Stack.Screen name="SettingsCompany" component={SettingsCompany} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="ChooseTypeOfVehicle" component={ChooseTypeOfVehicle} initialParams={{ navigation }} options={{headerShown: false, gestureEnabled: false}} />
				<Stack.Screen name="AddNewPrivateVehicle" component={AddNewPrivateVehicle} initialParams={{ navigation }} options={{headerShown: false}} />
				<Stack.Screen name="ListMyLinkedVehicles" component={ListMyLinkedVehicles} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="AskShowVehicleCode" component={AskShowVehicleCode} initialParams={{ navigation }} options={{headerShown: false, gestureEnabled: false}} />
				<Stack.Screen name="ShowVehicleCode" component={ShowVehicleCode} initialParams={{ navigation }} options={{headerShown: false, gestureEnabled: false}} />
				<Stack.Screen name="ListVehicleInfosCompany" component={ListVehicleInfosCompany} initialParams={{ navigation }} options={{headerShown: false}} />
				<Stack.Screen name="EditVehicle" component={EditVehicle} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="AskPointsVehicleWillPass" component={AskPointsVehicleWillPass} initialParams={{ navigation }} options={{headerShown: false, gestureEnabled: false}} />
				<Stack.Screen name="ChoicePointsVehicleWillPass" component={ChoicePointsVehicleWillPass} initialParams={{ navigation }} options={{headerShown: false, gestureEnabled: false}} />

				<Stack.Screen name="LeaveYourOpinionPassenger" component={LeaveYourOpinionPassenger} initialParams={{ navigation }} options={{headerShown: false}} />
				<Stack.Screen name="LeaveYourOpinionCompany" component={LeaveYourOpinionCompany} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="ReceivedFeedbacks" component={ReceivedFeedbacks} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="CreateNewVehicle" component={CreateNewVehicle} initialParams={{ navigation }} options={{headerShown: false}} />

				<Stack.Screen name="SettingsDriver" component={SettingsDriver} initialParams={{ navigation }} options={{headerShown: false, gestureEnabled: false}} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
