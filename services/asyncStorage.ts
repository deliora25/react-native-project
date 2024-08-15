import AsyncStorage from "@react-native-async-storage/async-storage";

/* eslint-disable camelcase */
interface SetPccProps {
  activateUserActivationId: string;
  syncPcc: string;
}

interface SetTokensProps {
  access_token: string;
  refresh_token: string;
}

export const setTokens = async ({
  access_token,
  refresh_token,
}: SetTokensProps) => {
  try {
    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("refresh_token", refresh_token);
  } catch (error) {
    console.error("Error setting tokens", error);
  }
};

export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
  } catch (error) {
    console.error("Error clearing tokens", error);
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem("refresh_token");
  } catch (error) {
    console.error("Error getting refresh token", error);
    return null;
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem("access_token");
  } catch (error) {
    console.error("Error getting access token", error);
    return null;
  }
};

export const setPccValues = async ({
  activateUserActivationId,
  syncPcc,
}: SetPccProps) => {
  try {
    await AsyncStorage.setItem(
      "activateUserActivationId",
      activateUserActivationId
    );
    await AsyncStorage.setItem("syncPcc", syncPcc);
  } catch (error) {
    console.error("Error setting PCC values", error);
  }
};

export const getUserId = async () => {
  try {
    return await AsyncStorage.getItem("userId");
  } catch (error) {
    console.error("Error getting user ID", error);
    return null;
  }
};

export const getActivateUserActivationId = async () => {
  try {
    return await AsyncStorage.getItem("activateUserActivationId");
  } catch (error) {
    console.error("Error getting activateUserActivationId", error);
    return null;
  }
};

export const getSyncPcc = async () => {
  try {
    return await AsyncStorage.getItem("syncPcc");
  } catch (error) {
    console.error("Error getting syncPcc", error);
    return null;
  }
};

export const clearSyncPccValues = async () => {
  try {
    await AsyncStorage.removeItem("activateUserActivationId");
    await AsyncStorage.removeItem("syncPcc");
  } catch (error) {
    console.error("Error clearing syncPcc values", error);
  }
};
