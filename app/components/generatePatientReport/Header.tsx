import { View, StyleSheet } from "react-native";
import React from "react";
import { DisplayTextLabelValue } from "../common";

type Props = {
  patientName: string;
  dateOfBirth: string;
  admissionDate: string;
  physicianName: string;
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2052bb",
    padding: 8,
    width: "100%",
  },
});

const Header = ({ patientName, dateOfBirth, admissionDate, physicianName }: Props) => {
  return (
    <View style={styles.header}>
      <DisplayTextLabelValue label="Patient" value={patientName} />
      <DisplayTextLabelValue label="DOB" value={dateOfBirth} />
      <DisplayTextLabelValue label="Admission Date" value={admissionDate} />
      <DisplayTextLabelValue label="Physician" value={physicianName} />
    </View>
  );
};

export default Header;
