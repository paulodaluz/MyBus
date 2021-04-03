import React from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

export default function AllPages({ navigation, route }) {
  return (
    <View>
				<FlatList
					data={[
						{key: 'InitialPage'},
						{key: 'MapCompany'},
						{key: 'MapPassenger'},
						{key: 'ChooseTypeOfVehicle'},
						{key: 'SettingsPassenger'},
						{key: 'SettingsCompany'},
						{key: 'CreateNewVehicle'},
						{key: 'AskShowVehicleCode'},
						{key: 'ShowVehicleCode'},
						{key: 'ListVehicleInfosCompany'},
						{key: 'EditVehicle'},
						{key: 'ForgotMyPassword'},
						{key: 'ListMyLinkedVehicles'},
						{key: 'SettingsDriver'},
						{key: 'MapDriver'},
						{key: 'LoginDriver'},
					]}
					renderItem={({item}) => <Button onPress={() => navigation.navigate(item.key)} title={item.key}/>}
				/>
    </View>
  );
}

const styles = StyleSheet.create({
});
