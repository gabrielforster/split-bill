import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext} from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { View, Text } from "./Themed";

export function GroupCard({ group: { Group } }: any) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { setSelectedGroup } = useContext(AuthContext);

  function handleDetail() {
    setSelectedGroup(Group);
    router.push(`/DetailGroup/${Group.id}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.groupInfo}>
        <Pressable onPress={handleDetail}>
          <Text style={styles.title}>{Group.name}</Text>
          { Group.description && <Text style={styles.description}>{Group.description}</Text> }
        </Pressable>
      </View>

      <View style={styles.groupSummary}>
        <Text style={styles.summary}>
          { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1200) }
        </Text>
      </View>

      <View style={styles.groupEdit}>
        <Pressable onPress={() => router.push(`/modal`)}>
          <FontAwesome name="pencil" size={20} color="#0359af" />
        </Pressable>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  groupInfo: {
    width: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
  },
  groupSummary: {
    width: '30%',
    alignItems: 'center',
  },
  summary: {
    fontSize: 16,
  },
  groupEdit: {
    width: '10%',
    alignItems: 'center',
  },
});

