import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: "gray",
    height: "100%",
    paddingHorizontal: 10,
    marginTop: 30,
  },
});

const DocumentLibrary = () => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text>DocumentLibrary</Text>
    </SafeAreaView>
  );
};

export default DocumentLibrary;
