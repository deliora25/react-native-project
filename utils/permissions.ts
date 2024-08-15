import { USER_TYPE } from "@/constants/userTypes";
import { User } from "@/types/model/user";

const { BASIC_USER, MANAGER, ADMINISTRATOR, INFORMED_USER, INFORMED_ADMIN } =
  USER_TYPE;

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
