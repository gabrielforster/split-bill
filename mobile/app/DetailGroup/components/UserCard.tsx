import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Alert, Pressable, StyleSheet, useColorScheme } from "react-native";
import { View, Text } from "../../../components/Themed";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../utils/api";

export function UserCard({ user, isOwner, onDeleteUser }: any) {
  const router = useRouter();
  const { selectedGroup } = useContext(AuthContext)
  
  async function removeUser() {
    try {
      await api.delete(`/groups/${selectedGroup.id}/users/${user.id}`);
      onDeleteUser()
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))
    }
  }

  function handleRemoveUser() {
    Alert.alert('Remover usuario', `Deseja remover o usuario ${user.username} (${user.fullname})?`, [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Remover',
        onPress: () => removeUser(),
        style: 'destructive'
      }
    ])
  }

  return (
    <View style={styles.container}>
       <View style={styles.userInfo}>
          <Text
            style={styles.fullname}
          >
            {user.fullname}
            { isOwner && ' (Voce)' }
          </Text>
          <Text style={styles.username}>{user.username}</Text>
       </View> 

       <View style={styles.userSummay}>
        <FontAwesome name={ 1200 > 0 ? 'arrow-up' : 'arrow-down'} size={20} color={1200 > 0 ? 'green' : 'red'} />
        <Text
          style={{ 
            color: 1200 > 0 ? 'green' : 'red',
          }}
          
        >
          { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1200) }
        </Text>
       </View>

       <View style={styles.actions}>
          <Pressable onPress={() => handleRemoveUser()}>
            <FontAwesome name="trash" size={20} color="red" />
          </Pressable>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  userInfo: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
  },
  fullname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
  },
  userSummay: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  actions: {
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
