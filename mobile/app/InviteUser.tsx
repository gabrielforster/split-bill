import { AxiosError } from "axios";
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

  async function handleInvite () {
    if (!username) {
      Alert.alert('Digite um nome de usuario');
      return;
    }
    try {
      const res = await api.post(`/groups/${selectedGroup.id}/users/invite/${username}`)
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
    }

    Alert.alert('Usuario convidado com sucesso!', '', [{ text: 'OK', onPress: () => router.back() }]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome de usuario</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Nome de usuario"
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
