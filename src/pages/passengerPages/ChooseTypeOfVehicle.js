import React, { useState, useLayoutEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { changeTypeOfVehicleToList } from '../../backend/users/Passenger';
import qrCodePng from '../../assets/images/png/qr-code.png';

export default function ChooseTypeOfVehicle({ navigation, route }) {
    const [vehicleCode, setVehicleCode] = useState("");
    const [typeOfVehicleToList, setTypeOfVehicleToList] = useState("public");
    const [subtitleMessage, setSubtitleMessage] = useState("");


    const changeTypeOfVehicle = async() => {
        const { user } = route.params;
        if(typeOfVehicleToList === 'public')
            await changeTypeOfVehicleToList(user, typeOfVehicleToList);

        if(typeOfVehicleToList === 'private')
            await changeTypeOfVehicleToList(user, typeOfVehicleToList, vehicleCode);

        return navigation.navigate('Map')
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
                    style={ typeOfVehicleToList === 'public' ? {...styles.publicButton, backgroundColor:'#E7E9ED'} : {...styles.publicButton, backgroundColor: "#FFFFFF"} }>
                        <Button
                            onPress={() => setTypeOfVehicleToList('public')}
                            color="#8190A5"
                            title="Públicos"
                        />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setTypeOfVehicleToList('private')}
                    style={ typeOfVehicleToList === 'private' ? {...styles.privateButton, backgroundColor:'#E7E9ED'} : {...styles.privateButton, backgroundColor: "#FFFFFF"}}>
                        <Button
                            onPress={() => setTypeOfVehicleToList('private')}
                            color="#8190A5"
                            title="Privado"
                        />
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
                            onChangeText={vehicleCode => setVehicleCode(vehicleCode)}
                        />
                    </View>
                    <View style={styles.arroundScanQrCode}>
                        <Image
                            style={styles.qrCodePng}
                            source={qrCodePng}
                        />
                        <Text style={styles.scanQrCode}>Escanear QR-CODE</Text>
                    </View>
                </View>
            }
            <View style={{paddingTop: "20%"}}></View>
                <View style={styles.continueButton}>
                    <Button
                        onPress={changeTypeOfVehicle}
                        color="#FFFFFF"
                        title="Continuar"
                    />
                
            </View>

            <Text style={styles.observation}>Esta opção pode ser alterada mais tarde nas <Text style={styles.emphasisWord}>Configurações</Text></Text>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: "100%"
    },
    titleBox: {
        height: "38 %",
        width: "100%",
        backgroundColor: "#8257E6",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 40,
        paddingTop: "8%"
    },
    title: {
        color: '#FFFFFF',
        fontSize: 42,
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 90,
    },
    typeOfVehicle: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "6%",
    },
    publicButton: {
        width: "50%",
        alignItems: "center",
        paddingTop: "2%"
    },
    privateButton: {
        width: "50%",
        alignItems: "center",
        paddingTop: "2%"
    },
    subtitle: {
        fontSize: 18,
        color: "#8190A5",
        textAlign: "center",
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    privateContainer: {
        width: "100%",
        alignItems: "center"
    },
    containerVehicleCode: {
        borderWidth: 1,
        borderColor: '#8492A6',
        backgroundColor: "transparent",
        width: "80%",
        height: 60,
    },
    inputVehicleCode: {
        height: "100%",
        paddingLeft: "2%"
    },
    arroundScanQrCode: {
        marginTop: "2%",
        flexDirection: "row",
        width: "80%",
    },
    qrCodePng: {
        display: "flex",
        width: 15,
        height: 15,
        maxWidth: 15,
        marginRight: "1%"
    },
    scanQrCode: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: "#969FAA",
    },
    continueButton: {
        backgroundColor: "#8257E6",
        borderRadius: 14,
        height: "8%",
        width: '85%',
        padding: "4%",
        marginBottom: "3%"
    },
    observation: {
        color: "#969FAA",
        textAlign: "center",
        fontSize: 15,
        paddingTop: "2%",
        paddingLeft: "19%",
        paddingRight: "19%"
    },
    emphasisWord: {
        textDecorationLine: "underline",
        fontWeight: "bold"
    }


})