/* eslint-disable react-native/no-color-literals */
import { View, Text, FlatList, Image, StyleSheet, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Href, router } from "expo-router";
import { FacilityTypeCode } from "@/app/constants";

import images from "../../constants/images";
import { useAuth, useUserFacilities } from "../../hooks";
import { usePermissionAutoInformSettings, usePermissionAutoIso } from "../../hooks/permissions";
import DocumentLibraryCard from "../../components/documentLibrary/DocumentLibraryCard";
import CustomCard from "../../components/Card";
import { AUTOMATIC_REPORTS_PATH, ESSENTIAL_DOCUMENTS_PATH } from "../../constants/routes";

const styles = StyleSheet.create({
  image: { height: 54, width: 100 },
  imageContainer: { marginTop: 12 },
  listHeaderContainer: { marginTop: 16, paddingHorizontal: 16, rowGap: 24 },
  listHeaderWelcomeTextContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  pageContainer: {
    backgroundColor: "gray",
    height: "100%",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  welcomeText: { color: "white", fontSize: 24, lineHeight: 32 },
});

const Home = () => {
  const auth = useAuth();
  const { menuLinks, user, getUser, loadingUser } = auth || {};
  const { firstName } = user || {};
  const { selectedFacilityData } = useUserFacilities();
  const { facilityTypeCode } = selectedFacilityData || {};
  const { permittedViewAutoIso } = usePermissionAutoIso();
  const { canViewAutoInformSettings } = usePermissionAutoInformSettings();

  const onCardPress = (route: string) => {
    router.push(route as Href<string>);
  };

  const handlePressAutomaticReports = () => {
    router.push(AUTOMATIC_REPORTS_PATH as Href<string>);
  };

  const handlePressEssentialDocuments = () => {
    router.push(ESSENTIAL_DOCUMENTS_PATH as Href<string>);
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
        renderItem={({ item }) => {
          if (item.label === "Your Account" || item.label === "Access Request Center") {
            return null;
          }

          if (item.label === "Document Library") {
            let clientStaffDocumentLibraryLabel = "Document Library";
            if (facilityTypeCode === FacilityTypeCode.SNF) {
              clientStaffDocumentLibraryLabel = "SNF Library";
            }
            if (facilityTypeCode === FacilityTypeCode.ALF) {
              clientStaffDocumentLibraryLabel = "ALF Library";
            }
            return (
              <React.Fragment key={item.id}>
                <DocumentLibraryCard
                  onCardPress={onCardPress}
                  route={item.route}
                  clientStaffDocumentLibraryLabel={clientStaffDocumentLibraryLabel}
                />
                {permittedViewAutoIso && (
                  <CustomCard title="Automatic Reports" onPress={handlePressAutomaticReports} />
                )}
                {canViewAutoInformSettings && (
                  <CustomCard title="Essential Documents" onPress={handlePressEssentialDocuments} />
                )}
              </React.Fragment>
            );
          }

          return (
            <CustomCard title={item.label} onPress={() => onCardPress(item.route)} key={item.id} />
          );
        }}
        //header for the list
        ListHeaderComponent={() => (
          <View style={styles.listHeaderContainer}>
            <View style={styles.listHeaderWelcomeTextContainer}>
              <View>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.welcomeText}>{firstName}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={images.informed_header_logo_white}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </View>
          </View>
        )}
        //used to refresh page when scroll to the top most part
        refreshControl={<RefreshControl refreshing={loadingUser} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
