/* eslint-disable react-native/no-color-literals */
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import images from "./constants/images";
import CustomButton from "./components/CustomButton";

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: "100%",
  },
  descriptionText: {
    color: "white",
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 150,
    width: "100%",
  },
  pageContainer: {
    backgroundColor: "gray",
    height: "100%",
    paddingHorizontal: 10,
  },
  primaryImage: { height: 84, width: 130 },
  secondaryImage: { height: 150, maxWidth: 380, width: "100%" },
  subdescriptionText: {
    color: "blue",
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
  },
  textContainer: { marginTop: 40, position: "relative" },
});

const App = () => {
  const handlePressContinueWithEmail = () => {
    router.push("/sign-in");
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={images.informed_logo_white2_565}
          resizeMode="contain"
          style={styles.primaryImage}
        />
        <Image
          source={images.informed_logo_transparent}
          style={styles.secondaryImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.descriptionText}>Helping Providers Manage Relationships</Text>
        <Text style={styles.subdescriptionText}>The right communication at the right time.</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            handlePress={handlePressContinueWithEmail}
            title="Continue with Credentials"
            icon="email"
            mode="contained"
            customClass={{ backgroundColor: "#1e88e5" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
