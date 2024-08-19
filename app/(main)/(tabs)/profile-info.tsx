import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuth } from "../../hooks";
import CustomButton from "../../components/CustomButton";

const Profile = () => {
  const { signOut } = useAuth();

  const handleClickLogout = () => {
    signOut();
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView>
      <View>
        <CustomButton handlePress={handleClickLogout} title="Logout" />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
