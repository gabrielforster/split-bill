import { useRouter } from "expo-router";
import { createContext, FC, useState } from "react";
import {  Alert } from "react-native";
import { setItemAsync, getItemAsync }  from "expo-secure-store"
import { api } from "../utils/api";

type User = {
  username: string
  name: string
  email: string
  id: string
}

export const AuthContext = createContext<{
  login: (username: string, password: string) => Promise<void>,
  logout: () => void,
  getUserToken: () => Promise<string | null>,
  fetchUserData: () => Promise<void>,
  loadToken: () => Promise<void>,
  userToken: null | string,
  userData: User | null 
}>({
    login: (username, password) => new Promise(() => {}),
    logout: () => {},
    getUserToken: async () => '',
    fetchUserData: async () => {},
    loadToken: async () => {},
    userToken: null,
    userData: null,
});

export function AuthProvider({ children }: { children: JSX.Element }) {
  const router = useRouter();
  
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  async function loadToken () {
    const token = await getItemAsync('userToken');
    api.defaults.headers.Authorization = 'Bearer ' + token;
    setUserToken(token);
  }


  async function login (username: string, password: string): Promise<void> {
    const res = await api.post('/auth/login', {
      username,
      password
    });

    if (res.status === 201) {
      const { data: { data, Authorization} } = res;
      api.defaults.headers.Authorization = 'Bearer ' + Authorization;
      setUserData(data);
      setUserToken(Authorization);

      await setItemAsync('userToken', Authorization);

      return 
    }

    Alert.alert('Usuario ou senha incorreta');
  }

  async function logout () {
    setUserToken(null);
    await setItemAsync('userToken', '');
  }

  async function getUserToken () {
    const token = await getItemAsync('userToken');
    return token
  }

  async function fetchUserData () {
    if (!userToken) 
      router.replace('/');
    const res = await api.get('/user/me');

    if (res.status === 200) {
      const { data } = res;
      setUserData(data);
    }

    if (res.status === 401) {
      Alert.alert('Sessão expirada!');
      router.replace('/');
    }
  }


  return (
    <AuthContext.Provider value={{ login, logout, userToken, getUserToken, userData, fetchUserData, loadToken }}>
      { children }
    </AuthContext.Provider>
  )
}
