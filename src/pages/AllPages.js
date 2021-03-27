import React from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

export default function AllPages({ navigation, route }) {
  return (
    <View>
				<FlatList
					data={[
						{key: 'InitialPage'},
						{key: 'Map'},
						{key: 'ChooseTypeOfVehicle'},
						{key: 'SettingsPassenger'},
						{key: 'SettingsCompany'},
						{key: 'CreateNewVehicle'},
						{key: 'AskShowVehicleCode'},
						{key: 'ShowVehicleCode'},
					]}
					renderItem={({item}) => <Button onPress={() => navigation.navigate(item.key)} title={item.key}/>}
				/>
    </View>
  );
}

const styles = StyleSheet.create({
});
