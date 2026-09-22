import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Account = { uid: string };
type Vehicle = Account & { registrationPlate: string };
export type RootStackParamList = {
	InitialPage: undefined;
	Login: undefined;
	ForgotMyPassword: undefined;
	RegisterPassenger: undefined;
	RegisterCompany: undefined;
	LoginDriver: undefined;
	MapPassenger: Account;
	MapCompany: Account;
	MapDriver: Vehicle;
	ChooseTypeOfVehicle: Account;
	SettingsPassenger: undefined;
	SettingsCompany: undefined;
	SettingsDriver: Account & { registration_Plate: string };
	EditProfilePassenger: Account;
	EditProfileCompany: Account;
	AddNewPrivateVehicle: Account;
	LeaveYourOpinionPassenger: Account & { vehicleRegistration?: string };
	LeaveYourOpinionCompany: Account;
	ListMyLinkedVehicles: Account;
	ReceivedFeedbacks: Account;
	CreateNewVehicle: Account;
	AskShowVehicleCode: Vehicle;
	ShowVehicleCode: Vehicle;
	AskPointsVehicleWillPass: Vehicle;
	ChoicePointsVehicleWillPass: Vehicle;
	ListVehicleInfosPassenger: Vehicle & { status?: string };
	ListVehicleInfosCompany: Vehicle & { status?: string };
	EditVehicle: Account & { registration_Plate: string; backPage?: 'MapDriver' | 'SettingsDriver' };
};
export type ScreenProps<Name extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	Name
>;
declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
