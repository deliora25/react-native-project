import { JobTitles } from "@/constants/jobTitles";
import { FeatureDto } from "./feature";
import { USER_TYPE } from "@/constants/userTypes";

export interface MenuLink {
  id: string;
  label: string;
  status: number;
  features: FeatureDto[];
  route: string;
}

export interface UserFacility {
  accountStatus: number;
  description?: string | null;
  formType: number;
  id: string;
  isVoid: boolean;
  isWrittenAgreementAccepted: boolean;
  name: string;
  orgId: string;
  orgName: string;
  patientStatus: 0;
  status: number;
}

export type AssociatedUserFacilityDto = {
  department: string;
  facilityAccountStatus: number;
  facilityDescription: string;
  facilityId: string;
  facilityName: string;
  facilityStatus: number;
  jobTitleId: JobTitles;
  role: number;
};

export interface User {
  dateOfBirth: string;
  defaultFacilityId: string;
  department: string;
  email: string;
  enableEmailUsers: boolean;
  facilities: UserFacility[];
  fax: string | null;
  firstName: string;
  id: string;
  ipAccess: boolean;
  isAgreementAccepted: boolean;
  isMFAEnabled: boolean;
  jobTitle: string;
  jobTitleId: JobTitles;
  lastName: string;
  middleName: string;
  passwordExpirationDaysLeft: number;
  pccUniqueId: string;
  roleName: string;
  status: number;
  telephone: string;
  title: string;
  userMenuLinks: MenuLink[];
  userName: string;
  userRole: USER_TYPE | undefined;
  userRoleStatus: number;
  isTrainingFinished: boolean;
  trainingSkippedCount: number;
  associatedFacility?: AssociatedUserFacilityDto[];
}

export interface UserPermissionMenuLinksDto extends MenuLink {
  menuLinkId: number;
  canView: boolean;
  canEdit: boolean;
  canCreate: boolean;
  canDelete: boolean;
  isCustom: boolean;
}
