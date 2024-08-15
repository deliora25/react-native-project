import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, ViewStyle } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  isLoading?: boolean;
  icon?: string;
  textColor?: string;
  mode?: "text" | "outlined" | "contained";
  customClass?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  customClass,
  handlePress,
  isLoading = false,
  icon = "",
  textColor = "",
  mode = "contained",
}) => {
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={handlePress}
      style={[styles.button, customClass]}
      loading={isLoading}
      disabled={isLoading}
      textColor={textColor}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
});

export default CustomButton;
