import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function RegisterUser({ navigation, route }) {
  return (
    <View>
        <Button onPress={() => navigation.navigate('InitialPage')} title="InitialPage" />

        <Button onPress={() => navigation.navigate('Map')} title="Map"/>

        <Button onPress={() => navigation.navigate('ChooseTypeOfVehicle')} title="ChooseTypeOfVehicle"/>

        <Button onPress={() => navigation.navigate('Settings')} title="Settings"/>
    </View>
  );
}

const styles = StyleSheet.create({
});
