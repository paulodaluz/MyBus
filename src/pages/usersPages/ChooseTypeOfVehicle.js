import React, { useState, useLayoutEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { changeTypeOfVehicleToList } from '../../backend/Users/User';

export default function ChooseTypeOfVehicle({ navigation, route }) {
    const [vehicleCode, setVehicleCode] = useState("");
    const [typeOfVehicleToList, setTypeOfVehicleToList] = useState("public");
    const [subtitleMessage, setSubtitleMessage] = useState("");


    const changeTypeOfVehicle = async() => {
        const { user } = route.params;
        console.log("Pualera", {user})
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
                <View style={styles.publicButton}>
                    <Button
                        onPress={() => setTypeOfVehicleToList('public')}
                        color="#8190A5"
                        title="Públicos"
                    />
                </View>

                <View style={styles.privateButton}>
                    <Button
                        onPress={() => setTypeOfVehicleToList('private')}
                        color="#8190A5"
                        title="Privado"
                    />
                </View>
            </View>
            <Text style={styles.subtitle}>{subtitleMessage}</Text>
            {
                typeOfVehicleToList === "private" &&
            
                <View style={styles.privateContainer}>

                    <View style={styles.vehicleCode}>
                        <TextInput
                            placeholder="Código de seu Veículo"
                            value={vehicleCode}
                            onChangeText={vehicleCode => setVehicleCode(vehicleCode)}
                        />
                    </View>

                    <Text style={styles.scanQrCode}>Escanear QR-CODE</Text>
                </View>
            }
            
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
    },
    publicButton: {
        paddingRight: "25%",
        
    },
    privateButton: {
        
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
        alignItems: "center",
        paddingBottom: "1%"
    },
    vehicleCode: {
        borderWidth: 1,
        borderColor: '#8492A6',
        backgroundColor: "transparent",
        width: "80%",
        height: "20%",
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