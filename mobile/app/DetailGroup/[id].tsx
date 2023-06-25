import { View, Text } from '../../components/Themed';
import React, { useContext, useEffect, useState } from 'react';
import { Stack, useSearchParams } from 'expo-router';
import { api } from '../../utils/api';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { UserCard } from './components/UserCard';
import { AuthContext } from '../../contexts/AuthContext';

export default function DetailGroup (){
  const { id } = useSearchParams()

  const { userData } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true)
  const [group, setGroup] = useState<any>(null)
  const [users, setUsers] = useState<any>(null)
  const [owner, setOwner] = useState<any>(null)

  async function fetchGroup() {
    try {
      setIsLoading(true)
        const res = await api.get(`/groups/${id}`)
        setGroup(res.data.group)
        setUsers(res.data.users)
        setOwner(res.data.users.find((user: any) => user.id === res.data.group.createdBy))
    } catch (err) {
      Alert.alert('Erro ao carregar dados do grupo', 'Tente novamente mais tarde! Iremos te redirecionar para a lista de grupos')
        console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGroup()
  }, [])

  if (isLoading) return (
    <View
      style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
      }}
    >
      <Stack.Screen options={{ headerTitle: 'Carregando...' }} />
      <ActivityIndicator size="large" />
    </View>
  )

	return (
		<View style={styles.container}>
      <Stack.Screen options={{ headerTitle: group.name }} />
      <View style={styles.group}>
        <Text>
          Criado por: { owner?.fullname }
        </Text>
        
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            marginTop: 10,
          }}
        >
          { group.description }
        </Text>
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.3)" />

      <View style={styles.users}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          Usuários
        </Text>

        { users && users.map((user: any) => <UserCard key={user.id} user={user} isOwner={userData?.id === user.id} onDeleteUser={fetchGroup} />)}
      </View>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    marginTop: 20,
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  users: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

