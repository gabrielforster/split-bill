import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export function Auth(){
  return (
      <Stack.Screen name="(auth-tabs)" options={{ headerShown: false }} />
  )
}
