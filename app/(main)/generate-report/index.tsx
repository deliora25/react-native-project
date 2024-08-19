import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

//TODO:

const GenerateReportPage = () => {
  const onPress = () => {
    router.navigate("/patient/id");
  };

  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>generate report</Text>
      </Pressable>
    </View>
  );
};

export default GenerateReportPage;
