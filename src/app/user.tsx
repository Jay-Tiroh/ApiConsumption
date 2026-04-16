import { srcMap } from "@/constants/data";
import { User } from "@/constants/types";
import fetchData from "@/hooks/UseAxios";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const modal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useLocalSearchParams<{ userId: string }>();

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchData(userId);
      setUser(data);
      setIsLoading(false);
    };

    getUser();
  }, []);

  const src = srcMap[user?.id as keyof typeof srcMap];
  const skippedKeys = ["id", "name", "username", "address", "company"];
  const navigation = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.back()}
      >
        <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        <Text>Back</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator style={{ flex: 1, marginVertical: 80 }} />
        ) : (
          <View style={styles.profileCard}>
            {/* Avatar + name */}
            <View style={{ alignItems: "center", gap: 3 }}>
              <Image source={src} style={styles.image} />
              <Text style={styles.name}>{user?.name}</Text>
              <Text style={styles.email}>{user?.username}</Text>
            </View>

            {/* Bio */}
            <Section title="Bio">
              {Object.entries(user || {})
                .filter(([key]) => !skippedKeys.includes(key))
                .map(([key, value]) => (
                  <Row key={key} label={key} value={String(value)} />
                ))}
            </Section>

            {/* Address */}
            <Section title="Address Information">
              {Object.entries(user?.address || {})
                .filter(([key]) => key !== "geo")
                .map(([key, value]) => (
                  <Row key={key} label={key} value={String(value)} />
                ))}
              {Object.entries(user?.address?.geo || {}).map(([key, value]) => (
                <Row key={key} label={key} value={String(value)} />
              ))}
            </Section>

            {/* Company */}
            <Section title="Company Details">
              {Object.entries(user?.company || {}).map(([key, value]) => (
                <Row key={key} label={key} value={String(value)} />
              ))}
            </Section>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ── helpers ──────────────────────────────────────────────

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={sectionStyles.wrapper}>
    <Text style={sectionStyles.title}>{title}</Text>
    {children}
  </View>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={rowStyles.wrapper}>
    <Text style={rowStyles.label}>
      {label.charAt(0).toUpperCase() + label.slice(1)}:
    </Text>
    <Text style={rowStyles.value}>{value}</Text>
  </View>
);

// ── styles ───────────────────────────────────────────────

export default modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    gap: 20,
    paddingTop: 20,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    // position: "absolute",
    // top: 60,
    // left: 30,
    // zIndex: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginInline: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "100%", // full width instead of maxWidth
    padding: 16,
    paddingTop: 40,
    paddingBottom: 30,
    borderRadius: 12,
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  email: {
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
    fontStyle: "italic",
  },
});

const sectionStyles = StyleSheet.create({
  wrapper: {
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    width: "100%",
    marginTop: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
});

const rowStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap", // allows long values to wrap
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 15,
    color: "#333",
    flex: 1, // takes remaining space and wraps naturally
    flexWrap: "wrap",
  },
});
