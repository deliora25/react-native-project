import useAuth from "../useAuth";

import {
  hasPermissionAddFacilityDocumentLibrary,
  hasPermissionViewAllLibrary,
} from "../../utils/permissions";
import useUserFacilities from "../useUserFacilities";

const usePermissionDocumentLibrary = () => {
  const auth = useAuth();

  const { user } = auth || {};

  const userFacilities = useUserFacilities();
  const { selectedFacilityData } = userFacilities || {};

  const canAddFacilityDocumentLibrary: boolean = hasPermissionAddFacilityDocumentLibrary({
    user,
    facility: selectedFacilityData,
  });

  const canViewAllLibrary: boolean = hasPermissionViewAllLibrary({
    user,
  });

  return {
    canAddFacilityDocumentLibrary,
    canViewAllLibrary,
  };
};

export default usePermissionDocumentLibrary;
