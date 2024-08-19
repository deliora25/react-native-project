import { MenuLink, User } from "@/app/types/model/user";
import {
  // CONFIRM_AGREEMENT,
  ADD_USER,
  SET_USER_LOADING,
  REMOVE_USER,
  SET_LOGIN_LOADING,
  ADD_LOGIN_ERROR,
  SET_USER_NAME,
  RESET_LOGIN_STATE,
  SET_JUST_LOGIN,
  RESET_USER_MENU_LINKS,
  SET_IS_AUTHENTICATED,
} from "./constants";

export interface SignInParams {
  userName?: string;
  password?: string;
  code?: string | null;
  state?: string | null;
  successCallback: () => void;
  loginSuccessWithMFA?: (accessToken: string, refreshToken: string) => void;
  redirectUri?: string;
}

export type State = {
  user?: User | null;
  menuLinks: MenuLink[];
  loginError?: string | null;
  loginLoading: boolean;
  loadingUser: boolean;
  justLoggedIn: boolean;
  isAuthenticated: boolean;
  confirmAgreement: () => void;
  getUser: () => void;
  removeUser: () => void;
  resetLoginState: () => void;
  resetUserMenuLinks: () => void;
  setJustLogin: ({ value }: { value: boolean }) => void;
  setUser: ({ user }: { user: User }) => void;
  setUserName: ({ userName }: { userName: string }) => void;
  signIn: ({ userName, password, code, state, successCallback }: SignInParams) => void;
  signOut: () => void;
  handleSetIsAuthenticated: ({ isAuthenticated }: { isAuthenticated: boolean }) => void;
  userIsClientStaff?: boolean | null;
  userIsInformedStaff?: boolean | null;
  setLoadingUser: ({ loading }: { loading: boolean }) => void;
};

export type Action =
  | {
      type: typeof ADD_USER;
      user: User;
    }
  | {
      type: typeof SET_USER_LOADING;
      loading: boolean;
    }
  | {
      type: typeof REMOVE_USER;
    }
  | {
      type: typeof SET_LOGIN_LOADING;
      loading: boolean;
    }
  | {
      type: typeof ADD_LOGIN_ERROR;
      errorMessage: string;
    }
  | {
      type: typeof SET_USER_NAME;
      userName: string;
    }
  | {
      type: typeof RESET_LOGIN_STATE;
    }
  | {
      type: typeof SET_JUST_LOGIN;
      value: boolean;
    }
  | {
      type: typeof RESET_USER_MENU_LINKS;
    }
  | {
      type: typeof SET_IS_AUTHENTICATED;
      isAuthenticated: boolean;
    };
