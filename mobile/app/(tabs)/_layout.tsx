import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Grupos",
          tabBarLabel: "Grupos",
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Summary"
        options={{
          title: "Resumo",
          tabBarLabel: "Resumo",
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Account"
        options={{
          title: "Conta",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          tabBarLabel: "Conta",
          headerRight: () => (
            <Link href="/AccountModal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
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
      
    </Tabs>
  );
}
