import { FontAwesome } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import { api } from '../utils/api';

export default function Invites() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState([]);

  async function handleAcceptInvite(inviteId: string) {
    try {
      setIsLoading(true);
      const res = await api.post(`/groups/invites/${inviteId}/accept`);
      Alert.alert('Convite aceito com sucesso!')   
    } catch (error) {
      Alert.alert('Ocorreu um erro ao aceitar o convite, tente novamente mais tarde.')
    } finally {
      setIsLoading(false);
      fetchUserInvites()
    }
  }

  async function handleRejectInvite(inviteId: string) {
    try {
      setIsLoading(true);
      const res = await api.post(`/groups/invites/${inviteId}/decline`);
      console.log(res.data)
      Alert.alert('Convite rejeitado com sucesso!', '', [{ text: 'Ok', onPress: () => { fetchUserInvites() }}])
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchUserInvites() {
    try {
      setIsLoading(true);
      const res = await api.get('/groups/invites');
      setInvites(res.data);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      Alert.alert('Ocorreu um erro ao buscar seus convites, tente novamente mais tarde.', '', [{ text: 'Ok', onPress: () => { router.back() }}])
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (pathname === '/Invites') {
      fetchUserInvites()
    }
  }, [pathname])

  return isLoading 
  ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )
  : (
    <View style={styles.container}>
      { invites.length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.noInvites}>Voce nao possui convites</Text>
        </View>
      )}
      { invites.map((invite: any) => (
        <View key={invite.id} style={styles.inviteContainer}>
          <View style={styles.invite}>
            <Text style={styles.inviteName}>{invite.Group.name}</Text>
            <Text style={styles.inviteDescription}>{invite.Group.description}</Text>
          </View>

          <View style={styles.inviteActions}>
            <Pressable
              style={styles.inviteAction}
              onPress={() => handleAcceptInvite(invite.id)}
            >
              <FontAwesome name="check" size={20} color="green" />
            </Pressable>
            <Pressable
              style={styles.inviteAction}
              onPress={() => handleRejectInvite(invite.id)}
            >
              <FontAwesome name="times" size={20} color="red" />
            </Pressable>
          </View>
        </View>
      ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 20,
  },
  noInvites: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ccc'
  },
  inviteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    padding: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    marginBottom: 20,
    borderWidth: 1,
  },
  invite: {
    justifyContent: 'center',
    width: '70%',
  },
  inviteName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inviteDescription: {
    fontSize: 16,
    color: '#666'
  },
  inviteActions: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inviteAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

