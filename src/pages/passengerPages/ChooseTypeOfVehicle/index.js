import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, View } from 'react-native';
import QRCodeIcon from '../../../assets/icons/png/qr_code.png';
import { addNewPrivateVehicle, updateUserAllInfos } from '../../../backend/users/Passenger';
import { getVehicle } from '../../../backend/vehicles/Vehicle';
import { WideButton } from '../../../components/WideButton';
import { purple } from '../../../styles/colors';
import { Header } from './Header';
import { styles } from './style';
import { SwitchCase } from './SwitchCase';

export default function ChooseTypeOfVehicle({ navigation, route }) {
	const { user } = route.params;

	const [vehicleCode, setVehicleCode] = useState('');
	const [typeOfVehicleToList, setTypeOfVehicleToList] = useState('public');
	const [subtitleMessage, setSubtitleMessage] = useState('');

	const changeTypeOfVehicle = async () => {
		if (typeOfVehicleToList === 'public') {
			await updateUserAllInfos(user.id, null, null, null, typeOfVehicleToList);
		}

		if (typeOfVehicleToList === 'private') {
			const vehicle = await getVehicle({ idToPassengers: vehicleCode });

			if (!vehicle || vehicle.is_public === true) {
				return Alert.alert('Código do veículo inálido!');
			}
			user.codes_private_vehicles = [vehicle.registration_plate];

			await Promise.all([
				updateUserAllInfos(user.id, null, null, null, typeOfVehicleToList),
				addNewPrivateVehicle(user.uid, vehicle.registration_plate),
			]);
		}

		return navigation.navigate('MapPassenger', { user });
	};

	useEffect(() => {
		if (typeOfVehicleToList === 'public') {
			return setSubtitleMessage('Veículos Públicos que estão a disposição a todos os cidadãos');
		}

		if (typeOfVehicleToList === 'private') {
			return setSubtitleMessage('Veículos Privados, necessitam de um código de acesso');
		}
	}, [typeOfVehicleToList]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Escolha o tipo\nde veículo que\nvocê deseja\nvisualizar!'} />
			</View>

			<SwitchCase
				typeOfVehicleToList={typeOfVehicleToList}
				onPressFirstSwitch={() => setTypeOfVehicleToList('public')}
				onPressSecondSwitch={() => setTypeOfVehicleToList('private')}
			/>

			<Text style={styles.description}>{subtitleMessage}</Text>

			{typeOfVehicleToList === 'private' && (
				<View style={styles.privateContainer}>
					<View style={styles.containerInput}>
						<TextInput
							placeholder="Código do seu Veículo"
							style={
								vehicleCode.length > 0
									? { ...styles.inputVehicleCode, fontSize: 40 }
									: { ...styles.inputVehicleCode, fontSize: 18 }
							}
							value={vehicleCode}
							onChangeText={(text) => setVehicleCode(text)}
						/>
					</View>

					<View style={styles.containerScanQRCode}>
						<Image style={styles.QRCodeIcon} source={QRCodeIcon} />
						<Text style={styles.QRCodeText}>Escanear QR-CODE</Text>
					</View>
				</View>
			)}

			<View style={{ ...styles.button }}>
				<WideButton
					onPress={changeTypeOfVehicle}
					textButton={'Continuar'}
					backgroundColor={purple}
				/>
			</View>

			<Text style={styles.message}>
				Esta opção pode ser alterada mais{'\n'} tarde nas{' '}
				<Text style={styles.spotlightWord}>Configurações</Text>
			</Text>
		</View>
	);
}
