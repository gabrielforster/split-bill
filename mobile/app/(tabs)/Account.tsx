import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { api } from '../../utils/api';

type UserT = {
  username: string;
  email: string;
  id: string;
}

export default function AccountScreen() {
  const [user, setUser] = useState<UserT>({} as UserT);
  
  useEffect(() => {
    async function loadUser() {
      const response = await api.get('/user/me', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYnJpZWxyb2NoYSIsImlhdCI6MTY4NzExNzMwMSwiZXhwIjoxNjg3MTI4MTAxfQ.hVsuog5w6z5idF5ugTQVIFZhlGlDXvu0n0zR0dauYB8'
          },
        });
      setUser(response.data);
      console.log('user', JSON.stringify(response.data, null, 2))
    }
    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>This is your account detail screen</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
