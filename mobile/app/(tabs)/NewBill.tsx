import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

import { Text, View, TextInput } from '../../components/Themed';
import { AuthContext } from '../../contexts/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { api } from '../../utils/api';
import { usePathname, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function NewBill() {
  const { groups, fetchGroups } = useContext(AuthContext);

  const pathname = usePathname();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const [isLoading, setIsLoading] = useState(false);

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<'income' | 'outcome' | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  
  const [descriptionWarn, setDescriptionWarn] = useState(false);
  const [valueWarn, setValueWarn] = useState(false);
  const [typeWarn, setTypeWarn] = useState(false);
  const [groupWarn, setGroupWarn] = useState(false);

  useEffect(() => {
    if (pathname === '/NewBill') {
      reload()
    }
  }, [pathname]);
  
  async function reload() {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 10));
    setIsLoading(false);
  }

  function groupsFormatted() {
    return groups.map((group: any) => {
      return {
        key: group.id,
        value: group.name,
      }
    })
  }

  function resetStates() {
    setDescription('');
    setValue('');
    setType(null);
    setSelectedGroup(null);

    setDescriptionWarn(false);
    setValueWarn(false);
    setTypeWarn(false);
    setGroupWarn(false);
  }

  async function handleSubmit(){
    if (!description) {
      setDescriptionWarn(true);
      return;
    }
    
    if (!value) {
      setValueWarn(true);
      return;
    }

    if (!type) {
      setTypeWarn(true);
      return;
    }

    if (!selectedGroup) {
      setGroupWarn(true);
      return;
    }

    const data = {
      description,
      amount: Number(value.replace(',', '.')) * 100,
      type,
      groupId: selectedGroup,
    }

    try {
      const res = await api.post('/bills', data)

      Alert.alert('Sucesso', 'Transação criada com sucesso', [{
        text: 'Ok',
        onPress: () => {
          resetStates()
          router.replace('/Home')
        }
      }])
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      Alert.alert('Erro ao criar transação', 'Tente novamente mais tarde')
    } 

  }

  return isLoading 
  ? (
    <ActivityIndicator size='large' />
  )
  : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ ...styles.container, backgroundColor: Colors[colorScheme ?? 'light'].background }}
      >
      <View
        style={styles.inputContainer}
      >
        <Text style={styles.inputLabel}>Descrição</Text>
        <TextInput
          value={description}
          onChangeText={(text) => { setDescriptionWarn(false); setDescription(text) }}
          placeholder='Mercado'
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Valor</Text>
        <TextInput
          placeholder='200.00'
          keyboardType='numeric'
          value={String(value)}
          onChangeText={(text) => { setValueWarn(false); setValue(text) }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tipo</Text>
        <SelectList
          setSelected={setType}
          data={[
            { key: 'income', value: 'Entrada' },
            { key: 'outcome', value: 'Saída' },
          ]}
          placeholder='Selecione o tipo da transação'
          search={false}
          inputStyles={{ color: textColor }}
          boxStyles={{ borderColor: typeWarn ? 'red' : '#0359af', borderWidth: 2, borderRadius: 5, backgroundColor: 'transparent', alignItems: 'center' }}
          dropdownTextStyles={{ color: textColor }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Grupo</Text>
        <SelectList
          setSelected={setSelectedGroup}
          data={groupsFormatted()}
          placeholder='Selecione um grupo'
          search={false}
          inputStyles={{ color: textColor }}
          boxStyles={{ borderColor: groupWarn ? 'red' : '#0359af', borderWidth: 2, borderRadius: 5, backgroundColor: 'transparent', alignItems: 'center' }}
          dropdownTextStyles={{ color: textColor }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Criar</Text>
        </Pressable>
      </View>
     </KeyboardAvoidingView>
   </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    backgroundColor: '#0359af',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
