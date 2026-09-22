import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createRouteScreen } from './navigation/RouteScreen';
import type { RootStackParamList } from './navigation/types';
import { StatusBar } from 'expo-status-bar';
import ForgotMyPassword from './pages/commonPages/ForgotMyPassword';
import InitialPage from './pages/commonPages/InitialPage';
import Login from './pages/commonPages/Login';
import AskPointsVehicleWillPass from './pages/companyPages/AskPointsVehicleWillPass';
import AskShowVehicleCode from './pages/companyPages/AskShowVehicleCode';
import ChoicePointsVehicleWillPass from './pages/companyPages/ChoicePointsVehicleWillPass';
import CreateNewVehicle from './pages/companyPages/CreateNewVehicle';
import EditProfileCompany from './pages/companyPages/EditProfileCompany';
import EditVehicle from './pages/companyPages/EditVehicle';
import LeaveYourOpinionCompany from './pages/companyPages/LeaveYourOpinionCompany';
import ListVehicleInfosCompany from './pages/companyPages/ListVehicleInfosCompany';
import MapCompany from './pages/companyPages/MapCompany';
import ReceivedFeedbacks from './pages/companyPages/ReceivedFeedbacks';
import RegisterCompany from './pages/companyPages/RegisterCompany';
import SettingsCompany from './pages/companyPages/SettingsCompany';
import ShowVehicleCode from './pages/companyPages/ShowVehicleCode';
import LoginDriver from './pages/driverPages/LoginDriver';
import MapDriver from './pages/driverPages/MapDriver';
import SettingsDriver from './pages/driverPages/SettingsDriver';
import AddNewPrivateVehicle from './pages/passengerPages/AddNewPrivateVehicle';
import ChooseTypeOfVehicle from './pages/passengerPages/ChooseTypeOfVehicle';
import EditProfilePassenger from './pages/passengerPages/EditProfilePassenger';
import LeaveYourOpinionPassenger from './pages/passengerPages/LeaveYourOpinionPassenger';
import ListMyLinkedVehicles from './pages/passengerPages/ListMyLinkedVehicles';
import ListVehicleInfosPassenger from './pages/passengerPages/ListVehicleInfosPassenger';
import MapPassenger from './pages/passengerPages/MapPassenger';
import RegisterPassenger from './pages/passengerPages/RegisterPassenger';
import SettingsPassenger from './pages/passengerPages/SettingsPassenger';

const screens = {
	InitialPage: createRouteScreen(InitialPage, 'InitialPage'),
	Login: createRouteScreen(Login, 'Login'),
	ForgotMyPassword: createRouteScreen(ForgotMyPassword, 'ForgotMyPassword'),
	MapPassenger: createRouteScreen(MapPassenger, 'MapPassenger'),
	RegisterPassenger: createRouteScreen(RegisterPassenger, 'RegisterPassenger'),
	ChooseTypeOfVehicle: createRouteScreen(ChooseTypeOfVehicle, 'ChooseTypeOfVehicle'),
	SettingsPassenger: createRouteScreen(SettingsPassenger, 'SettingsPassenger'),
	EditProfilePassenger: createRouteScreen(EditProfilePassenger, 'EditProfilePassenger'),
	AddNewPrivateVehicle: createRouteScreen(AddNewPrivateVehicle, 'AddNewPrivateVehicle'),
	LeaveYourOpinionPassenger: createRouteScreen(
		LeaveYourOpinionPassenger,
		'LeaveYourOpinionPassenger'
	),
	ListMyLinkedVehicles: createRouteScreen(ListMyLinkedVehicles, 'ListMyLinkedVehicles'),
	ListVehicleInfosPassenger: createRouteScreen(
		ListVehicleInfosPassenger,
		'ListVehicleInfosPassenger'
	),
	MapCompany: createRouteScreen(MapCompany, 'MapCompany'),
	RegisterCompany: createRouteScreen(RegisterCompany, 'RegisterCompany'),
	SettingsCompany: createRouteScreen(SettingsCompany, 'SettingsCompany'),
	EditProfileCompany: createRouteScreen(EditProfileCompany, 'EditProfileCompany'),
	LeaveYourOpinionCompany: createRouteScreen(LeaveYourOpinionCompany, 'LeaveYourOpinionCompany'),
	ReceivedFeedbacks: createRouteScreen(ReceivedFeedbacks, 'ReceivedFeedbacks'),
	CreateNewVehicle: createRouteScreen(CreateNewVehicle, 'CreateNewVehicle'),
	AskShowVehicleCode: createRouteScreen(AskShowVehicleCode, 'AskShowVehicleCode'),
	ShowVehicleCode: createRouteScreen(ShowVehicleCode, 'ShowVehicleCode'),
	AskPointsVehicleWillPass: createRouteScreen(AskPointsVehicleWillPass, 'AskPointsVehicleWillPass'),
	ChoicePointsVehicleWillPass: createRouteScreen(
		ChoicePointsVehicleWillPass,
		'ChoicePointsVehicleWillPass'
	),
	ListVehicleInfosCompany: createRouteScreen(ListVehicleInfosCompany, 'ListVehicleInfosCompany'),
	EditVehicle: createRouteScreen(EditVehicle, 'EditVehicle'),
	MapDriver: createRouteScreen(MapDriver, 'MapDriver'),
	LoginDriver: createRouteScreen(LoginDriver, 'LoginDriver'),
	SettingsDriver: createRouteScreen(SettingsDriver, 'SettingsDriver'),
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const headerShown = false;

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />

			<Stack.Navigator initialRouteName="InitialPage">
				{/* Passenger Routes */}
				<Stack.Screen
					name="InitialPage"
					component={screens.InitialPage}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen name="Login" component={screens.Login} options={{ headerShown }} />
				<Stack.Screen
					name="ForgotMyPassword"
					component={screens.ForgotMyPassword}
					options={{ headerShown }}
				/>

				<Stack.Screen
					name="MapPassenger"
					component={screens.MapPassenger}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="RegisterPassenger"
					component={screens.RegisterPassenger}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ChooseTypeOfVehicle"
					component={screens.ChooseTypeOfVehicle}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="SettingsPassenger"
					component={screens.SettingsPassenger}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="EditProfilePassenger"
					component={screens.EditProfilePassenger}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="AddNewPrivateVehicle"
					component={screens.AddNewPrivateVehicle}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="LeaveYourOpinionPassenger"
					component={screens.LeaveYourOpinionPassenger}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ListMyLinkedVehicles"
					component={screens.ListMyLinkedVehicles}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ListVehicleInfosPassenger"
					component={screens.ListVehicleInfosPassenger}
					options={{ headerShown }}
				/>

				{/* Company Routes */}
				<Stack.Screen
					name="MapCompany"
					component={screens.MapCompany}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="RegisterCompany"
					component={screens.RegisterCompany}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="SettingsCompany"
					component={screens.SettingsCompany}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="EditProfileCompany"
					component={screens.EditProfileCompany}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="LeaveYourOpinionCompany"
					component={screens.LeaveYourOpinionCompany}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="ReceivedFeedbacks"
					component={screens.ReceivedFeedbacks}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="CreateNewVehicle"
					component={screens.CreateNewVehicle}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="AskShowVehicleCode"
					component={screens.AskShowVehicleCode}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="ShowVehicleCode"
					component={screens.ShowVehicleCode}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="AskPointsVehicleWillPass"
					component={screens.AskPointsVehicleWillPass}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="ChoicePointsVehicleWillPass"
					component={screens.ChoicePointsVehicleWillPass}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="ListVehicleInfosCompany"
					component={screens.ListVehicleInfosCompany}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="EditVehicle"
					component={screens.EditVehicle}
					options={{ headerShown }}
				/>

				{/* Driver Routes */}
				<Stack.Screen
					name="MapDriver"
					component={screens.MapDriver}
					options={{ headerShown, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="LoginDriver"
					component={screens.LoginDriver}
					options={{ headerShown }}
				/>
				<Stack.Screen
					name="SettingsDriver"
					component={screens.SettingsDriver}
					options={{ headerShown }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
