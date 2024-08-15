import useUserFacilities from '../useUserFacilities';
import { hasPermissionViewAutoISOReports } from '../../utils/permissions';
import useAuth from '../useAuth';

const usePermissionAutoIso = () => {
  const auth = useAuth();
  const { user } = auth || {};
  const userFacilities = useUserFacilities();
  const { selectedFacilityData } = userFacilities || {};

  const permittedViewAutoIso = hasPermissionViewAutoISOReports({ selectedFacilityData, user });
  return {
    permittedViewAutoIso,
  };
};

export default usePermissionAutoIso;
