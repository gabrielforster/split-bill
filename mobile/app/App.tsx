import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export function AppTabs() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="AccountModal" options={{ presentation: 'modal', title: 'Editando Conta' }} />
    </>
  )
}
