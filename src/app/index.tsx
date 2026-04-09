import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

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
