import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../utils/api';
import { useRouter } from 'expo-router';

type UserT = {
  username: string;
  email: string;
  id: string;
}

export default function AccountScreen() {
  const router = useRouter()
  const { logout, userToken } = useContext(AuthContext);

  function handleLogout() {
    logout()
    router.replace("/")
  }

  const user = {
      username: "gabrielforster",
      name: "Gabriel Rocha",
      email: "rochafrgabriel@gmail.com",
      profileImage: "https://github.com/gabrielforster.png"
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: user.profileImage,
          }}
        />
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.3)" />

      <View style={styles.accountContainer} >
        <Text style={styles.username}>{user.username + '|' + userToken}</Text>
        <Text style={styles.fullname}>{user.name}</Text>
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={() => handleLogout()}
      >
        <Text>
          Sair
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileContainer: {
    marginTop: 40,
    width: '100%',
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  accountContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  fullname: {
    fontSize: 20,
    opacity: 0.6,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logoutButton: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ff0000',
  },
});
