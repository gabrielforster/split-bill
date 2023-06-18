import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { api } from '../../utils/api';

function GroupsCard({ group }: any) {
  return (
    <View>
      <Text style={styles.title}>{group.Group.name}</Text>
      <Text>{group.Group.description}</Text>
    </View>
  )
}

export default function TabOneScreen() {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function loadGroups() {
      console.log('loadGroups')
      const response = await api.get('/groups', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYnJpZWxyb2NoYSIsImlhdCI6MTY4NzExNzMwMSwiZXhwIjoxNjg3MTI4MTAxfQ.hVsuog5w6z5idF5ugTQVIFZhlGlDXvu0n0zR0dauYB8'
          },
        });
      setGroups(response.data);
      console.log(JSON.stringify(groups, null, 2));
    }
    loadGroups();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Grupos!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {
        groups.map((group: any) => {
            console.log('sdasdasdas', group);
            return <GroupsCard key={group.id} group={group} />
          }
        )
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
