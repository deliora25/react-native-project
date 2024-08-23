import { State } from "./types";

export const initialState: State = {
  user: null,
  menuLinks: [],
  loginError: null,
  loginLoading: false,
  loadingUser: false,
  justLoggedIn: false,
  isAuthenticated: false,
  confirmAgreement: () => {},
  getUser: () => {},
  removeUser: () => {},
  resetLoginState: () => {},
  resetUserMenuLinks: () => {},
  setJustLogin: () => {},
  setUser: () => {},
  setUserName: () => {},
  signIn: () => {},
  signOut: () => {},
  handleSetIsAuthenticated: () => {},
  setLoadingUser: () => {},
};
