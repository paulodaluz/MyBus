import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function InitialPage({ navigation, route }) {
  return (
    <View>
        <Text>MyBus</Text>

        <Text>Para continuar faça seu Login ou Cadastre-se</Text>

      <View>
        <Button
          onPress={() => navigation.navigate('Login')}
          title="Login"
        />
      </View>

      <View>
        <Button
          onPress={() => navigation.navigate('RegisterUser')}
          title="Cadastrar Usuário"
        />
      </View>

      <View>
        <Button
          onPress={() => navigation.navigate('RegisterCompany')}
          title="Cadastrar Empresa"
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
});
