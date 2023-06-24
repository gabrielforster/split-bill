import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useContext, useEffect, useState } from 'react';
import { Image, Alert, Button, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/AuthContext';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const { login, userToken } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function execLogin(){
    login()
    // Alert.alert('Login', `Username: ${username} \nPassword: ${password}`);
  }

  return (
    <View style={styles.container}>
      <FontAwesome style={styles.icon} name="sign-in" size={60} color={textColor} />
      <Text>{ userToken }</Text>

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
      <Pressable style={styles.recover} onPress={() => Alert.alert('Esqueceu a senha?')}>
        <Text>Esqueceu a senha?</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={execLogin}
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
