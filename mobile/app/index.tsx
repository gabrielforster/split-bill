import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { View, Pressable, Text, useColorScheme, StyleSheet, TextInput, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function Login () {
  const colorScheme = useColorScheme()
	const router = useRouter();
  const { userToken, login, loadToken } = useContext(AuthContext);
  const textColor = colorScheme === 'dark' ? 'white' : 'black';
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

	const handleLogin = () => {
    login(username, password)
	};

  useEffect(() => {
      if (userToken) {
        router.replace('/Home');
        return
      }
  }, [userToken])


	return (
    <View style={styles.container}>
      <FontAwesome style={styles.icon} name="sign-in" size={60} color={textColor} />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ ...styles.inputLabel, color: textColor }}>Digite seu nome de usuario</Text>
          <TextInput
            style={{ ...styles.input, color: textColor }}
            value={username}
            onChangeText={setUsername}
            placeholder="Nome de usuario"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ ...styles.inputLabel, color: textColor }}>Digite sua senha</Text>
          <TextInput
          style={{ ...styles.input, color: textColor }}
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
              secureTextEntry={true}
            />
        </View>
      </View>
      <Pressable style={styles.recover} onPress={() => Alert.alert('Esqueceu a senha?')}>
        <Text style={{ color: textColor }}>Esqueceu a senha?</Text>
      </Pressable>
			<Link href="/register" asChild>
				<Pressable 
          style={{ 
            ...styles.button,
            backgroundColor: 'transparent',
            borderColor: '#0359af',
            borderWidth: 2
          }}
        >
					<Text
            style={styles.buttonLabel}
          >
            Criar conta
          </Text>
				</Pressable>
			</Link>
      <Pressable
        style={styles.button}
        onPress={() => handleLogin() }
      >
        <Text
          style={styles.buttonLabel}
        >
          Entrar
        </Text>
      </Pressable>

    </View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  inputLabel: {
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: '100%',
    padding: 10,
    borderWidth: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
