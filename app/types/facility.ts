import { User } from "./model/user";
import { CustomPermissionDto } from "./permissions";
import { TimezoneInfo } from "./model/timezone";
import { AutoIsoType } from "@/app/constants/autoIso";
import { FacilityTypeCode } from "@/app/constants/facility";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FacilityFeature extends CustomPermissionDto {}

export interface FacilityBilling {
  id?: string | undefined;
  facilityId?: string;
  billingName?: null | string;
  email?: string;
  phone?: null | string;
  cardName?: null | string;
  cardNumber?: null | string;
  cardExp?: null | string;
  cardCvv?: null | string;
  billingScheduleType?: number;
  billingType?: number;
}

export interface AutoIsoSetting {
  autoISODaysAdmission: number;
  autoISODaysAdmissionDelayBuffer: number;
  autoISODaysPreparation: number;
  autoISODaysToBeSend: number;
  autoISOSentTo: number;
  autoISOTimeFrom: string;
  autoISOTimeTo: string;
  facilityId: string;
  id: string;
  status: number;
  type: AutoIsoType;
}
export interface Facility {
  accountManagerName: null | string;
  facilityBilling: FacilityBilling | null;
  facilityFeatures: FacilityFeature[];
  isWrittenAgreementAccepted: boolean;
  pendingSubscriptionTerm: number;
  rate: number;
  showArbitrationCount: boolean;
  showMenuButtons: boolean;
  showReportsCount: boolean;
  trainorDate: null | string;
  trainorName: null | string;
  accountStatus?: number;
  id: string;
  name: string;
  addressLine: string;
  addressLine2: string | null;
  zip: string;
  state: string;
  city: string;
  code: string;
  bedCount: number;
  phone: string;
  fax: string;
  showTitlePage: boolean;
  formStationaryPreview: File;
  autoISOSettings: AutoIsoSetting[];
  patientSyncCount: number;
  users: User[];
  orgId: string;
  orgName: string | null;
  timeZoneInfo: TimezoneInfo;
  facilityType: string;
  facilityTypeCode: FacilityTypeCode;
  subscriptionTerms: number;
  onboardDate: string | null;
  organizationId: string;
  arbitrationLibraryId: string;
  isSync: boolean;
  stateId: number;
}

export interface FacilityRegion {
  id: string;
  organizationId: string;
  name: string | null;
  code: string | null;
  createdBy: string;
  createdDate: string;
  modifiedBy: string | null;
  modifiedDate: string | null;
  status: number;
}

export interface FacilityDocAgreement {
  firstName: string | null;
  lastName: string | null;
  title: string | null;
  address: string | null;
  email: string | null;
  subscriptionTerms: number;
}

export interface EditFacilityData {
  id?: string;
  facilityTypeCode: FacilityTypeCode | null;
  name: string | null;
  description?: string | null;
  phone: string | null;
  fax: string | null;
  addressLine: string | null;
  addressLine2: string | null;
  city: string | null;
  stateId: string | number;
  zip: string | null;
  isSync: boolean;
  organizationId: string | null;
  accountStatus?: number;
  onboardDate?: string | null;
  accountManagerName?: string | null;
  trainorName?: string | null;
  trainorDate?: string | null;
}

export interface FacilityIPAddress {
  id: string;
  ipAddress: string;
  facilityId: string | null;
  name: string | null;
  description: string | null;
  status: number;
}

export type FacilityStatusReport = {
  organizationId: string;
  organizationName: string;
  facilityId: string;
  facilityName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  addressComplete: string;
  subscriptionTerms: number;
  rate: number;
  onboardDate: string;
  accountManagerName: string;
  trainorName: string;
  trainorDate: string;
  patientCount: number;
  currentPatientGeneratedReport: number;
  currentPatientGeneratedReportPercentage: number;
  currentPatientCompletedReport: number;
  currentPatientCompletedReportsPercentage: number;
  daysSinceLastReportGenerated: number;
  historicalReportGenerated: number;
  accountStatus: number;
};

export interface ActivateFacilityDto {
  id: string;
  name: string | null;
  code: string | null;
  status: number;
  accountStatus: number;
  isExistingUser: boolean;
}

export type FacilityDocumentAgreement = {
  activationId: string;
  contractAgreementOption: number;
  documentStorageName: string;
  documentStoragePath: string;
  facilityId: string;
  id: string;
  isSigned: boolean;
  sentTo: null | string;
  signedBy: string;
  signedDate: string;
  status: number;
  signedDateDisplay: string;
};
