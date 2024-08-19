import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "./hooks";
import useAuthOne from "./hooks/useAuthOne";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { initialTokenLoaded } = useAuthOne();

  if (!initialTokenLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(main)/(tabs)/home" />;
  }

  return <Redirect href="/landingScreen" />;
}
