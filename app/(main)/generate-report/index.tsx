import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { usePatientListContext, useUserFacilities } from "@/app/hooks";
import PatientItem from "../../components/patient/PatientItem";

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: "semibold",
    paddingBottom: 8,
  },
  pageContainer: {
    padding: 6,
  },
});

const GenerateReportPage = () => {
  const userFacilities = useUserFacilities();
  const { selectedFacility } = userFacilities || {};
  const { id: facilityId } = selectedFacility || {};
  const { loading, handleGetPatientList, patients } = usePatientListContext();

  const onRefresh = () => {
    if (facilityId) {
      handleGetPatientList({ facilityId });
    }
  };

  useEffect(() => {
    if (facilityId) {
      handleGetPatientList({ facilityId });
    }
  }, [facilityId]);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <FlatList
        data={Array.isArray(patients) ? patients : []}
        renderItem={({ item }) => <PatientItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => {
          return (
            <View>
              <Text style={styles.headerTitle}>Patients</Text>
            </View>
          );
        }}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    );
  };

  return <View style={styles.pageContainer}>{renderContent()}</View>;
};

export default GenerateReportPage;
