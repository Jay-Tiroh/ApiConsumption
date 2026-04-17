import UserCard from "@/components/UserCard";
import { User } from "@/constants/types";
import fetchData from "@/hooks/UseAxios";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const [query, setQuery] = useState("");

  const { data: users = [], status } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetchData(),
  });

  const filteredUsers = useMemo(() => {
    if (!query) return users;

    return users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [users, query]);

  const promptText = query ? `Search results for "${query}"` : "All users";
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Users List</Text>
      <View style={styles.searchBar}>
        <Fontisto
          name="search"
          size={16}
          color="#3b3b3b"
          onPress={() => {
            setQuery(query);
          }}
        />
        <TextInput
          placeholder="Search users..."
          style={styles.searchInput}
          placeholderTextColor={"#888"}
          // value={value}
          onChange={(e) => {
            setQuery(e.nativeEvent.text);
          }}
          onSubmitEditing={() => {
            setQuery(query);
          }}
        />
      </View>
      {status === "pending" && (
        <ActivityIndicator size="large" color="#000131" />
      )}
      {status === "error" ? (
        <Text>Error fetching users</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserCard user={item} />}
          numColumns={2}
          style={{ width: "100%" }}
          columnWrapperStyle={{
            gap: 12,
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
          ListHeaderComponent={() => (
            <Text style={styles.h1}>{promptText}</Text>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 12 }} /> // vertical gap between rows
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text>No users found</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  h1: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3b3b3b",
    marginBottom: 20,
  },
  searchInput: {
    width: "100%",
    fontWeight: "500",
    color: "#3b3b3b",
  },
  searchBar: {
    flexDirection: "row",
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 16,
    marginVertical: 10,
    alignItems: "center",
    gap: 8,
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
});
