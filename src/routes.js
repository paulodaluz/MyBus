import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import InitialPage from './pages/InitialPage';
import Login from './pages/Login';
import ForgotMyPassword from './pages/ForgotMyPassword';

import MapPassenger from './pages/passengerPages/MapPassenger';
import RegisterPassenger from './pages/passengerPages/RegisterPassenger';
import ChooseTypeOfVehicle from './pages/passengerPages/ChooseTypeOfVehicle';
import SettingsPassenger from './pages/passengerPages/SettingsPassenger';
import EditProfilePassenger from './pages/passengerPages/EditProfilePassenger';
import AddNewPrivateVehicle from './pages/passengerPages/AddNewPrivateVehicle';
import LeaveYourOpinionPassenger from './pages/passengerPages/LeaveYourOpinionPassenger';
import ListMyLinkedVehicles from './pages/passengerPages/ListMyLinkedVehicles';
import ListVehicleInfosPassenger from './pages/passengerPages/ListVehicleInfosPassenger';

import MapCompany from './pages/companyPages/MapCompany';
import RegisterCompany from './pages/companyPages/RegisterCompany';
import SettingsCompany from './pages/companyPages/SettingsCompany';
import EditProfileCompany from './pages/companyPages/EditProfileCompany';
import LeaveYourOpinionCompany from './pages/companyPages/LeaveYourOpinionCompany';
import ReceivedFeedbacks from './pages/companyPages/ReceivedFeedbacks';
import CreateNewVehicle from './pages/companyPages/CreateNewVehicle';
import AskShowVehicleCode from './pages/companyPages/AskShowVehicleCode';
import ShowVehicleCode from './pages/companyPages/ShowVehicleCode';
import AskPointsVehicleWillPass from './pages/companyPages/AskPointsVehicleWillPass';
import ChoicePointsVehicleWillPass from './pages/companyPages/ChoicePointsVehicleWillPass';
import ListVehicleInfosCompany from './pages/companyPages/ListVehicleInfosCompany';
import EditVehicle from './pages/companyPages/EditVehicle';

import MapDriver from './pages/driverPages/MapDriver';
import LoginDriver from './pages/driverPages/LoginDriver';
import SettingsDriver from './pages/driverPages/SettingsDriver';

const Stack = createStackNavigator();
const headerShown = false;

export default function App({ navigation }) {
	return (
		<NavigationContainer initialRouteName="InitialPage">
			<StatusBar style="auto" />

			<Stack.Navigator>
				<Stack.Screen
					name="InitialPage"
					component={InitialPage}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ForgotMyPassword"
					component={ForgotMyPassword}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>

				<Stack.Screen
					name="MapPassenger"
					component={MapPassenger}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="RegisterPassenger"
					component={RegisterPassenger}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ChooseTypeOfVehicle"
					component={ChooseTypeOfVehicle}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="SettingsPassenger"
					component={SettingsPassenger}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="EditProfilePassenger"
					component={EditProfilePassenger}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="AddNewPrivateVehicle"
					component={AddNewPrivateVehicle}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="LeaveYourOpinionPassenger"
					component={LeaveYourOpinionPassenger}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ListMyLinkedVehicles"
					component={ListMyLinkedVehicles}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ListVehicleInfosPassenger"
					component={ListVehicleInfosPassenger}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>

				<Stack.Screen
					name="MapCompany"
					component={MapCompany}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="RegisterCompany"
					component={RegisterCompany}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="SettingsCompany"
					component={SettingsCompany}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="EditProfileCompany"
					component={EditProfileCompany}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="LeaveYourOpinionCompany"
					component={LeaveYourOpinionCompany}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ReceivedFeedbacks"
					component={ReceivedFeedbacks}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="CreateNewVehicle"
					component={CreateNewVehicle}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="AskShowVehicleCode"
					component={AskShowVehicleCode}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="ShowVehicleCode"
					component={ShowVehicleCode}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="AskPointsVehicleWillPass"
					component={AskPointsVehicleWillPass}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="ChoicePointsVehicleWillPass"
					component={ChoicePointsVehicleWillPass}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="ListVehicleInfosCompany"
					component={ListVehicleInfosCompany}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="EditVehicle"
					component={EditVehicle}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>

				<Stack.Screen
					name="MapDriver"
					component={MapDriver}
					initialParams={{ navigation }}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="LoginDriver"
					component={LoginDriver}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="SettingsDriver"
					component={SettingsDriver}
					initialParams={{ navigation }}
					options={{ headerShown }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
