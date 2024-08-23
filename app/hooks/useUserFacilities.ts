import { useContext } from "react";
import { Context as UserFacilitiesContext } from "@/app/context/UserFacilitiesContext";

const useUserFacilities = () => {
  return useContext(UserFacilitiesContext);
};

export default useUserFacilities;
