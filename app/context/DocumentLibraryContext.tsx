import React, { createContext, useReducer, FC, PropsWithChildren } from "react";
import useGetDocumentLibrary from "../hooks/useGetDocumentLibrary";
import {
  SET_DOCUMENT_LIBRARY,
  SET_ARBITRATION_LIBRARY,
  SET_CURRENT_MASTER_ICD_FILENAME,
  SET_FILTERED_DOCUMENT_LIBRARY,
  RESET_FILTERED_DOCUMENT_LIBRARY,
} from "./documentLibrary/constants"; // Update with the correct path
import { initialState } from "./documentLibrary/initialState"; // Update with the correct path
import { State, Action } from "./documentLibrary/types"; // Update with the correct path
import { DocumentLibrary } from "../types";
import { LanguageValue } from "../constants/language";
import { FacilityTypeLibrary } from "../constants";

// Create Context
export const Context = createContext(initialState);

// Reducer Function
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_DOCUMENT_LIBRARY:
      return {
        ...state,
        documentLibrary: action.data,
        filteredDocumentLibrary: action.data,
      };
    case SET_FILTERED_DOCUMENT_LIBRARY:
      return {
        ...state,
        filteredDocumentLibrary: action.data,
      };
    case RESET_FILTERED_DOCUMENT_LIBRARY:
      return {
        ...state,
        filteredDocumentLibrary: state.documentLibrary,
      };
    case SET_ARBITRATION_LIBRARY:
      return {
        ...state,
        arbitrationLibrary: action.data,
      };
    case SET_CURRENT_MASTER_ICD_FILENAME:
      return {
        ...state,
        currentMasterIcdFileName: action.fileName,
      };
    default:
      return state;
  }
};

// Provider Component
export const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { documentLibrary, filteredDocumentLibrary, currentMasterIcdFileName } = state;

  const { errorMessage, loading, sendRequest } = useGetDocumentLibrary();
  //   const {
  //     errorMessage: arbitrationErrorMessage,
  //     loading: arbitrationLoading,
  //     sendRequest: sendRequestArbitrationLibrary,
  //   } = useGetArbitrationReportLibrary();

  const handleSetDocumentLibrary = ({ data }: { data: DocumentLibrary[] }) => {
    dispatch({ type: SET_DOCUMENT_LIBRARY, data });
  };

  const onLoadingFilteredDocumentLibrary = () => {
    //TODO: add loading state
  };

  const handleSetFilteredDocumentLibrary = (data: DocumentLibrary[]) => {
    dispatch({ type: SET_FILTERED_DOCUMENT_LIBRARY, data });
  };

  const handleResetFilteredDocumentLibrary = () => {
    dispatch({ type: RESET_FILTERED_DOCUMENT_LIBRARY });
  };

  // const handleSetArbitrationLibrary = (data: DocumentLibrary[]) => {
  //   dispatch({ type: SET_ARBITRATION_LIBRARY, data });
  // };

  const onError = () => {
    handleSetDocumentLibrary({ data: [] });
  };

  const onSuccess = ({ data }: { data: DocumentLibrary[] }) => {
    handleSetDocumentLibrary({ data });
  };

  const handleGetFilteredDocumentLibrary = ({
    formName = "",
    language,
    facilityTypeLibrary = null,
  }: {
    formName?: string;
    language: LanguageValue;
    facilityTypeLibrary?: FacilityTypeLibrary | null;
  }) => {
    if (facilityTypeLibrary === null) return;
    sendRequest({
      formName,
      language,
      onSuccess,
      onError: () => handleSetFilteredDocumentLibrary([]),
      facilityTypeLibrary,
      onLoading: onLoadingFilteredDocumentLibrary,
    });
  };

  const handleGetDocumentLibrary = ({
    formName = "",
    language,
    facilityTypeLibrary = null,
  }: {
    formName?: string;
    language: LanguageValue;
    facilityTypeLibrary?: FacilityTypeLibrary | null;
  }) => {
    if (facilityTypeLibrary === null) return;
    sendRequest({
      formName,
      language,
      onSuccess,
      onError,
      onLoading: () => handleSetDocumentLibrary({ data: [] }),
      facilityTypeLibrary,
    });
  };

  //   const handleGetArbitrationLibrary = ({
  //     formName = "",
  //     language,
  //   }: {
  //     formName: string;
  //     language: number;
  //   }) => {
  //     sendRequestArbitrationLibrary({
  //       formName,
  //       language,
  //       onSuccess: handleSetArbitrationLibrary,
  //       onError: () => handleSetArbitrationLibrary([]),
  //     });
  //   };

  const handleSetCurrentMasterIcdFileName = ({ fileName }: { fileName: string }) => {
    dispatch({ type: SET_CURRENT_MASTER_ICD_FILENAME, fileName });
  };

  return (
    <Context.Provider
      value={{
        // arbitrationErrorMessage,
        // arbitrationLibrary,
        // arbitrationLoading,
        currentMasterIcdFileName,
        documentLibrary,
        errorMessage,
        filteredDocumentLibrary,
        // handleGetArbitrationLibrary,
        handleGetDocumentLibrary,
        handleGetFilteredDocumentLibrary,
        handleResetFilteredDocumentLibrary,
        handleSetCurrentMasterIcdFileName,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
