import { View, Text, StyleSheet } from "react-native";

export default function Options() {
  return (
    <View style={styles.container}>
      <Text>This is Settings Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
