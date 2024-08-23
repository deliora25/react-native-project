import { PatientStatus, RecordState, ReportSuiteType } from "@/app/constants";

export interface PatientDevice {
  createdBy?: string;
  createdDate?: string;
  deviceId?: string;
  deviceName?: string;
  id?: string;
  isFromAutoInformSetting?: boolean;
  isSync?: boolean;
  modifiedBy?: string;
  modifiedDate?: string | null;
  patientId?: string;
  reportSuiteType?: ReportSuiteType;
  status?: RecordState;
  summaryItems?: string;
}

export interface PatientDiagnosis {
  clinicalStatus?: string | null;
  comment?: string | null;
  createdBy?: string;
  createdDate?: string;
  diagnosisId?: string;
  diagnosisName?: string;
  id?: string;
  isFromAutoInformSetting?: boolean;
  isSync?: boolean;
  isTherapy?: boolean;
  modifiedBy?: string;
  modifiedDate?: string | null;
  onSetDate?: string;
  patientId?: string;
  principalDiagnosis?: boolean;
  reportSuiteType?: ReportSuiteType;
  status?: RecordState;
  summaryItems?: string;
}

export interface PatientFacilityForm extends PatientDevice {
  facilityLibraryId?: string;
}

export interface PatientContactNumber {
  isValid: boolean;
  name: string;
  number: string;
}

export interface PatientContact {
  addressLine1: string;
  addressLine2: string;
  contactNumber: PatientContactNumber[];
  contactTypes: string;
  createdBy: string;
  createdDate: string;
  email: string;
  fullName: string;
  id: string;
  isSync: boolean;
  modifiedBy: string;
  modifiedDate: string;
  patientId: string;
  pccContactId: string;
  relationship: string;
}

// PatientSingleDTO
export interface Patient {
  facilityId: string;
  isSync: boolean;
  lastSyncDateTime?: string;
  patientAdmissionDate?: string;
  patientBirthDate?: string | null;
  patientContacts: PatientContact[];
  patientFirstName?: string;
  patientFullName?: string;
  patientGender?: null;
  patientId?: string;
  patientLastName?: string;
  patientShortId?: string;
  patientStatus: PatientStatus;
  pccPatientId?: string;
  pccuOrgId?: string;
  physicianFirstName?: string | null;
  physicianFullName?: null;
  physicianId?: string;
  physicianLastName?: string | null;
  physicianMiddleName?: null;
  physicianSuffix?: string | null;
  status: RecordState;
  patientDevices: PatientDevice[];
  patientDiagnoses: PatientDiagnosis[];
  patientFacilityForms: PatientFacilityForm[];
}

export interface PatientSimple {
  completedArbitration: number;
  completedReports: number;
  firstName: string;
  fullName: string;
  fullViewedCount: number;
  id: string;
  isSync: boolean;
  isoSent: boolean;
  isoViewed: boolean;
  lastName: string;
  name: string;
  patientStatus: number;
  pendingArbitration: number;
  pendingReports: number;
}
