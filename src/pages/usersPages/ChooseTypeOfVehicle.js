import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { changeTypeOfVehicleToList } from '../../backend/Users/User';

export default function ChooseTypeOfVehicle({ navigation, route }) {
    const [vehicleCode, setVehicleCode] = useState("");
    const [typeOfVehicleToList, setTypeOfVehicleToList] = useState("");

    const changeTypeOfVehicle = async() => {
        const { user } = route.params;

        if(typeOfVehicleToList === 'public')
            await changeTypeOfVehicleToList(user, typeOfVehicleToList);
            
        if(typeOfVehicleToList === 'private')
            await changeTypeOfVehicleToList(user, typeOfVehicleToList, vehicleCode);
        
        return navigation.navigate('ChooseTypeOfVehicle')
    }

    return (
        <View>
    
            <Text>Escolha o tipo de veículo que você deseja visualizar!</Text>

            <Button
                onPress={() => setTypeOfVehicleToList('public')}
                title="Publico"
            />

            <Button
                onPress={() => setTypeOfVehicleToList('private')}
                title="Privado"
            />
          
            <View>
                <Text>Veículos Públicos que estão a disposição a todos os cidadãos</Text>
            
            </View>

            <View>
                <Text>Veículos Privados, necessitam de um código de acesso</Text>
            
                <TextInput
                    placeholder="Código de seu Veículo"
                    value={vehicleCode}
                    onChangeText={vehicleCode => setVehicleCode(vehicleCode)}
                />

                <Text>Escanear QR-CODE</Text>
            </View>
            

            <Button
                onPress={changeTypeOfVehicle}
                title="Continuar"
            />

            <Text>Esta opção pode ser alterada mais tarde nas <Text>Configurações</Text></Text>
        
        </View>
    );
}

const styles = StyleSheet.create({})