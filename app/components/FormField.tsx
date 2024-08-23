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
  helperText: {
    color: "orange",
    fontSize: 12,
    fontStyle: "italic",
    paddingLeft: 8,
    paddingTop: 2,
  },
  icon: {
    height: 24,
    width: 24,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderColor: "#cfcfcf",
    borderRadius: 16,
    borderWidth: 2,
    flexDirection: "row",
    height: 64,
    paddingHorizontal: 16,
    width: "100%",
  },
  textInput: {
    color: "#ffffff",
    flex: 1,
    fontSize: 16,
  },
  title: {
    color: "#f5f5f5",
    fontSize: 16,
    paddingBottom: 2,
    paddingLeft: 4,
  },
});

export default FormField;
