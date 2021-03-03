import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function RegisterUser({ navigation, route }) {
  return (
    <View>

      <View>
        <Button
          onPress={() => navigation.navigate('Login')}
          title="Login"
        />
      </View>

      <View>
        <Button
          onPress={() => navigation.navigate('RegisterUser')}
          title="Cadastrar"
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
});
