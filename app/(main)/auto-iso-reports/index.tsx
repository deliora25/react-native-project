import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const AutoIsoReportsPage = () => {
  return (
    <View>
      <Link href="/auto-iso/cancelled">
        <Text>Go to Cancelled Auto Iso</Text>
      </Link>
    </View>
  );
};

export default AutoIsoReportsPage;
