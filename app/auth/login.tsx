import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "../hooks";
import Config from "react-native-config";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const baseUrlAndPath = `${Config.BASE_URL}${Config.PATH}`;

  const successCallback = () => {
    console.log(`success`);
    router.replace("/home");
  };

  // TODO: lacking authentication function
  const loginSuccessWithMFA = (accessToken: string, refreshToken: string) => {
    console.log("loginSuccess");
  };

  const handleLogin = async () => {
    // Replace this with your actual authentication logic

    signIn({
      userName: email,
      redirectUri: baseUrlAndPath,
      password,
      successCallback,
      loginSuccessWithMFA,
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
