import React from "react";
import { Stack } from "expo-router";
import { Provider as AuthProvider } from "./context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "./hooks";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthStack />
    </AuthProvider>
  );
}

function AuthStack() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    // You could return a loading screen here if needed
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
