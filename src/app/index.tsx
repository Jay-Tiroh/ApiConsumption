import UserCard from "@/components/UserCard";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers } from "@/redux/user/usersSlice";
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
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const [query, setQuery] = useState("");
  const [promptText, setPromptText] = useState("All users");

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.data);
  const isLoading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = query
    ? users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()),
      )
    : users;

  const filterUsers = (text: string) => {
    setQuery(text);
    setPromptText(text ? `Search results for "${text}"` : "All users");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Users List</Text>
      <View style={styles.searchBar}>
        <Fontisto name="search" size={16} color="#3b3b3b" />
        <TextInput
          placeholder="Search users..."
          style={styles.searchInput}
          placeholderTextColor={"#888"}
          onChange={(e) => {
            filterUsers(e.nativeEvent.text);
          }}
          onSubmitEditing={() => filterUsers(query)}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000131" />
      ) : error ? (
        <Text>Error: {error}</Text>
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
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
