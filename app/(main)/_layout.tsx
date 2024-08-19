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
        name="document-library"
        options={{ headerShown: false, headerTitle: "Document Library" }}
      />
      <Stack.Screen name="generate-report/index" options={{ headerTitle: "Generate Report" }} />
      <Stack.Screen name="patient/[id]" options={{ headerTitle: "Generate Report" }} />
      <Stack.Screen name="report-history/index" options={{ headerTitle: "Report History" }} />
      <Stack.Screen
        name="auto-inform-settings/index"
        options={{ headerTitle: "Essential Documents" }}
      />
      <Stack.Screen name="users/index" options={{ headerTitle: "Users" }} />
      <Stack.Screen
        name="dashboard-overview/index"
        options={{ headerTitle: "Dashboard Overview" }}
      />
      <Stack.Screen
        name="auto-iso-reports/index"
        options={{ headerShown: true, headerTitle: "Automatic Reports" }}
      />
      <Stack.Screen
        name="auto-iso/cancelled"
        options={{ headerShown: true, headerTitle: "Cancelled Automatic Reports Logs" }}
      />
      <Stack.Screen
        name="manage-organizations/index"
        options={{ headerShown: true, headerTitle: "Manage Organization" }}
      />
      <Stack.Screen
        name="manage-facilities/index"
        options={{ headerShown: true, headerTitle: "Manage Facility" }}
      />
      <Stack.Screen
        name="manage-informed-users/index"
        options={{ headerShown: true, headerTitle: "Users" }}
      />
    </Stack>
  );
};

export default MainLayout;
