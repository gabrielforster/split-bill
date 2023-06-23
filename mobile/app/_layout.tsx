import React, { useState, useEffect, useContext } from 'react';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useColorScheme } from 'react-native';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { AppTabs } from './App';
import { Auth } from './Auth';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
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
  const { userToken } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(!!userToken);

  useEffect(() => {
    setIsAuthenticated(!!userToken);
  }, [userToken]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack unmountInactiveRoutes>
        <Stack.Screen name={ isAuthenticated ? "(tabs)" : "(auth-tabs)"} options={{ headerShown: false }} />
        <Stack.Screen name="AccountModal" options={{ presentation: 'modal', title: 'Editando Conta' }} />
      </Stack>
    </ThemeProvider>
  )
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
