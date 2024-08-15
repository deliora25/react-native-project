import { createContext, useReducer, FC, PropsWithChildren } from "react";
import {
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
} from "./auth/constants";
import reducer from "./auth/reducer";
import { SignInParams } from "./auth/types";
import { initialState } from "./auth/initialState";
import {
  clearSyncPccValues,
  clearTokens,
  getRefreshToken,
  setTokens,
} from "@/services/asyncStorage";
import { API_VERSION } from "@/app/constants/api";
import { isClientStaff, isInformedStaff } from "../utils/permissions";
import { User } from "../types/model/user";
import authClient from "@/services/authClient";
import { RequestExceptionError } from "../types/common/api";
import guestClient from "@/services/guestClient";

export const Context = createContext(initialState);

// eslint-disable-next-line @typescript-eslint/ban-types
type ProviderProps = {};

export const Provider: FC<PropsWithChildren<ProviderProps>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = state || {};
  const userIsClientStaff = isClientStaff({ user });
  const userIsInformedStaff = isInformedStaff({ user });

  const resetUserMenuLinks = () => {
    dispatch({ type: RESET_USER_MENU_LINKS });
  };

  const setUserName = ({ userName }: { userName: string }) => {
    dispatch({ type: SET_USER_NAME, userName });
  };

  const setLoginLoading = ({ loading }: { loading: boolean }) => {
    dispatch({ type: SET_LOGIN_LOADING, loading });
  };

  const logInError = ({ errorMessage }: { errorMessage: string }) => {
    dispatch({ type: ADD_LOGIN_ERROR, errorMessage });
  };

  const setLoadingUser = ({ loading }: { loading: boolean }) => {
    dispatch({ type: SET_USER_LOADING, loading });
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const setUser = ({ user }: { user: User }) => {
    dispatch({ type: ADD_USER, user });
  };

  const removeUser = () => {
    dispatch({ type: REMOVE_USER });
  };

  const setJustLogin = ({ value }: { value: boolean }) => {
    dispatch({ type: SET_JUST_LOGIN, value });
  };

  const resetLoginState = () => {
    dispatch({ type: RESET_LOGIN_STATE });
  };

  const handleSetIsAuthenticated = ({
    isAuthenticated,
  }: {
    isAuthenticated: boolean;
  }) => {
    dispatch({ type: SET_IS_AUTHENTICATED, isAuthenticated });
  };

  const getUser = async () => {
    setLoadingUser({ loading: true });
    try {
      const res = await authClient.get("/user/me");
      const { status, data } = res || {};

      if (status === 200) {
        if (data) {
          setUser({ user: data });
          handleSetIsAuthenticated({ isAuthenticated: true });
          return;
        }
      }
      // eslint-disable-next-line no-console
      console.error(`Unable to get user`);
      setLoadingUser({ loading: false });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Unable to get user`);
      setLoadingUser({ loading: false });
      const error = e as RequestExceptionError;
      const { message } = error.data?.error || {};

      if (message) {
        logInError({ errorMessage: message });
      } else {
        logInError({
          errorMessage: "An error occurred while trying to login.",
        });
      }
    }
  };

  //   const confirmAgreement = async () => {
  //     try {
  //       const res = await authClient.put(`/user/${userId}/sign-agreement`);
  //       const { status } = res || {};
  //       if (status === 200 || status === 204) {
  //         dispatch({ type: CONFIRM_AGREEMENT });
  //         getUser();
  //         return;
  //       }
  //       // eslint-disable-next-line no-console
  //       console.error(`An error occurred while confirming the agreement`);
  //     } catch (e) {
  //       // eslint-disable-next-line no-console
  //       console.error(`An error occurred while confirming the agreement ${JSON.stringify(e)}`);
  //     }
  //   };

  const signOut = async () => {
    handleSetIsAuthenticated({ isAuthenticated: false });

    try {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        return;
      }

      removeUser();
      clearTokens();
      clearSyncPccValues();

      const res = await authClient.post("/auth/token/revoke", {
        refreshToken,
      });

      const { status } = res || {};
      if (status === 200) {
        return;
      }

      console.error(`An error occurred while trying to logout.`);
    } catch (e) {
      clearTokens();
      console.error(
        `An error occurred while trying to logout. exception ${JSON.stringify(
          e
        )}`
      );
    }
  };

  const signIn = async ({
    userName,
    password,
    code,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    state,
    redirectUri,
    successCallback,
    loginSuccessWithMFA,
  }: SignInParams) => {
    setLoginLoading({ loading: true });
    setJustLogin({ value: true });
    let res;

    try {
      if (code && state) {
        console.log(`test 1`);
        res = await guestClient.post(
          `/${API_VERSION}/auth/token/pointclickcare`,
          {
            code,
            state,
            redirectUri,
          }
        );
      } else {
        res = await guestClient.post(`/${API_VERSION}/auth/token/connect`, {
          userName,
          password,
        });
      }
      const { status, data } = res || {};
      if (status === 200) {
        if (data) {
          const {
            access_Token: accessToken,
            refresh_Token: refreshToken,
            isMFAEnabled,
          } = data;

          if (isMFAEnabled) {
            if (loginSuccessWithMFA)
              return loginSuccessWithMFA(accessToken, refreshToken);
            logInError({
              errorMessage:
                "An error occurred while trying to login. No MFA implementation.",
            });
            return null;
          }
          if (accessToken && refreshToken) {
            setTokens({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            setLoadingUser({ loading: true });
            getUser();
            handleSetIsAuthenticated({ isAuthenticated: true });
            successCallback();
            return null;
          }
        }
      }
      logInError({ errorMessage: "An error occurred while trying to login." });
    } catch (e) {
      const error = e as RequestExceptionError;
      const { message } = error.data?.error || {};

      if (message) {
        logInError({ errorMessage: message });
      } else {
        logInError({
          errorMessage: "An error occurred while trying to login.",
        });
      }
    }
    return null;
  };

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        ...state,
        userIsClientStaff,
        userIsInformedStaff,
        // confirmAgreement,
        getUser,
        handleSetIsAuthenticated,
        removeUser,
        resetLoginState,
        resetUserMenuLinks,
        setJustLogin,
        setUser,
        setUserName,
        signIn,
        signOut,
        setLoadingUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
