import useAuth from '../useAuth';
import useUserFacilities from '../useUserFacilities';
import { hasPermissionAutoInformSettings } from '../../utils/permissions';

const usePermissionAutoInformSettings = () => {
  const { user } = useAuth();

  const userFacilities = useUserFacilities();
  const { selectedFacilityData } = userFacilities || {};

  const canViewAutoInformSettings = hasPermissionAutoInformSettings({
    user,
    facility: selectedFacilityData,
  });
  return {
    canViewAutoInformSettings,
  };
};

export default usePermissionAutoInformSettings;
