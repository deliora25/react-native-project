import React from "react";
import { Stack } from "expo-router";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as UserFacilitiesProvider } from "./context/UserFacilitiesContext";
import { Provider as DocumentLibraryProvider } from "./context/DocumentLibraryContext";

import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "./hooks";

const styles = StyleSheet.create({
  loadingContainer: { alignItems: "center", flex: 1, justifyContent: "center" },
});

function AuthStack() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    // You could return a loading screen here if needed
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserFacilitiesProvider>
        <DocumentLibraryProvider>
          <AuthStack />
        </DocumentLibraryProvider>
      </UserFacilitiesProvider>
    </AuthProvider>
  );
}
