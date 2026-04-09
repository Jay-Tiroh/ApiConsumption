import { useState } from "react";
import { Text, View } from "react-native";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  age: number;
  phone: string;
  status: "active" | "inactive" | "suspended";
  address: string;
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
