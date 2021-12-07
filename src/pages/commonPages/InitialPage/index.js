import React, { useLayoutEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import BusinessImage from '../../../assets/images/png/business-deal-cuate.png';
import BusStopImage from '../../../assets/images/png/bustop-cuate.png';
import { getSession } from '../../../backend/Login';
import { WideButton } from '../../../components/WideButton';
import { getUser } from '../../../service/UserService';
import { darkGrey, purple } from '../../../styles/colors';
import { styles } from './style';

export default function InitialPage({ navigation }) {
	const [typeUserPage, setTypeUserPage] = useState('passenger');

	async function checkIfHasSession() {
		const uidUser = await getSession();

		if (uidUser) {
			const user = await getUser(uidUser);

			if (user.isPassenger) {
				return navigation.navigate('MapPassenger', { user });
			}
			return navigation.navigate('MapCompany', { user });
		}
	}

	useLayoutEffect(() => {
		checkIfHasSession();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				{typeUserPage === 'passenger' ? (
					<Image style={styles.imageHeader} source={BusStopImage} />
				) : (
					<Image style={{ ...styles.imageHeader, padding: 10 }} source={BusinessImage} />
				)}
			</View>

			<View style={styles.titles}>
				<Text style={styles.mainTitle}>MyBus</Text>
				<Text
					onPress={() => {
						typeUserPage === 'passenger'
							? setTypeUserPage('company')
							: setTypeUserPage('passenger');
					}}
					style={styles.subTitle}
				>
					{typeUserPage === 'passenger' ? 'Passageiro' : 'Empresas'}
				</Text>
			</View>

			<View style={styles.containerDivider}>
				<View style={styles.divider}>
					<View
						style={
							typeUserPage === 'passenger'
								? { ...styles.activeDivider, right: '50%' }
								: { ...styles.activeDivider, left: '50%' }
						}
					/>
				</View>
			</View>

			<View style={styles.body}>
				<GestureRecognizer
					style={styles.gestureContainer}
					onSwipeLeft={() => setTypeUserPage('company')}
					onSwipeRight={() => setTypeUserPage('passenger')}
				>
					<Text style={styles.message}>Para continuar faça seu Login ou{'\n'}Cadastre-se</Text>

					<View style={styles.button}>
						<WideButton
							onPress={() => navigation.navigate('Login')}
							textButton={'Login'}
							style={styles.button}
							backgroundColor={purple}
						/>
					</View>

					<View style={styles.button}>
						<WideButton
							onPress={() =>
								typeUserPage === 'passenger'
									? navigation.navigate('RegisterPassenger')
									: navigation.navigate('RegisterCompany')
							}
							textButton={'Cadastre-se'}
							style={styles.button}
							backgroundColor={darkGrey}
						/>
					</View>

					<View style={typeUserPage === 'company' ? styles.button : null}>
						{typeUserPage === 'company' ? (
							<WideButton
								onPress={() => navigation.navigate('LoginDriver')}
								textButton={'Login do Motorista'}
								style={styles.button}
								backgroundColor={purple}
							/>
						) : null}
					</View>
				</GestureRecognizer>
			</View>
		</View>
	);
}
