import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState} from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { formatCurrency } from "../utils";
import { View, Text } from "./Themed";

export function GroupCard({ group }: any) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const { setSelectedGroup } = useContext(AuthContext);
  
  const [summary, setSummary] = useState(0);

  function handleDetail() {
    setSelectedGroup(group);
    router.push(`/DetailGroup/${group.id}`);
  }

  useEffect(() => {
      setSummary((group.summary.group.income - group.summary.group.outcome) / 100);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.groupInfo}>
        <Pressable onPress={handleDetail}>
          <Text style={styles.title}>{group.name}</Text>
          { group.description && <Text style={styles.description}>{group.description}</Text> }
        </Pressable>
      </View>

      <View style={styles.groupSummary}>
        <FontAwesome
          name={summary === 0 ? 'minus' : summary > 0 ? "arrow-up" : "arrow-down"}
          color={summary === 0 ? textColor : summary > 0 ? "green" : "red"}
          size={20}
        />
        <Text 
          style={{ 
            ...styles.summary,
            marginHorizontal: 5,
            color: (summary === 0 ? textColor : summary > 0 ? "green" : "red")
          }}

        >
          { formatCurrency(Math.abs(summary)) }
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
    flexDirection: 'row',
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

