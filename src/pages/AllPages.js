import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function RegisterUser({ navigation, route }) {
  return (
    <View>

        <Button onPress={() => navigation.navigate('InitialPage')} title="InitialPage" />

        <Button onPress={() => navigation.navigate('Login')} title="Login" />

        <Button onPress={() => navigation.navigate('RegisterUser')} title="RegisterUser"/>

        <Button onPress={() => navigation.navigate('RegisterCompany')} title="RegisterCompany"/>
        
        <Button onPress={() => navigation.navigate('Map')} title="Map"/>
      
        <Button onPress={() => navigation.navigate('ChooseTypeOfVehicle')} title="ChooseTypeOfVehicle"/>
    </View>
  );
}

const styles = StyleSheet.create({
});
