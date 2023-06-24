import { Pressable, useColorScheme, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { View, Text, TextInput } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { api } from '../utils/api';
import { useRouter } from 'expo-router';
import { AxiosError } from 'axios';

export default function CreateGroup () {
  const router = useRouter();
  const colorScheme = useColorScheme()
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupNameWarn, setGroupNameWarn] = useState(false);

  async function handleCreate() {
    if (groupName === '') {
      setGroupNameWarn(true)
      return
    }

    try {
       await api.post('/groups', {
        name: groupName,
        description: groupDescription,
      })

      Alert.alert('Grupo criado com sucesso!', 'Você será redirecionado para a tela de grupos', [
        {
          text: 'Ok',
          onPress: () => {
            router.replace('/Home')
          }
        }
      ]) 
    } catch (err) {
      const error = JSON.parse(JSON.stringify(err)) as AxiosError
      console.error(error)
      Alert.alert('Erro ao criar grupo', 'Tente novamente mais tarde')
    }

  }

	return (
    <View style={styles.container}>
      
      <FontAwesome style={styles.icon} name="users" size={60} color={textColor} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Digite um nome para o grupo</Text>
        <TextInput
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Groupo do futebol"
          warn={groupNameWarn}
          warnMessage='Nome do grupo não pode ser vazio'
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Digite uma descrição para o grupo</Text>
        <TextInput
          value={groupDescription}
          onChangeText={setGroupDescription}
          placeholder="Grupo dividir as contas do futebol"
        />
      </View>
      
      <Pressable style={styles.submit} onPress={handleCreate}>
        <Text style={{ color: textColor }}>Criar</Text>
      </Pressable>
    </View>
	);
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
  },
  submit: {
    width: '80%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0359af',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  }
})
