import { Screen } from '../../../components/commonComponents/Screen';
import { useLayoutEffect, useState } from 'react';
import { Alert, Image, Text, useWindowDimensions, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import BusinessImage from '../../../assets/images/png/business-deal-cuate.png';
import BusStopImage from '../../../assets/images/png/bustop-cuate.png';
import { getSession, getUserOnFirebase } from '../../../backend/Login';
import { WideButton } from '../../../components/WideButton';
import { darkGrey, purple } from '../../../styles/colors';
import { styles } from './style';

export function getWelcomeLayout(windowHeight, windowWidth) {
	const isCompact = windowHeight < 600 || windowWidth < 360;
	return {
		gap: isCompact ? 4 : 12,
		imageHeight: Math.min(windowHeight * (isCompact ? 0.19 : 0.25), 300),
		headerPaddingTop: Math.min(windowWidth * 0.1, windowHeight * 0.03),
		titleFontSize: Math.min(70, windowWidth * 0.155),
		subtitleFontSize: Math.min(24, windowWidth * 0.055),
		dividerPaddingVertical: isCompact ? 4 : 10,
		messagePaddingVertical: Math.min(windowWidth * 0.03, 16),
	};
}

export default function InitialPage({ navigation }) {
	const [typeUserPage, setTypeUserPage] = useState('passenger');
	const { height: windowHeight, width: windowWidth } = useWindowDimensions();
	const welcomeLayout = getWelcomeLayout(windowHeight, windowWidth);

	useLayoutEffect(() => {
		async function checkIfHasSession() {
			const uidUser = await getSession();

			if (typeof uidUser === 'string' && uidUser) {
				const user = await getUserOnFirebase(uidUser);
				if (!user?.uid) {
					return;
				}

				if (user.isPassenger) {
					return navigation.navigate('MapPassenger', { user });
				}
				return navigation.navigate('MapCompany', { user });
			}
		}

		checkIfHasSession().catch(() =>
			Alert.alert('Não foi possível restaurar a sessão. Faça login novamente.')
		);
	}, [navigation]);

	return (
		<Screen style={{ gap: welcomeLayout.gap }}>
			<View style={[styles.header, { paddingTop: welcomeLayout.headerPaddingTop }]}>
				{typeUserPage === 'passenger' ? (
					<Image
						style={[styles.imageHeader, { height: welcomeLayout.imageHeight }]}
						source={BusStopImage}
					/>
				) : (
					<Image
						style={[
							styles.imageHeader,
							styles.businessImage,
							{ height: welcomeLayout.imageHeight },
						]}
						source={BusinessImage}
					/>
				)}
			</View>

			<View style={styles.titles}>
				<Text style={[styles.mainTitle, { fontSize: welcomeLayout.titleFontSize }]}>MyBus</Text>
				<Text
					onPress={() => {
						typeUserPage === 'passenger'
							? setTypeUserPage('company')
							: setTypeUserPage('passenger');
					}}
					style={[styles.subTitle, { fontSize: welcomeLayout.subtitleFontSize }]}
				>
					{typeUserPage === 'passenger' ? 'Passageiro' : 'Empresas'}
				</Text>
			</View>

			<View
				style={[styles.containerDivider, { paddingVertical: welcomeLayout.dividerPaddingVertical }]}
			>
				<View style={styles.divider}>
					<View
						style={
							typeUserPage === 'passenger'
								? [styles.activeDivider, styles.passengerDivider]
								: [styles.activeDivider, styles.companyDivider]
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
					<Text style={[styles.message, { paddingVertical: welcomeLayout.messagePaddingVertical }]}>
						Para continuar faça seu Login ou{'\n'}Cadastre-se
					</Text>

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
		</Screen>
	);
}
