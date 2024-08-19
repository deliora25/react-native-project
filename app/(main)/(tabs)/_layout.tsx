/* eslint-disable react-native/no-color-literals */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

interface TabIconProps {
  icon: string;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name }) => {
  return (
    <View style={styles.iconContainer}>
      <Icon name={icon} size={24} color={color} />
      <Text style={[styles.iconText, { color }]}>{name}</Text>
    </View>
  );
};

const TabsLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#2469C7",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} name="Home" icon="home" />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} name="Settings" icon="cog" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile-info"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} name="Profile" icon="user" />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    gap: 4,
    justifyContent: "center",
  },
  iconText: {
    fontSize: 12,
  },
  tabBar: {
    backgroundColor: "#161622",
    borderTopColor: "#232533",
    borderTopWidth: 1,
    height: 84,
  },
});

export default TabsLayout;
