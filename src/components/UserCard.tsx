import { srcMap } from "@/constants/data";
import { User } from "@/constants/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const UserCard = ({ user }: { user: User }) => {
  const navigation = useRouter();
  const src =
    srcMap[user.id as keyof typeof srcMap] ??
    require("@assets/images/img1.webp");

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.push(`/user?userId=${user.id}`)}
    >
      <Image source={src} style={styles.image} />
      <Text>{user.name}</Text>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
});
