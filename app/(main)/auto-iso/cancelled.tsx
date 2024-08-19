import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const AutoIsoCancelledReports = () => {
  return (
    <View>
      <Link href="/auto-iso-reports">
        <Text>AutoIsoCancelledReports</Text>
      </Link>
    </View>
  );
};

export default AutoIsoCancelledReports;
