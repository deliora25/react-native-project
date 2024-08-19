/* eslint-disable react-native/no-color-literals */
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import images from "../constants/images";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

interface Props {
  handleSubmit: () => void;
}

const SignUpScreen = ({ handleSubmit }: Props) => {
  const [isSubmitting] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChangeEmail = (e: string) => {
    setForm({ ...form, email: e });
  };

  const handleChangeUsername = (e: string) => {
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
          <Text style={styles.title}>Create an account</Text>
          <FormField
            title="Username"
            value={form.userName}
            handleChangeText={handleChangeUsername}
            placeholder="Enter Username"
            customClass={styles.formFieldMargin}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={handleChangeEmail}
            placeholder="Enter Email"
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
              title="Sign up"
              handlePress={handleSubmit}
              customClass={styles.signInButton}
              isLoading={isSubmitting}
            />
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Already have an account?</Text>
            <Link href="/sign-in" style={styles.signUpLink}>
              <Text> Sign In</Text>
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

export default SignUpScreen;
