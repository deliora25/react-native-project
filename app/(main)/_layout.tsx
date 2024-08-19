import { View, ActivityIndicator } from "react-native";
import React from "react";
import { useAuth } from "../hooks";
import { Stack } from "expo-router";

const MainLayout = () => {
  const auth = useAuth();
  const { loadingUser } = auth || {};

  if (loadingUser) {
    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="document-library/index"
        options={{ headerShown: true, headerTitle: "Document Library" }}
      />
      <Stack.Screen
        name="document-library/[id]"
        options={{ headerShown: true, headerTitle: "Document Library" }}
      />
      <Stack.Screen name="generate-report/index" options={{ headerTitle: "Generate Report" }} />
      <Stack.Screen name="patient/[id]" options={{ headerTitle: "Generate Report" }} />

      {/* <Stack.Screen name="(manageFacilities)" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default MainLayout;
