import { View, Text, useColorScheme, StyleSheet, Alert, TextInput, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { api } from '../utils/api';
import { useDebounce } from '../utils/debounce';
import { useRouter } from 'expo-router';

export default function RegisterPage () {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [usernameExists, setUsernameExists] = useState(false);

  const usernameDebounce = useDebounce(fetchUsernameExists, 1000);

  async function handleChangeUsername(event: any) {
    setUsername(event);
    usernameDebounce();
  }

  async function fetchUsernameExists() {
    const res = await api.get(`/user/exists/${username}`);

    if (res.data)
      setUsernameExists(true);
  }

  async function handleRegister () {
    if (password !== passwordConfirmation) {
      Alert.alert('Senha incompativeis!');
      return;
    }

    if (!username || !fullname || !email || !password || !passwordConfirmation || usernameExists ) {
      Alert.alert('Verifique todos os campos!');
      return;
    }

    const res = await api.post('/user/register', {
      username,
      fullname,
      email,
      password,
    });

    if(res.status === 201) {
      Alert.alert(`Registrado com sucesso ${username}!`);
      router.replace('/');
    }
  
    if(res.status === 409) {
      Alert.alert('Usuario ja existe!');
    }

    if(res.status === 500) {
      Alert.alert('Erro interno do servidor!');
    }

    if(res.status === 400) {
      Alert.alert('Erro ao registrar!');
    }
  }

	return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
        <View style={styles.formContainer}>
          <FontAwesome style={styles.icon} name="user" size={80} color={textColor} />

          <View style={styles.inputContainer}>
            <Text style={{ ...styles.inputLabel, color: textColor }}>Digite seu nome de usuario</Text>
            <TextInput
              style={{ ...styles.input, color: textColor, ...(usernameExists ? { borderColor: 'red' } : null) }}
              value={username}
              onChangeText={handleChangeUsername}
              placeholder="Nome de usuario"
            />
            { usernameExists ? <Text style={{ color: 'red' }}>Nome de usuario em uso!</Text> : null }

            <Text style={{ ...styles.inputLabel, color: textColor }}>Digite seu nome completo</Text>
            <TextInput
              style={{ ...styles.input, color: textColor }}
              value={fullname}
              onChangeText={setFullname}
              placeholder="Nome completo"
            />

            <Text style={{ ...styles.inputLabel, color: textColor }}>Digite sua email</Text>
            <TextInput
              style={{ ...styles.input, color: textColor }}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />

            <Text style={{ ...styles.inputLabel, color: textColor }}>Digite sua senha</Text>
            <TextInput
              style={{ ...styles.input, color: textColor }}
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry={true}
            />

            <Text style={{ ...styles.inputLabel, color: textColor }}>Confirme sua senha</Text>
            <TextInput
              style={{ ...styles.input, color: textColor }}
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
              placeholder="Senha"
              secureTextEntry={true}
            />

            <Pressable style={styles.button} onPress={handleRegister}>
              <Text style={{ color: textColor }}>Registrar</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginTop: -140,
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0359af',
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#0359af',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});

