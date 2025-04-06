import TabBar from "@/components/TabBar";
import { useAuthProvider } from "@/context/AuthContext";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabNavigation() {
  const { userData, loading, onboard } = useAuthProvider();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  } else if (!loading && !onboard) {
    return <Redirect href={"/(auth)/onboard"} />;
  } else if (!loading && !userData) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen options={{ title: "Home" }} name="index" />
      <Tabs.Screen options={{ title: "Discover" }} name="discover" />
      <Tabs.Screen options={{ title: "Favorite" }} name="favorite" />
      <Tabs.Screen options={{ title: "Settings" }} name="options" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Optional: Set a background color
  },
});
