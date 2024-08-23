import { ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Patient } from "@/app/types";
import { useGetPatient, usePatientViewContext, useUserFacilities } from "@/app/hooks";
import { initialPatient } from "@/app/context/patientView/initialState";
import { formatDate } from "@/app/utils";
import { NO_DATE, NO_PHYSICIAN } from "@/app/components/generatePatientReport/constants";
import Header from "@/app/components/generatePatientReport/Header";

const PatentViewDetails = () => {
  const searchParams = useLocalSearchParams();
  const { id } = searchParams;
  const userFacilities = useUserFacilities();
  const { selectedFacility } = userFacilities || {};

  const navigation = useNavigation();

  const { patient, setPatient } = usePatientViewContext();
  const {
    patientAdmissionDate,
    patientBirthDate,
    physicianFullName,
    patientLastName,
    patientFirstName,
    physicianSuffix,
    patientShortId,
  } = patient || {};

  const { loading: loadingGetPatient, sendRequest: sendRequestGetPatient } = useGetPatient();

  const onSuccessGetPatient = (data: Patient) => {
    setPatient({ patient: data });
  };

  const onErrorGetPatient = () => {
    setPatient({ patient: initialPatient });
  };

  const fetchPatientData = () => {
    if (id && selectedFacility) {
      sendRequestGetPatient({
        patientId: id as string,
        facilityId: selectedFacility.id,
        onSuccess: onSuccessGetPatient,
        onError: onErrorGetPatient,
      });
    }
  };

  useEffect(() => {
    if (id && selectedFacility && selectedFacility.id) {
      fetchPatientData();
    }
  }, [id, selectedFacility]);

  useEffect(() => {
    if (loadingGetPatient) {
      navigation.setOptions({
        headerTitle: "Loading Patient Data...",
      });
    } else if (patient) {
      navigation.setOptions({
        headerTitle: patient.patientFullName,
      });
    }
  }, [patient, loadingGetPatient]);

  let patientName = "";
  let physicianName = "";
  let dateOfBirth = "";
  let admissionDate = "";

  if (id) {
    physicianName =
      physicianFullName || physicianSuffix
        ? `${physicianFullName || ""} ${physicianSuffix || ""}`
        : NO_PHYSICIAN;

    dateOfBirth =
      patientBirthDate !== undefined && patientBirthDate
        ? formatDate({ date: patientBirthDate })
        : NO_DATE;

    admissionDate =
      patientAdmissionDate !== undefined && patientAdmissionDate
        ? formatDate({ date: patientAdmissionDate })
        : NO_DATE;

    patientName = `${patientLastName || ""}, ${patientFirstName || ""} (${patientShortId || ""})`;
  }

  const renderContent = () => {
    if (loadingGetPatient) {
      return <ActivityIndicator />;
    }
    return (
      <Header
        admissionDate={admissionDate}
        dateOfBirth={dateOfBirth}
        patientName={patientName}
        physicianName={physicianName}
      />
    );
  };

  return <>{renderContent()}</>;
};

export default PatentViewDetails;
