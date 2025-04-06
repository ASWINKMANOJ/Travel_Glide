import { Text, View, StyleSheet, StatusBar } from "react-native";

export default function SignUp() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text>Sign Up</Text>
    </View>
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
