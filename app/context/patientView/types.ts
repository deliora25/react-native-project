import {
  DocumentLibrary,
  Patient,
  PatientDevice,
  PatientDiagnosis,
  PatientFacilityForm,
} from "@/app/types";
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
} from "./constants";

export interface DocumentLibraryWithChecked extends DocumentLibrary {
  checked?: boolean;
  facilityLibraryId?: string;
}

export type FilteredDocumentLibrary = {
  [key: string]: DocumentLibraryWithChecked;
};

export interface PatientDeviceWithChecked extends PatientDevice {
  checked?: boolean;
  name?: string;
}

export interface PatientDiagnosisWithChecked extends PatientDiagnosis {
  checked?: boolean;
  name?: string;
}

export interface PatientFacilityFormWithChecked extends PatientFacilityForm {
  checked?: boolean;
  name?: string;
}

export interface PatientWithChecked extends Patient {
  patientDevices: PatientDeviceWithChecked[];
  patientDiagnoses: PatientDiagnosisWithChecked[];
  patientFacilityForms: PatientFacilityFormWithChecked[];
}

export interface CheckboxFilters {
  diagnoses: boolean;
  treatments: boolean;
  facility: boolean;
}

export type State = {
  diagnoses: [];
  devices: [];
  facilityForms: [];
  selectAllDiagnoses: boolean;
  selectAllGeneralForms: boolean;
  selectAllFacilityForms: boolean;
  patient: PatientWithChecked;
  documentLibrary: FilteredDocumentLibrary;
  checkboxFilters: CheckboxFilters;
  filteredDocumentLibrary: FilteredDocumentLibrary;
  setPatientFacilityFormsToggle: ({
    item,
    checked,
  }: {
    item: PatientFacilityFormWithChecked;
    checked: boolean;
  }) => void;
  setFacilityLibraryToggle: ({
    item,
    checked,
  }: {
    item: DocumentLibraryWithChecked;
    checked: boolean;
  }) => void;
  setDocumentLibrary: ({ library }: { library: DocumentLibrary[] }) => void;
  setDeviceToggle: ({
    device,
    checked,
  }: {
    device: DocumentLibraryWithChecked;
    checked: boolean;
  }) => void;
  setDiagnosisToggle: ({
    diagnosis,
    checked,
  }: {
    diagnosis: DocumentLibraryWithChecked;
    checked: boolean;
  }) => void;
  setPatient: ({ patient }: { patient: PatientWithChecked }) => void;
  setPatientDeviceToggle: ({
    device,
    checked,
  }: {
    device: PatientDeviceWithChecked;
    checked: boolean;
  }) => void;
  setPatientDiagnosisToggle: ({
    diagnosis,
    checked,
  }: {
    diagnosis: PatientDiagnosisWithChecked;
    checked: boolean;
  }) => void;
  setPatientDiagnoses: ({
    patientDiagnoses,
  }: {
    patientDiagnoses: PatientDiagnosisWithChecked[];
  }) => void;
  setPatientDevices: ({ patientDevices }: { patientDevices: PatientDeviceWithChecked[] }) => void;
  setCheckboxFilters: ({ name, checked }: { name: string; checked: boolean }) => void;
  setSelectAllPatientFacilityLibraryForms: ({ checked }: { checked: boolean }) => void;
  setSelectAllPatientGeneralForms: ({ checked }: { checked: boolean }) => void;
  setSelectAllPatientDiagnosisForms: ({ checked }: { checked: boolean }) => void;
  setPatientFacilityForms: ({
    patientFacilityForms,
  }: {
    patientFacilityForms: PatientFacilityFormWithChecked[];
  }) => void;
};

export type Action =
  | {
      type: typeof SET_DEVICE_TOGGLE;
      device: DocumentLibraryWithChecked;
      checked: boolean;
    }
  | {
      type: typeof SET_FACILITY_LIBRARY_TOGGLE;
      item: DocumentLibraryWithChecked;
      checked: boolean;
    }
  | {
      type: typeof SET_DIAGNOSIS_TOGGLE;
      diagnosis: DocumentLibraryWithChecked;
      checked: boolean;
    }
  | {
      type: typeof SET_PATIENT_DEVICE_TOGGLE;
      device: PatientDeviceWithChecked;
      checked: boolean;
    }
  | {
      type: typeof SET_PATIENT_DEVICES;
      patientDevices: PatientDeviceWithChecked[];
    }
  | {
      type: typeof SET_PATIENT_DIAGNOSES;
      patientDiagnoses: PatientDiagnosisWithChecked[];
    }
  | {
      type: typeof SET_PATIENT_DIAGNOSIS_TOGGLE;
      diagnosis: PatientDiagnosisWithChecked;
      checked: boolean;
    }
  | {
      type: typeof SET_PATIENT_FACILITY_LIBRARY_TOGGLE;
      item: PatientFacilityFormWithChecked;
      checked: boolean;
    }
  | {
      type: typeof SET_PATIENT;
      patient: Patient;
    }
  | {
      type: typeof SET_DOCUMENT_LIBRARY;
      library: DocumentLibrary[];
    }
  | {
      type: typeof SET_CHECKBOX_FILTERS;
      name: string;
      checked: boolean;
    }
  | {
      type: typeof SET_SELECT_ALL_PATIENT_FACILITY_LIBRARY_FORMS;
      checked: boolean;
    }
  | {
      type: typeof SET_SELECT_ALL_PATIENT_GENERAL_FORMS;
      checked: boolean;
    }
  | {
      type: typeof SET_SELECT_ALL_PATIENT_DIAGNOSIS;
      checked: boolean;
    }
  | {
      type: typeof SET_PATIENT_FACILITY_FORMS;
      patientFacilityForms: PatientFacilityFormWithChecked[];
    };
