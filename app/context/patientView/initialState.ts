import { Patient } from "@/app/types";
import { State } from "./types";

const initialCheckboxFilters = {
  diagnoses: false,
  treatments: false,
  facility: false,
};

export const initialPatient: Patient = {
  facilityId: "",
  isSync: false,
  patientContacts: [],
  patientStatus: 1,
  physicianFullName: null,
  status: 1,
  patientDevices: [],
  patientDiagnoses: [],
  patientFacilityForms: [],
};

const initialState: State = {
  diagnoses: [],
  devices: [],
  facilityForms: [],
  selectAllDiagnoses: false,
  selectAllGeneralForms: false,
  selectAllFacilityForms: false,
  patient: {
    ...initialPatient,
  },
  documentLibrary: {},
  checkboxFilters: {
    ...initialCheckboxFilters,
  },
  filteredDocumentLibrary: {},
  setPatientFacilityFormsToggle: () => {},
  setFacilityLibraryToggle: () => {},
  setDocumentLibrary: () => {},
  setDeviceToggle: () => {},
  setDiagnosisToggle: () => {},
  setPatient: () => {},
  setPatientDevices: () => {},
  setPatientDeviceToggle: () => {},
  setPatientDiagnoses: () => {},
  setPatientDiagnosisToggle: () => {},
  setCheckboxFilters: () => {},
  setSelectAllPatientFacilityLibraryForms: () => {},
  setSelectAllPatientGeneralForms: () => {},
  setSelectAllPatientDiagnosisForms: () => {},
  setPatientFacilityForms: () => {},
};

export default initialState;
