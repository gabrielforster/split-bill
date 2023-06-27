import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, useColorScheme } from "react-native";
import { View, Text } from "../../../components/Themed";
import { AuthContext } from "../../../contexts/AuthContext";
import { formatCurrency } from "../../../utils";
import { api } from "../../../utils/api";

export function UserCard({ user, isMe, onDeleteUser }: any) {
  const router = useRouter();
  const { selectedGroup } = useContext(AuthContext)

  const [summary, setSummary] = useState(0);
  
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

  useEffect(() => {
    setSummary((user.summary.income - user.summary.outcome) / 100)
  }, [])

  return (
    <View style={styles.container}>
       <View style={styles.userInfo}>
          <Text
            style={styles.fullname}
          >
            {user.fullname}
            { isMe && ' (Voce)' }
          </Text>
          <Text style={styles.username}>{user.username}</Text>
       </View> 

       <View style={styles.userSummay}>
        <FontAwesome name={ summary >= 0 ? 'arrow-up' : 'arrow-down'} size={20} color={summary >= 0 ? 'green' : 'red'} />
        <Text
          style={{ 
            color: summary >= 0 ? 'green' : 'red',
          }}
          
        >
          { formatCurrency(Math.abs(summary)) }
        </Text>
       </View>

       <View style={styles.actions}>
          <Pressable onPress={() => handleRemoveUser()}>
            <FontAwesome name="user-times" size={20} color="red" />
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
    fontSize: 18,
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
