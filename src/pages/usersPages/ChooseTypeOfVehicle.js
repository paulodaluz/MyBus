import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

export default function ChooseTypeOfVehicle({ navigation, route }) {
    const [vehicleCode, setVehicleCode] = useState("");

    return (
        <View>
    
            <Text>Escolha o tipo de veículo que você deseja visualizar!</Text>

            <Button
                onPress={console.log('Publico')}
                title="Publico"
            />

            <Button
                onPress={console.log('Privado')}
                title="Privado"
            />
          
            {/* Public Screem */}
            <View>
                <Text>Veículos Públicos que estão a disposição a todos os cidadãos</Text>
            
            </View>

            {/* Private Screem */}
            <View>
                <Text>Veículos Privados, necessitam de um código de acesso</Text>
            
                <TextInput
                    placeholder="Código de seu Veículo"
                    value={vehicleCode}
                    onChangeText={text => setVehicleCode(text)}
                />

                <Text>Escanear QR-CODE</Text>
            </View>
            

            <Button
                onPress={console.log('Privado')}
                title="Continuar"
            />

            <Text>Esta opção pode ser alterada mais tarde nas <Text>Configurações</Text></Text>
        
        </View>
      );
    }