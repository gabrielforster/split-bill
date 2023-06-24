import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';

import { Text, View } from '../../components/Themed';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function execRegister(){
    if (password !== confirmPassword){
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    Alert.alert('Register', `Username: ${username} \nPassword: ${password}`);
  }

  return (
    <View style={styles.container}>
      <FontAwesome style={styles.icon} name="user" size={60} color={textColor} />

      <TextInput
        style={{ ...styles.input, color: textColor }}
        value={username}
        onChangeText={setUsername}
        placeholder="Nome de usuario"
      />
      <TextInput
        style={{ ...styles.input, color: textColor }}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <TextInput
        style={{ ...styles.input, color: textColor }}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirme a sua senha"
        secureTextEntry={true}
      />
      <Pressable
        style={styles.button}
        onPress={execRegister}
      >
        <Text
          style={styles.buttonLabel}
        >
          Entrar
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: '80%',
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0359af',
    color: '#fff',
  },
  recover: {
    marginVertical: 10,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '80%',
    margin: 12,
    borderRadius: 10,
    backgroundColor: '#0359af',
  },
  buttonLabel: {
    color: '#fff',
  },
});
