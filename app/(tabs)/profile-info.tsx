import { View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, router } from "expo-router";

const Profile = () => {
  const { signOut } = useAuth();

  const handleClickLogout = () => {
    signOut();
    router.push("/sign-in" as Href<string>);
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
