import { View, Text } from '../../components/Themed';
import React, { useContext, useEffect, useState } from 'react';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { api } from '../../utils/api';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { UserCard } from './components/UserCard';
import { AuthContext } from '../../contexts/AuthContext';
import Colors from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { formatCurrency } from '../../utils';

export default function DetailGroup (){
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { id } = useSearchParams()
  const { userData, setSelectedGroup } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true)
  const [group, setGroup] = useState<any>(null)
  const [users, setUsers] = useState<any>(null)
  const [owner, setOwner] = useState<any>(null)
  const [summaryData, setSummaryData] = useState<any>(null)
  const [bills, setBills] = useState<any>(null)

  async function fetchGroup() {
    try {
      const res = await api.get(`/groups/${id}`)
      setGroup(res.data)
      setUsers(res.data.users)
      setOwner(res.data.users.find((user: any) => user.id === res.data.createdBy))
      setSummaryData(res.data.summary.group)
      setSelectedGroup(res.data)
    } catch (err) {
      Alert.alert('Erro ao carregar dados do grupo', 'Tente novamente mais tarde! Iremos te redirecionar para a lista de grupos')
      console.error(err)
    }
  }

  async function fetchGroupBills() {
    try {
      const res = await api.get(`/bills/${id}`)
      setBills(res.data)
    } catch (err) {
      Alert.alert('Erro ao carregar dados do grupo', 'Tente novamente mais tarde! Iremos te redirecionar para a lista de grupos')
      router.replace('/Home')
      console.error(err)
    } 
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      await fetchGroup()
      await fetchGroupBills()
      setIsLoading(false)
    }
    loadData()
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
		<View style={{ ...styles.container, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <Stack.Screen options={{ headerTitle: group.name }} />
      <View style={styles.group}>
        <Text>
          Criado por: { owner?.fullname }
        </Text>

         { group.description &&
           <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              marginTop: 10,
              marginBottom: -20,
            }}
            >
              { group.description }
            </Text> 
        }
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.3)" />

      <View style={styles.summary}>
        <Text style={styles.title}>Saldo do grupo</Text>
        <View style={styles.total}>
          <FontAwesome
            name={summaryData.income > summaryData.outcome ? 'arrow-up' : 'arrow-down'}
            size={24}
            color={(summaryData.income - summaryData.outcome) > 0 ? 'green' : 'red'}
          />
          <Text
            style={{
              ...styles.totalText,
              color: (summaryData.income - summaryData.outcome) > 0 ? 'green' : 'red'
            }}
          >
            { formatCurrency((summaryData.income - summaryData.outcome) / 100)}
          </Text>
        </View>
     </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.3)" />
      
      <View style={styles.header}>
        <Text
          style={styles.title}
        >
          {bills?.length ?? 0}
        </Text>
        <Text
          style={{ ...styles.title, marginLeft: 5 }}
        >
          Transações
        </Text>
      </View>
      <ScrollView style={{ width: '100%'}}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          { bills?.map((bill: any) => (
            <View
              key={bill.id}
              style={styles.bill}
            >
              <Text
                style={styles.billDescription}
              >
                { bill.description }
              </Text>
              <Text
                style={{ ...styles.billAmount, color: bill.type === 'outcome' ? 'red' : 'green' }}
              >
                { formatCurrency(bill.amount / 100) }
              </Text>
            </View>
          )) }
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  group: {
    marginTop: 20,
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  summary: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText: {
    marginLeft: 10,
    fontSize: 40,
  },
  users: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  bill: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  billDescription: {
    fontSize: 16,
    fontWeight: '700',
  },
  billAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
});

