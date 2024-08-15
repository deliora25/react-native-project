import { State, Action } from "./types";
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
} from "./constants";
import { initialState } from "./initialState";
import { MenuLink, UserPermissionMenuLinksDto } from "@/app/types/model/user";

const authReducer = (state: State, action: Action) => {
  const { type } = action;

  switch (type) {
    case SET_USER_NAME: {
      const { userName } = action;

      if (!state.user) return state;
      return { ...state, user: { ...state.user, userName } };
    }

    case RESET_USER_MENU_LINKS: {
      return {
        ...state,
        menuLinks: [],
      };
    }

    case ADD_USER: {
      const { user } = action;
      const { userMenuLinks } = user;

      let menuLinks: MenuLink[] = [];

      if (userMenuLinks && Array.isArray(userMenuLinks)) {
        menuLinks = (userMenuLinks as UserPermissionMenuLinksDto[]).filter(
          (x) => {
            const { canView } = x || {};

            if (canView) return true;
            return false;
          }
        );
      }

      return {
        ...state,
        loginError: null,
        user,
        menuLinks,
        loginLoading: false,
        loadingUser: false,
      };
    }

    case SET_USER_LOADING: {
      const { loading } = action;
      return {
        ...state,
        loadingUser: loading,
      };
    }

    case REMOVE_USER: {
      return {
        ...state,
        loginError: null,
        menuLinks: [],
        user: null,
        isAuthenticated: false,
      };
    }

    case ADD_LOGIN_ERROR: {
      const { errorMessage } = action;
      return {
        ...state,
        loginError: errorMessage,
        loginLoading: false,
      };
    }

    case SET_LOGIN_LOADING: {
      const { loading } = action;
      return {
        ...state,
        loginLoading: loading,
      };
    }

    case RESET_LOGIN_STATE: {
      return {
        ...initialState,
      };
    }

    case SET_JUST_LOGIN: {
      const { value } = action;
      return {
        ...state,
        justLoggedIn: value,
      };
    }

    case SET_IS_AUTHENTICATED: {
      const { isAuthenticated } = action;
      return {
        ...state,
        isAuthenticated,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
