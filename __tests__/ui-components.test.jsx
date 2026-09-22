import { View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { Divisor } from '../src/components/Divisor';
import { Footer as RegisterFooter } from '../src/components/FooterRegister';
import { FunctionBarOfVehicle } from '../src/components/FunctionBarOfVehicle';
import { Header } from '../src/components/Header';
import { Input } from '../src/components/Input';
import { Menu } from '../src/components/Menu';
import { MiddleButton } from '../src/components/MiddleButton';
import { OptionConfig } from '../src/components/OptionConfig';
import { QRCode } from '../src/components/QRCode';
import { SwitchFunction } from '../src/components/SwitchFunction';
import { WideButton } from '../src/components/WideButton';
import { Footer as PasswordFooter } from '../src/pages/commonPages/ForgotMyPassword/Footer';
import { Button as PointsButton } from '../src/pages/companyPages/ChoicePointsVehicleWillPass/Button';
import { Header as PointsHeader } from '../src/pages/companyPages/ChoicePointsVehicleWillPass/Header';
import { RangeAppMyBus } from '../src/pages/companyPages/LeaveYourOpinionCompany/RangeAppMyBus';
import { FeedbackContainer } from '../src/pages/companyPages/ReceivedFeedbacks/FeedbackContainer';
import { Header as FeedbackHeader } from '../src/pages/companyPages/ReceivedFeedbacks/Header';
import { Header as VehicleCompanyHeader } from '../src/pages/companyPages/ListVehicleInfosCompany/Header';
import { ListInfos } from '../src/pages/companyPages/ListVehicleInfosCompany/ListOfInfos';
import { Header as ShowVehicleHeader } from '../src/pages/companyPages/ShowVehicleCode/Header';
import { InformationField } from '../src/pages/companyPages/ShowVehicleCode/InformationField';
import { Menu as DriverMenu } from '../src/pages/driverPages/MapDriver/Menu';
import { ShowVehicle } from '../src/pages/driverPages/MapDriver/ShowVehicle';
import { WarningSharingLocalization } from '../src/pages/driverPages/MapDriver/WarningSharingLocalization';
import { Header as AddVehicleHeader } from '../src/pages/passengerPages/AddNewPrivateVehicle/Header';
import { Header as ChooseVehicleHeader } from '../src/pages/passengerPages/ChooseTypeOfVehicle/Header';
import { SwitchCase } from '../src/pages/passengerPages/ChooseTypeOfVehicle/SwitchCase';
import { DynamicButton } from '../src/pages/passengerPages/LeaveYourOpinionPassenger/DynamicButton';
import { DynamicInputs } from '../src/pages/passengerPages/LeaveYourOpinionPassenger/DynamicInputs';
import { BoxWithInfoVehicles } from '../src/pages/passengerPages/ListMyLinkedVehicles/List';
import { Header as PassengerVehicleHeader } from '../src/pages/passengerPages/ListVehicleInfosPassenger/Header';
import { InfosVehicle } from '../src/pages/passengerPages/ListVehicleInfosPassenger/InfosVehicle';
import { NextVehicleOnThisPoint } from '../src/pages/passengerPages/MapPassenger/NextVehicleOnThisPoint';
import { ButtonSwitchConfig } from '../src/pages/passengerPages/SettingsPassenger/ButtonSwitchConfig';

describe('shared and presentational components', () => {
	test('renders headers, fields and buttons in their supported states', () => {
		const onPress = jest.fn();
		const onChangeText = jest.fn();
		const { getByPlaceholderText, getByText } = render(
			<>
				<Header title="Title" subtitle="Subtitle" />
				<Header title="Only title" />
				<Input
					value="value"
					placeholder="Type here"
					onChangeText={onChangeText}
					textContentType="name"
					keyboardType="email-address"
					secureTextEntry
				/>
				<WideButton onPress={onPress} textButton="Wide" backgroundColor="red" />
				<MiddleButton onPress={onPress} textButton="Middle" backgroundColor="blue" />
				<OptionConfig onPress={onPress} textButton="Option" />
				<Divisor />
			</>
		);

		expect(getByText('Title')).toBeTruthy();
		expect(getByText('Subtitle')).toBeTruthy();
		expect(getByText('Only title')).toBeTruthy();
		fireEvent.changeText(getByPlaceholderText('Type here'), 'changed');
		fireEvent.press(getByText('Wide'));
		fireEvent.press(getByText('Middle'));
		fireEvent.press(getByText('Option'));
		expect(onChangeText).toHaveBeenCalledWith('changed');
		expect(onPress).toHaveBeenCalledTimes(3);
	});

	test('renders menus, registration footers and a QR code', () => {
		const first = jest.fn();
		const second = jest.fn();
		const register = jest.fn();
		const recover = jest.fn();
		const { getByText, getAllByText } = render(
			<>
				<Menu
					onPressFirstButton={first}
					textFirstButton="First"
					onPressSecondButton={second}
					textSecondButton="Second"
				/>
				<RegisterFooter onPress={register} />
				<PasswordFooter onPress={recover} />
				<QRCode />
			</>
		);

		fireEvent.press(getByText('First'));
		fireEvent.press(getByText('Second'));
		fireEvent.press(getByText(/Você já tem uma conta/));
		fireEvent.press(getAllByText('Entrar')[1]);
		expect(first).toHaveBeenCalledTimes(1);
		expect(second).toHaveBeenCalledTimes(1);
		expect(register).toHaveBeenCalledTimes(1);
		expect(recover).toHaveBeenCalledTimes(1);
		expect(getByText('Escanear QR-CODE')).toBeTruthy();
	});

	test('renders vehicle functions and switch controls', () => {
		const onValueChange = jest.fn();
		const { getByText, getAllByRole } = render(
			<>
				<FunctionBarOfVehicle
					thereIsWifi
					thereIsWheelchairSupport
					thereIsBathroom
					thereIsAirConditioning
					price="5"
				/>
				<FunctionBarOfVehicle price="0" />
				<SwitchFunction text="Internet" value={false} onValueChange={onValueChange} />
			</>
		);

		fireEvent(getAllByRole('switch')[0], 'valueChange', true);
		expect(onValueChange).toHaveBeenCalledWith(true);
		expect(getByText('5')).toBeTruthy();
		expect(getByText('0')).toBeTruthy();
	});

	test('renders the page-specific presentational components', () => {
		const onPress = jest.fn();
		const { getByText, getAllByRole } = render(
			<>
				<PointsHeader title="Choose points" />
				<PointsButton onPress={onPress} textButton="Finish" backgroundColor="purple" />
				<RangeAppMyBus />
				<FeedbackHeader />
				<FeedbackContainer feedback={{ name_sender: 'Ana', feedback: 'Great' }} />
				<VehicleCompanyHeader vehicleName="Bus" />
				<ListInfos
					name="Bus"
					status="Running"
					idToPassangers="#BUS"
					plateId="ABC-123"
					password="secret"
				/>
				<ShowVehicleHeader title="Vehicle" />
				<InformationField fieldName="LOGIN" info="ABC-123" onPress={onPress} />
				<AddVehicleHeader />
				<ChooseVehicleHeader title="Choose" />
				<PassengerVehicleHeader name="Bus" time={4} />
				<InfosVehicle name="Bus" status="Running" idToPassangers="#BUS" valueReminder="yes" />
				<NextVehicleOnThisPoint vehiclesOnThisPoint={['Bus']} time={3} openOnMap={onPress} />
				<BoxWithInfoVehicles
					item={{ name: 'Bus', registration_plate: 'ABC-123' }}
					onPress={onPress}
				/>
				<ButtonSwitchConfig value onValueChange={onPress} />
				<DriverMenu
					onPressShareLocalizationButton={onPress}
					onPressConfigButton={onPress}
					onPressShowVehicleInfos={onPress}
				/>
				<ShowVehicle
					vehicleInfos={{
						name: 'Bus',
						id_to_passengers: '#BUS',
						id_to_share_localization: 'ABC-123',
						password_to_share_localization: 'secret',
					}}
					statusVehicle="Running"
					vehicleFunctions={{
						wifi: true,
						air_conditioning: false,
						washrooms: true,
						suport_wheelchair: false,
						price_transport: 5,
					}}
					onPressCloseButton={onPress}
					onPressUpdateVehiclesInfo={onPress}
				/>
				<WarningSharingLocalization />
				<SwitchCase
					typeOfVehicleToList="public"
					onPressFirstSwitch={onPress}
					onPressSecondSwitch={onPress}
				/>
				<DynamicButton
					feedbackRecipient="company"
					onPressFirstButton={onPress}
					onPressSecondButton={onPress}
				/>
				<DynamicInputs
					feedbackRecipient="company"
					vehicleRegistration="ABC-123"
					vehicleName="Bus"
					feedback="Great"
					onChangeFeedback={onPress}
				/>
			</>
		);

		fireEvent.press(getByText('Finish'));
		fireEvent.press(getByText('LOGIN'));
		getAllByRole('switch')
			.filter((button) => button.props.onValueChange)
			.forEach((button) => fireEvent(button, 'valueChange', false));
		expect(onPress).toHaveBeenCalled();
		expect(getByText('Choose points')).toBeTruthy();
	});
});

test('shared controls expose loading, disabled, error and custom color states', () => {
	const press = jest.fn();
	const view = render(
		<View>
			<WideButton textButton="Pending" loading onPress={press} />
			<WideButton textButton="Disabled" disabled textColor="black" onPress={press} />
			<Input placeholder="Pending input" loading />
			<Input placeholder="Invalid input" error="E-mail inválido" disabled />
		</View>
	);
	fireEvent.press(view.getByText('Pending'));
	fireEvent.press(view.getByText('Disabled'));
	expect(press).not.toHaveBeenCalled();
	expect(view.getByRole('button', { name: 'Pending' }).props.accessibilityState.busy).toBe(true);
	expect(view.getByPlaceholderText('Pending input').props.editable).toBe(false);
	expect(view.getByRole('alert').props.children).toBe('E-mail inválido');
});
