/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import Config from "react-native-config";
import { SafeAreaView, ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { FormValues } from "./types";
import { useAuth } from "../hooks";
import images from "../constants/images";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

const SignInScreen = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const auth = useAuth();
  const { loginError: errorMessage, loginLoading, signIn, resetLoginState } = auth || {};

  const baseUrlAndPath = `${Config.BASE_URL}${Config.PATH}`;

  const successCallback = () => {
    router.replace("/home");
  };

  // TODO: lacking authentication function

  const loginSuccessWithMFA = (_accessToken: string, _refreshToken: string) => {
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
    router.push("/");
  };

  useEffect(() => {
    resetLoginState();
  }, []);

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
            errorMessage={errorMessage || ""}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={handleChangePassword}
            placeholder="Enter Password"
            customClass={styles.formFieldMargin}
            errorMessage={errorMessage || ""}
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
            <Text style={styles.signUpText}>Don&apos;t have an account?</Text>
            <Link href="/sign-up" style={styles.signUpLink}>
              <Text> Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 24,
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#e5e7eb",
    marginRight: 8,
    marginTop: 28,
  },
  container: {
    justifyContent: "center",
    marginVertical: 24,
    minHeight: 150,
    paddingHorizontal: 16,
    paddingVertical: 40,
    width: "100%",
  },
  formFieldMargin: {
    marginTop: 28,
  },
  logo: {
    height: 35,
    width: 115,
  },
  safeAreaView: {
    backgroundColor: "gray",
    height: "100%",
  },
  signInButton: {
    backgroundColor: "#3b82f6",
    marginTop: 28,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 4,
    paddingTop: 20,
  },
  signUpLink: {
    color: "#3b82f6",

    fontSize: 18,
  },
  signUpText: {
    color: "#d1d5db",
    fontSize: 18,
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default SignInScreen;
