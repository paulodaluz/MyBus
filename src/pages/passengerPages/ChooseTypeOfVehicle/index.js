import React, { useState, useLayoutEffect } from 'react';
import { Text, View, Button, TextInput, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { updateUserAllInfos, addNewPrivateVehicle } from '../../../backend/users/Passenger';
import QRCodePng from '../../../assets/images/png/qr-code.png';
import { getVehicle } from '../../../backend/vehicles/Vehicle';
import { grey, purple, white } from '../../../styles/colors';
import { styles } from './style';

export default function ChooseTypeOfVehicle({ navigation, route }) {
		const { user } = route.params;
    const [vehicleCode, setVehicleCode] = useState("");
    const [typeOfVehicleToList, setTypeOfVehicleToList] = useState("public");
    const [subtitleMessage, setSubtitleMessage] = useState("");

    const changeTypeOfVehicle = async () => {

        if(typeOfVehicleToList === 'public') {
					await updateUserAllInfos(user.id, null, null, null, typeOfVehicleToList);
				}

        if(typeOfVehicleToList === 'private') {
					const vehicle = await getVehicle({idToPassengers: vehicleCode});
					if(!vehicle || vehicle.is_public === true) {
						return Alert.alert('Código do veículo inálido!');
					}
					await Promise.all([await updateUserAllInfos(user.id, null, null, null, typeOfVehicleToList),
						await addNewPrivateVehicle(user.uid, vehicleCode)]);
				}

        return navigation.navigate('MapPassenger');
    }

    useLayoutEffect(() => {
        if(typeOfVehicleToList === 'public')
            return setSubtitleMessage("Veículos Públicos que estão a disposição a todos os cidadãos");

        if(typeOfVehicleToList === 'private')
            return setSubtitleMessage("Veículos Privados, necessitam de um código de acesso");
    })

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Escolha o tipo de veículo que você deseja visualizar!</Text>
            </View>

            <View style={styles.typeOfVehicle}>
                <TouchableOpacity
                    onPress={() => setTypeOfVehicleToList('public')}
                    style={ typeOfVehicleToList === 'public' ? {...styles.publicButton, backgroundColor:'#E7E9ED'} : {...styles.publicButton, backgroundColor: white} }>
                        <Text style={styles.textPublicButton}>Privado</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setTypeOfVehicleToList('private')}
                    style={ typeOfVehicleToList === 'private' ? {...styles.privateButton, backgroundColor:'#E7E9ED'} : {...styles.privateButton, backgroundColor: white}}>
												<Text style={styles.textPrivateButton}>Privado</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>{subtitleMessage}</Text>
            {
                typeOfVehicleToList === "private" &&

                <View style={styles.privateContainer}>

                    <View style={styles.containerVehicleCode}>
                        <TextInput
                            placeholder="Código de seu Veículo"
                            style={vehicleCode.length > 0 ? {...styles.inputVehicleCode, fontSize: 40, textAlign: "center"} : {...styles.inputVehicleCode, fontSize: 18} }
                            value={vehicleCode}
                            onChangeText={text => setVehicleCode(text)}
                        />
                    </View>
                    <View style={styles.arroundScanQrCode}>
                        <Image
                            style={styles.qrCodePng}
                            source={QRCodePng}
                        />
                        <Text style={styles.scanQrCode}>Escanear QR-CODE</Text>
                    </View>
                </View>
            }
            <View style={{paddingTop: "20%"}}></View>

						<View style={styles.continueButton}>
							<Button
								onPress={changeTypeOfVehicle}
								color={white}
								title="Continuar"
							/>
						</View>

            <Text style={styles.observation}>Esta opção pode ser alterada mais tarde nas <Text style={styles.emphasisWord}>Configurações</Text></Text>

        </View>
    );
}
