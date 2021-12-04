import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import QRCodeIcon from '../../../assets/icons/png/qr_code.png';
import { createSession } from '../../../backend/Login';
import { WideButton } from '../../../components/WideButton';
import * as authService from '../../../service/AuthService';
import { registerUser } from '../../../service/UserService';
import { purple } from '../../../styles/colors';
import { Header } from './Header';
import { styles } from './style';
import { SwitchCase } from './SwitchCase';

export default function ChooseTypeOfVehicle({ navigation, route }) {
	const { name, email, password } = route.params;

	const [vehicleCode, setVehicleCode] = useState('');
	const [typeOfVehicleToList, setTypeOfVehicleToList] = useState('public');
	const [subtitleMessage, setSubtitleMessage] = useState('');

	const changeTypeOfVehicle = async () => {
		let linkedVehicles = [];

		if (typeOfVehicleToList === 'private') {
			//TODO VERIFICAR SE VEICULO EXISTE
			linkedVehicles.push(vehicleCode);
		}

		const registeredAuthenticationUser = await authService
			.register(email, password)
			.catch((error) => {
				throw error;
			});

		const uid = registeredAuthenticationUser.user.uid;

		await registerUser(email, name, true, uid, [vehicleCode]);

		await createSession(uid);

		const user = { uid, email, name, linkedVehicles: [vehicleCode] };

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
