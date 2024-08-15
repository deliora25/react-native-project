import React, { useEffect, useState } from "react";
import Config from "react-native-config";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Href, Link, router } from "expo-router";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/useAuth";
import { FormValues } from "./types";

const SignInScreen = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const auth = useAuth();
  const {
    loginError: errorMessage,
    loginLoading,
    signIn,
    resetLoginState,
    getUser,
  } = auth || {};

  const baseUrlAndPath = `${Config.BASE_URL}${Config.PATH}`;

  const successCallback = () => {
    console.log(`success`);
    router.push("/home");
  };

  // TODO: lacking authentication function
  const loginSuccessWithMFA = (accessToken: string, refreshToken: string) => {
    console.log("loginSuccess");
  };

  const handleSubmit = async (values: FormValues) => {
    const { userName, password } = values;

    signIn({
      userName,
      redirectUri: baseUrlAndPath,
      password,
      successCallback,
      loginSuccessWithMFA,
    });
  };

  const handleChangeEmail = (e: string) => {
    setForm({ ...form, userName: e });
  };

  const handleChangePassword = (e: string) => {
    setForm({ ...form, password: e });
  };

  const handleCancelClick = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={images.informed_logo_white2_565}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Log in to Informed Medical</Text>
          <FormField
            title="Username"
            value={form.userName}
            handleChangeText={handleChangeEmail}
            placeholder="Enter Username "
            customClass={styles.formFieldMargin}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={handleChangePassword}
            placeholder="Enter Password"
            customClass={styles.formFieldMargin}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Cancel"
              handlePress={handleCancelClick}
              customClass={styles.cancelButton}
              textColor="gray"
            />
            <CustomButton
              title="Sign in"
              handlePress={() => handleSubmit(form)}
              customClass={styles.signInButton}
              isLoading={loginLoading}
            />
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Link href="/sign-up" style={styles.signUpLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "gray",
    height: "100%",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 40,
    marginVertical: 24,
    minHeight: 150,
  },
  logo: {
    width: 115,
    height: 35,
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
    paddingVertical: 10,
  },
  formFieldMargin: {
    marginTop: 28,
  },
  buttonContainer: {
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#e5e7eb",
    marginRight: 8,
    marginTop: 28,
  },
  signInButton: {
    backgroundColor: "#3b82f6",
    marginTop: 28,
  },
  signUpContainer: {
    justifyContent: "center",
    paddingTop: 20,
    flexDirection: "row",
    marginHorizontal: 4,
  },
  signUpText: {
    fontSize: 18,
    color: "#d1d5db",
  },
  signUpLink: {
    fontSize: 18,

    color: "#3b82f6",
  },
});

export default SignInScreen;
