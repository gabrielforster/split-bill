
import { useURL } from 'expo-linking';
import { usePathname, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { GroupCard } from '../../components/GroupCard';

import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../utils/api';

function GroupsWrapper(groups: any) {
  return groups.length === 0 ? (
        <Text style={styles.title}>Você não está em nenhum grupo</Text>
  ) : (
    <ScrollView style={{ width: '100%'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {
          groups.map((group: any) => {
            return <GroupCard key={group.id} group={group}/>
          })
        }
      </View>
    </ScrollView>
  )
}

export default function TabOneScreen() {
  const pathname = usePathname();

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setGroups: setStoreGroups, setSelectedGroup } = useContext(AuthContext);

  useEffect(() => {
    if (pathname === '/Home') {
      setSelectedGroup(null);
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
