import { useRouter, useSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import { View, Text, TextInput } from "../components/Themed";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../utils/api";
import { useDebounce } from "../utils/debounce";

export default function InviteUser() {
  const router = useRouter();
  const { selectedGroup } = useContext(AuthContext)

  const [username, setUsername] = useState('')

  async function fetchUsernameExists() {
    const res = await api.get(`/user/exists/${username}`);

    return res.data;
  }

  async function handleInvite () {
    if (!username) {
      Alert.alert('Digite um nome de usuário valido!');
      return;
    }

    const usernameExists = await fetchUsernameExists();
    if (!usernameExists) {
      Alert.alert('Usuário nao existe!');
      return;
    }

    try {
      const res = await api.post(`/groups/${selectedGroup.id}/users/invite/${username}`)
      Alert.alert('Usuário convidado com sucesso!', '', [{ text: 'OK', onPress: () => router.back() }]);
    } catch (err) {
      Alert.alert('Ocorreu um erro ao convidar o usuário, tente novamente mais tarde.', 'Verifique se o usuário ja nao esta no grupo.')
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome de usuário</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Nome de usuário"
        />
      </View>

      <Pressable style={styles.button} onPress={handleInvite}>
        <Text style={styles.buttonText}>Convidar</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  inputContainer: {
    marginTop: 200,
    width: "80%",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0359af",
    paddingHorizontal: 10,
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#0359af",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
