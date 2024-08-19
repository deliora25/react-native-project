/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { getAccessToken } from "@/services/asyncStorage";
import useAuth from "./useAuth";

export const useAuthOne = () => {
  const auth = useAuth();
  const { setLoadingUser, getUser, handleSetIsAuthenticated } = auth || {};

  const [initialTokenLoaded, setInitialTokenLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!initialTokenLoaded) {
      const loadInitialToken = async () => {
        try {
          const token = await getAccessToken();
          if (token) {
            setLoadingUser({ loading: true });
            await getUser();
            handleSetIsAuthenticated({ isAuthenticated: true });
          }

          setInitialTokenLoaded(true);
        } catch (error) {
          console.error(error);
        }
      };
      loadInitialToken();
    }
  }, [initialTokenLoaded, setInitialTokenLoaded]);
  return { initialTokenLoaded };
};
export default useAuthOne;
