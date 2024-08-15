import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import images from "./constants/images";
import CustomButton from "./components/CustomButton";

const styles = StyleSheet.create({
  pageContainer: {
    height: "100%",
    backgroundColor: "gray",
    paddingHorizontal: 10,
  },
  logoContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 150,
  },
  descriptionText: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
    color: "white",
  },
  subdescriptionText: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
    color: "blue",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

const App = () => {
  const handlePressContinueWithEmail = () => {
    router.push("/sign-in");
  };
  console.log(`index`);
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={images.informed_logo_white2_565}
          resizeMode="contain"
          style={{ width: 130, height: 84 }}
        />
        <Image
          source={images.informed_logo_transparent}
          style={{ maxWidth: 380, width: "100%", height: 150 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ marginTop: 40, position: "relative" }}>
        <Text style={styles.descriptionText}>
          Helping Providers Manage Relationships
        </Text>
        <Text style={styles.subdescriptionText}>
          The right communication at the right time.
        </Text>
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
