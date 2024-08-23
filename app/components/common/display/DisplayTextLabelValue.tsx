import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

type Props = {
  label: string;
  value: string;
};

const DisplayTextLabelValue = ({ label, value }: Props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}>
      <Text variant="titleMedium" style={{ color: "white", textTransform: "uppercase" }}>
        {label}:
      </Text>
      <Text variant="bodyMedium" style={{ color: "white" }}>
        {value}
      </Text>
    </View>
  );
};

export default DisplayTextLabelValue;
