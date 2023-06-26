
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import { View, Text } from "../components/Themed";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../utils/api";
import { UserCard } from "./DetailGroup/components/UserCard";

export default function ListGroupUsers() {
  const { selectedGroup, fetchGroup } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const [isLoading, setIsLoading] = useState(false);

  async function handleRemoveUser() {
    setIsLoading(true);
    try {
      await fetchGroup()
    } finally {
      setIsLoading(false);
    }
  }

  return isLoading
  ? ( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View> )
  : (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      { selectedGroup.users && selectedGroup.users.map((user: any) => <UserCard key={user.id} user={user} isOwner={selectedGroup.createdBy === user.id} onDeleteUser={handleRemoveUser} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  invite: {
    height: 70,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'column',
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inviteFullname: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inviteUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
