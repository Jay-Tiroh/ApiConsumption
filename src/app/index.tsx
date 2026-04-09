import UserCard from "@/components/UserCard";
import { User } from "@/constants/types";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [query, setQuery] = useState("");

  const getUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data); // ✅ use data, not users
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [promptText, setPromptText] = useState("All users");

  const filterUsers = (query: string) => {
    if (!query) {
      setFilteredUsers(users);
      setPromptText("All users");
      return;
    } //Leave as original list if query is empty
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredUsers(filtered);
    setPromptText(`Search results for "${query}"`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Bg
        preserveAspectRatio="xMidYMid slice"
        style={StyleSheet.absoluteFill}
      /> */}
      <Text style={styles.header}>Users List</Text>
      <View style={styles.searchBar}>
        <Fontisto
          name="search"
          size={16}
          color="#3b3b3b"
          onPress={() => {
            filterUsers(query);
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
            filterUsers(query);
          }}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000131" />
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
    // borderWidth: 1,
    // borderColor: "gray",
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
