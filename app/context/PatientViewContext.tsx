import { createContext, useReducer, PropsWithChildren, FC } from "react";

import {
  SET_DEVICE_TOGGLE,
  SET_PATIENT_DEVICE_TOGGLE,
  SET_PATIENT_DEVICES,
  SET_PATIENT_DIAGNOSES,
  SET_PATIENT_DIAGNOSIS_TOGGLE,
  SET_PATIENT_FACILITY_LIBRARY_TOGGLE,
  SET_FACILITY_LIBRARY_TOGGLE,
  SET_PATIENT,
  SET_DIAGNOSIS_TOGGLE,
  SET_DOCUMENT_LIBRARY,
  SET_CHECKBOX_FILTERS,
  SET_SELECT_ALL_PATIENT_FACILITY_LIBRARY_FORMS,
  SET_SELECT_ALL_PATIENT_GENERAL_FORMS,
  SET_SELECT_ALL_PATIENT_DIAGNOSIS,
  SET_PATIENT_FACILITY_FORMS,
} from "./patientView/constants";
import reducer from "./patientView/reducer";
import initialState from "./patientView/initialState";
import {
  DocumentLibraryWithChecked,
  PatientDeviceWithChecked,
  PatientDiagnosisWithChecked,
  PatientFacilityFormWithChecked,
  PatientWithChecked,
} from "./patientView/types";
import { DocumentLibrary } from "../types";

export const Context = createContext(initialState);

// eslint-disable-next-line @typescript-eslint/ban-types
type ProviderProps = {};

export const Provider: FC<PropsWithChildren<ProviderProps>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setCheckboxFilters = ({ name, checked }: { name: string; checked: boolean }) => {
    dispatch({ type: SET_CHECKBOX_FILTERS, name, checked });
  };

  const setDocumentLibrary = ({ library }: { library: DocumentLibrary[] }) => {
    dispatch({ type: SET_DOCUMENT_LIBRARY, library });
  };

  const setPatientDiagnoses = ({
    patientDiagnoses,
  }: {
    patientDiagnoses: PatientDiagnosisWithChecked[];
  }) => {
    dispatch({ type: SET_PATIENT_DIAGNOSES, patientDiagnoses });
  };

  const setPatientDevices = ({
    patientDevices,
  }: {
    patientDevices: PatientDeviceWithChecked[];
  }) => {
    dispatch({ type: SET_PATIENT_DEVICES, patientDevices });
  };

  const setPatientFacilityForms = ({
    patientFacilityForms,
  }: {
    patientFacilityForms: PatientFacilityFormWithChecked[];
  }) => {
    dispatch({ type: SET_PATIENT_FACILITY_FORMS, patientFacilityForms });
  };

  const setPatient = ({ patient }: { patient: PatientWithChecked }) => {
    dispatch({ type: SET_PATIENT, patient });
  };

  const setPatientDeviceToggle = ({
    device,
    checked,
  }: {
    device: PatientDeviceWithChecked;
    checked: boolean;
  }) => {
    dispatch({ type: SET_PATIENT_DEVICE_TOGGLE, device, checked });
  };

  const setPatientDiagnosisToggle = ({
    diagnosis,
    checked,
  }: {
    diagnosis: PatientDiagnosisWithChecked;
    checked: boolean;
  }) => {
    dispatch({ type: SET_PATIENT_DIAGNOSIS_TOGGLE, diagnosis, checked });
  };

  const setDeviceToggle = ({
    device,
    checked,
  }: {
    device: DocumentLibraryWithChecked;
    checked: boolean;
  }) => {
    dispatch({ type: SET_DEVICE_TOGGLE, device, checked });
  };

  const setDiagnosisToggle = ({
    diagnosis,
    checked,
  }: {
    diagnosis: DocumentLibraryWithChecked;
    checked: boolean;
  }) => {
    dispatch({ type: SET_DIAGNOSIS_TOGGLE, diagnosis, checked });
  };

  const setFacilityLibraryToggle = ({
    item,
    checked,
  }: {
    item: DocumentLibraryWithChecked;
    checked: boolean;
  }) => {
    dispatch({ type: SET_FACILITY_LIBRARY_TOGGLE, item, checked });
  };

  const setPatientFacilityFormsToggle = ({
    item,
    checked,
  }: {
    item: PatientFacilityFormWithChecked;
    checked: boolean;
  }) => {
    dispatch({ type: SET_PATIENT_FACILITY_LIBRARY_TOGGLE, item, checked });
  };

  const setSelectAllPatientFacilityLibraryForms = ({ checked }: { checked: boolean }) => {
    dispatch({ type: SET_SELECT_ALL_PATIENT_FACILITY_LIBRARY_FORMS, checked });
  };

  const setSelectAllPatientGeneralForms = ({ checked }: { checked: boolean }) => {
    dispatch({ type: SET_SELECT_ALL_PATIENT_GENERAL_FORMS, checked });
  };

  const setSelectAllPatientDiagnosisForms = ({ checked }: { checked: boolean }) => {
    dispatch({ type: SET_SELECT_ALL_PATIENT_DIAGNOSIS, checked });
  };

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...state,
        setPatientFacilityFormsToggle,
        setFacilityLibraryToggle,
        setDocumentLibrary,
        setDeviceToggle,
        setDiagnosisToggle,
        setPatient,
        setPatientDevices,
        setPatientDeviceToggle,
        setPatientDiagnoses,
        setPatientDiagnosisToggle,
        setCheckboxFilters,
        setSelectAllPatientFacilityLibraryForms,
        setSelectAllPatientGeneralForms,
        setSelectAllPatientDiagnosisForms,
        setPatientFacilityForms,
      }}
    >
      {children}
    </Context.Provider>
  );
};
