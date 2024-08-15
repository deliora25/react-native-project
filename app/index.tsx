import { images } from "@/constants";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const App = () => {
  const handlePressContinueWithEmail = () => {
    router.push("/sign-in");
  };

  return (
    <SafeAreaView
      style={{ height: "100%", backgroundColor: "gray", paddingHorizontal: 10 }}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: 150,
        }}
      >
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
        <Text
          style={{
            fontSize: 30,
            lineHeight: 36,
            textAlign: "center",
            color: "white",
          }}
        >
          Helping Providers Manage Relationships
        </Text>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 28,
            textAlign: "center",
            color: "blue",
          }}
        >
          The right communication at the right time.
        </Text>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <CustomButton
            handlePress={handlePressContinueWithEmail}
            title="Continue with Email"
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
