import { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../../components/Themed';
import { api } from '../../utils/api';

type UserT = {
  username: string;
  email: string;
  id: string;
}

export default function AccountScreen() {
  const [user, setUser] = useState<UserT | null>(null);
  
  useEffect(() => {
    async function loadUser() {
      const response = await api.get('/user/me', {
          headers: {
          },
        });
      setUser(response.data);
    }
    // loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://github.com/gabrielforster.png',
          }}
        />
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.3)" />

      <View style={styles.accountContainer} >
        <Text style={styles.username}>gabrielforster</Text>
        <Text style={styles.fullname}>Gabriel Forster</Text>
      </View>
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
});
