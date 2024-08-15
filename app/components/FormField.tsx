import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
} from "react-native";
import icons from "../constants/icons";

interface Props {
  customClass?: ViewStyle;
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  errorMessage?: string;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  customClass,
  errorMessage,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, customClass]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.helperText}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: "#f5f5f5",
    paddingBottom: 2,
    paddingLeft: 4,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "#cfcfcf",
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
  },
  icon: {
    height: 24,
    width: 24,
  },
  helperText: {
    color: "orange",
    fontStyle: "italic",
    fontSize: 12,
    paddingLeft: 8,
    paddingTop: 2,
  },
});

export default FormField;
