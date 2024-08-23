import { useState } from "react";
import { Patient, RequestExceptionError } from "../types";
import authClient from "@/services/authClient";

const DEFAULT_ERROR = "An error occurred while fetching patient data.";

export interface GetPatientSendRequestParams {
  patientId: string;
  facilityId: string;
  onSuccess?: (patient: Patient) => void;
  onError?: (message: string) => void;
}

const useGetPatient = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient | null | undefined>(null);

  const sendRequest = async ({
    patientId,
    facilityId,
    onSuccess,
    onError,
  }: GetPatientSendRequestParams) => {
    setLoading(true);
    setErrorMessage(null);
    setPatient(null);
    try {
      const params = {
        facilityId,
      };

      const res = await authClient.get(`/patient/${patientId}`, { params });
      const { status } = res || {};
      if (status === 200 && res.data) {
        if (onSuccess) {
          onSuccess(res.data);
        }
        setPatient(res.data);
      } else {
        if (onError) {
          onError(DEFAULT_ERROR);
        }
        setErrorMessage(DEFAULT_ERROR);
      }
    } catch (e) {
      const errorR = e as RequestExceptionError;
      let errorMessageTemp = DEFAULT_ERROR;

      if (errorR && errorR.response) {
        const { data } = errorR.response || {};
        const { error } = data || {};
        const { message } = error || {};

        if (message) {
          errorMessageTemp = `${message}`;
        }
      }

      setErrorMessage(errorMessageTemp);
      if (onError) {
        onError(errorMessageTemp);
      }
    }
    setLoading(false);
  };

  return {
    errorMessage,
    loading,
    sendRequest,
    patient,
  };
};

export default useGetPatient;
