import React, { useState, useEffect, useContext } from 'react';
import { Stack, useRouter, Link } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { Button, Pressable, useColorScheme } from 'react-native';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { AppTabs } from './App';
import { Auth } from './Auth';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { GroupsContext } from '../contexts/GroupsContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'home',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function App() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="register"
          options={{
            presentation: "modal",
            headerTitle: "Cadastro",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={1 ? '#0359af' : Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 15 }}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerTitle: "Modal",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={1 ? '#0359af' : Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 15 }}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="CreateGroup"
          options={{
            presentation: "modal",
            headerTitle: "Criar Grupo",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={1 ? '#0359af' : Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 15 }}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="DetailGroup/[id]"
          options={{
            presentation: "card",
            headerTitle: "Detalhes do Grupo",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={1 ? '#0359af' : Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 15 }}
                />
              </Pressable>
            ),
            headerRight: () => (
              <Link href="/InviteUser" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="user-plus"
                      size={20}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

        <Stack.Screen
          name="InviteUser"
          options={{
            presentation: "modal",
            headerTitle: "Convidar para o grupo",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={1 ? '#0359af' : Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 15 }}
                />
              </Pressable>
            ),
          }}
        />
          
        <Stack.Screen
          name="AccountModal"
          options={{
            presentation: "modal",
            headerTitle: "Editar Conta",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={1 ? '#0359af' : Colors[colorScheme ?? 'light'].text}
                  style={{ marginLeft: 15 }}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="AccountModal" options={{ presentation: 'modal', title: 'Editando Conta' }} /> */}
      </Stack>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  return (
    <>
      <AuthProvider>
        <App />
      </AuthProvider>
    </>
  );
}
