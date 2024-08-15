import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import images from "../constants/images";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

interface Props {
  handleSubmit: () => void;
}

const SignUpScreen = ({ handleSubmit }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
              Sign In
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

export default SignUpScreen;
