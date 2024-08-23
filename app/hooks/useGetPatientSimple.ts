import { useState } from "react";
import { PatientSimple, RequestExceptionError } from "../types";
import authClient from "@/services/authClient";

const useGetPatientSimple = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendRequest = async ({
    facilityId,
    onSuccess,
  }: {
    facilityId: string;
    onSuccess: (patients: PatientSimple[]) => void;
  }) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccess(false);

    const params = {
      facilityId,
    };

    try {
      const res = await authClient.get("/patient/simple", {
        params,
      });
      const { status } = res || {};
      if (status === 200 && res.data) {
        onSuccess(res.data);
        setSuccess(true);
      } else {
        setErrorMessage("An error occurred while fetching list of patient");
      }
    } catch (e) {
      const errorException = e as RequestExceptionError;
      let errorMessageTemp = "An error occurred while fetching list of patient. Code 2";

      if (errorException && errorException.response) {
        const { data } = errorException.response || {};
        const { error } = data || {};
        const { message } = error || {};
        if (message) {
          errorMessageTemp = message;
        }
      }
      setErrorMessage(errorMessageTemp);
    }
    setLoading(false);
  };

  return {
    errorMessage,
    loading,
    sendRequest,
    success,
  };
};

export default useGetPatientSimple;
