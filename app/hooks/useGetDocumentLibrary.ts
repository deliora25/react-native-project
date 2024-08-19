import { useState } from "react";
import { DocumentLibrary, RequestExceptionError } from "../types";
import { FacilityTypeLibrary } from "../constants";
import authClient from "@/services/authClient";

const GENERIC_ERROR = "An error occurred while fetching list of document library.";

interface SendRequestParams {
  formName: string;
  language?: number;
  onSuccess: ({ data }: { data: DocumentLibrary[] }) => void;
  onError: (message: string) => void;
  onLoading: () => void;
  facilityTypeLibrary: FacilityTypeLibrary;
}

interface GetParams {
  formName?: string;
  language?: number;
  facilityTypeLibrary?: FacilityTypeLibrary | null;
}

const useGetDocumentLibrary = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendRequest = async ({
    formName,
    language,
    onSuccess,
    onError,
    onLoading,
    facilityTypeLibrary,
  }: SendRequestParams) => {
    if (!facilityTypeLibrary) {
      // eslint-disable-next-line no-console
      console.log(
        "An error occurred while fetching documents. Please contact support if error persists."
      );
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    if (onLoading) {
      onLoading();
    }
    const params: GetParams = {};

    if (facilityTypeLibrary) {
      params.facilityTypeLibrary = facilityTypeLibrary;
    }

    if (formName) {
      params.formName = formName;
    }

    if (language) {
      params.language = language;
    }

    try {
      const res = await authClient.get("/form/documentlibrary", {
        params,
      });
      const { status } = res || {};
      if (status === 200 && res.data) {
        onSuccess({ data: res.data });
      } else {
        setErrorMessage(GENERIC_ERROR);
        onError(GENERIC_ERROR);
      }
    } catch (e) {
      const error = e as RequestExceptionError;
      let errorMessageTemp = GENERIC_ERROR;

      const { data } = error.response || {};
      const { error: responseError } = data || {};

      if (e && responseError) {
        const { message } = responseError;

        if (message) {
          errorMessageTemp = message;
        }
      }
      setErrorMessage(errorMessageTemp);
      onError(errorMessageTemp);
    }
    setLoading(false);
  };

  return {
    errorMessage,
    loading,
    sendRequest,
  };
};

export default useGetDocumentLibrary;
