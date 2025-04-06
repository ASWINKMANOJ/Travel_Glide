import { Stack } from "expo-router";

export default function StackNavigation() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="onboard" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
