import { FeatureId } from "@/app/constants/features";
import { USER_TYPE } from "@/app/constants/userTypes";
import { User } from "../types/model/user";
import { Facility } from "../types/facility";

const { MANAGER, ADMINISTRATOR, INFORMED_USER, INFORMED_ADMIN } = USER_TYPE;

interface UserAndFacilityParams {
  user?: User | null;
  facility?: Facility | null;
}

export const isInformedStaff = ({ user }: { user?: User | null }) => {
  const { userRole } = user || {};
  if (userRole === INFORMED_USER || userRole === INFORMED_ADMIN) {
    return true;
  }

  return false;
};

export const isClientStaff = ({ user }: { user?: User | null }) => {
  const { userRole } = user || {};
  if (userRole === ADMINISTRATOR || userRole === MANAGER) {
    return true;
  }

  return false;
};

export const isClientAdmin = ({ user }: { user?: User | null }) => {
  const { userRole } = user || {};
  if (userRole === ADMINISTRATOR) {
    return true;
  }

  return false;
};

export const hasPermissionViewAllLibrary = ({ user }: { user: User | null | undefined }) => {
  return isInformedStaff({ user });
};

export const hasPermissionAddFacilityDocumentLibrary = ({
  user,
  facility,
}: UserAndFacilityParams) => {
  const { isWrittenAgreementAccepted } = facility || {};

  if (!isWrittenAgreementAccepted) return false;
  return isClientAdmin({ user });
};

export const hasPermissionViewAutoISOReports = ({
  selectedFacilityData,
  user,
}: {
  selectedFacilityData?: Facility | null;
  user?: User | null;
}) => {
  if (isClientStaff({ user })) {
    let value = false;
    if (selectedFacilityData) {
      const { facilityFeatures } = selectedFacilityData || {};
      const hasAutoISOReport = facilityFeatures.find((x) => x.featureId === FeatureId.AUTO_ISO);
      if (hasAutoISOReport) {
        const { canView } = hasAutoISOReport || {};
        value = canView;
      }
      return value;
    }
  }

  return false;
};

export const hasPermissionAutoInformSettings = ({ user, facility }: UserAndFacilityParams) => {
  if (facility) {
    const { isWrittenAgreementAccepted } = facility || {};

    if (!isWrittenAgreementAccepted) return false;
  }

  return isClientStaff({ user });
};
