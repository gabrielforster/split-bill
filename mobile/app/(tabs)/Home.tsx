
import { useURL } from 'expo-linking';
import { usePathname, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { GroupCard } from '../../components/GroupCard';

import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../utils/api';

function GroupsWrapper(groups: any) {
  return groups.length === 0 ? (
    <Text style={styles.title}>Você não está em nenhum grupo</Text>
  ) : (
      groups.map((group: any) => {
        return <GroupCard key={group.id} group={group}/>
      })
  )
}

export default function TabOneScreen() {
  const url = useURL();
  const pathname = usePathname();

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setGroups: setStoreGroups } = useContext(AuthContext);

  useEffect(() => {
    if (pathname === '/Home') {
      fetchGroups()
    }
  }, [pathname]);

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const res = await api.get('/groups');
      setGroups(res.data);
      setStoreGroups(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Grupos!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {
        isLoading 
        ? <ActivityIndicator size="large" />
        : GroupsWrapper(groups)
      }
    </View>
  );
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
