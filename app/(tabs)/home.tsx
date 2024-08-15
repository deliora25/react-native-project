import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import useAuth from "@/hooks/useAuth";
import Card from "@/components/Card";
import { Href, router } from "expo-router";
import { images } from "@/constants";

const styles = StyleSheet.create({
  welcomeText: { fontSize: 24, lineHeight: 32, color: "white" },
  listHeaderContainer: { marginTop: 16, paddingHorizontal: 16, rowGap: 24 },
  listHeaderWelcomeTextContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 24,
  },
  pageContainer: {
    backgroundColor: "gray",
    height: "100%",
    paddingHorizontal: 10,
    marginTop: 30,
  },
});

const Home = () => {
  const auth = useAuth();
  const { menuLinks, user, getUser, loadingUser } = auth || {};
  const { userName } = user || {};

  const onCardPress = (route: string) => {
    router.push(route as Href<string>);
  };

  const onRefresh = async () => {
    //refetch data if any new data
    getUser();
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <FlatList
        data={menuLinks}
        keyExtractor={(item) => item.id}
        //how the data will be rendered
        renderItem={({ item }) => (
          <Card
            title={item.label}
            onPress={() => onCardPress(item.route)}
            key={item.id}
          />
        )}
        //header for the list
        ListHeaderComponent={() => (
          <View style={styles.listHeaderContainer}>
            <View style={styles.listHeaderWelcomeTextContainer}>
              <View>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.welcomeText}>{userName}</Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <Image
                  source={images.informed_header_logo_white}
                  resizeMode="contain"
                  style={{ width: 100, height: 54 }}
                />
              </View>
            </View>
          </View>
        )}
        //used to refresh page when scroll to the top most part
        refreshControl={
          <RefreshControl refreshing={loadingUser} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
