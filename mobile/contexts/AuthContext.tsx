import { useRouter } from "expo-router";
import { createContext, FC, useState, useEffect, Dispatch } from "react";
import {  Alert } from "react-native";
import { setItemAsync, getItemAsync }  from "expo-secure-store"
import { api } from "../utils/api";
import { AxiosError } from "axios";

type User = {
  username: string
  fullname: string
  email: string
  id: string
  summary: {
    income: number
    outcome: number
  }
}

export const AuthContext = createContext<{
  login: (username: string, password: string) => Promise<void>,
  logout: () => void,
  getUserToken: () => Promise<string | null>,
  fetchUserData: () => Promise<void>,
  loadToken: () => Promise<void>,
  setSelectedGroup: Dispatch<any>;
  setGroups: Dispatch<any>;
  selectedGroup: any;
  groups: any;
  userToken: null | string,
  userData: User | null 
}>({
    login: (username, password) => new Promise(() => {}),
    logout: () => {},
    getUserToken: async () => '',
    fetchUserData: async () => {},
    loadToken: async () => {},
    setSelectedGroup: () => {},
    setGroups: () => {},
    selectedGroup: null,
    groups: null,
    userToken: null,
    userData: null,
});

export function AuthProvider({ children }: { children: JSX.Element }) {

  const router = useRouter();
  
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => { loadToken() }, [])

  async function loadToken () {
    const token = await getItemAsync('userToken');
    api.defaults.headers.Authorization = 'Bearer ' + token;
    setUserToken(token);
  }

  async function resetToken () {
    setUserToken(null);
    await setItemAsync('userToken', '');
  }

  async function login (username: string, password: string): Promise<void> {
    try {
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

    } catch (error) {
      Alert.alert('Usuario ou senha incorreta');
    }
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
    try {
      const res = await api.get('/user/me');
      const { data } = res;
      setUserData(data);

    } catch (err) {
      const error = JSON.parse(JSON.stringify(err)) as AxiosError
      if (error.status === 401) {
        resetToken();
        router.replace('/');
        Alert.alert('Sessão expirada!');
      }
    }
  }


  return (
    <AuthContext.Provider value={{ login, logout, userToken, getUserToken, userData, fetchUserData, loadToken, selectedGroup, setSelectedGroup, groups, setGroups}}>
      { children }
    </AuthContext.Provider>
  )
}
