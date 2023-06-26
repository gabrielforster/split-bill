import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image, Pressable, useColorScheme, ActivityIndicator } from 'react-native';

import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, usePathname, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { formatCurrency } from '../../utils';

export default function AccountScreen() {
  const pathname = usePathname();
  const router = useRouter()
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';
  const { logout, userToken, userData: user, fetchUserData } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [summary, setSummary] = useState(0);

  function handleLogout() {
    logout()
    router.replace("/")
  }

  async function fetchUser() {
    setIsLoading(true);
    await fetchUserData()
    setIsLoading(false);
  }

  useEffect(() => {
    if (pathname === '/Account') {
      fetchUser()
    }
  }, [pathname]);

  useEffect(() => {
    if(!user) {
      fetchUserData()
      return
    }
    if (user) {
      setIncome(user.summary.income / 100);
      setOutcome(user.summary.outcome / 100);
      setSummary((user.summary.income - user.summary.outcome) / 100);
    }
  }, [])
  
  return isLoading 
  ? (
    <ActivityIndicator size="large" />
  )
  : (
    <View style={styles.container}>
      <View style={styles.accountContainer} >
        <Text style={styles.fullname}>{user?.fullname}</Text>
        <Text style={styles.username}>{user?.username}</Text>
      </View>

      <View style={styles.month}>
        <Text style={styles.monthLabel}>Resumo desse mês!</Text>
      </View>

      <View style={styles.total}>
        <FontAwesome name={summary >= 0 ? "arrow-up" : "arrow-down"} size={20} color={summary >= 0 ? 'green' : 'red'} />
        <Text
          style={{
            ...styles.totalText,
            color:summary >= 0 ? 'green' : 'red'
          }}
        >
          {formatCurrency(summary)}
        </Text>
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.3)" />

      <View style={styles.values}>
        <View style={styles.income}>
          <FontAwesome name="arrow-up" size={20} color="green" />
          <Text style={styles.incomeValue}>{formatCurrency(income)}</Text>
        </View>
        <View style={styles.outcome}>
          <FontAwesome name="arrow-down" size={20} color="red" />
          <Text style={styles.outcomeValue}>{formatCurrency(outcome)}</Text>
        </View>
      </View>

      <Pressable
        style={styles.invites}
        onPress={() => router.push('/Invites')}
      >
        <Text style={{ color: 'white'}}>
          Meus Convites
        </Text>
      </Pressable>

      <Pressable
        style={styles.logoutButton}
        onPress={() => handleLogout()}
      >
        <Text style={{ color: 'white'}}>
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
    justifyContent: 'center',
  },
  accountContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullname: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 20,
    opacity: 0.6,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  month: {
    marginTop: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  total: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  values: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  income: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  outcome: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outcomeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  invites: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#0359af',
  },
  logoutButton: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#ff0000',
  },
});
