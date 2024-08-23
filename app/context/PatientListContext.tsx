import React, { createContext, useReducer, ReactNode } from "react";
import { State } from "./patientList/types";
import { PatientSimple } from "../types";
import reducer from "./patientList/reducer";
import { SET_PATIENT_LIST } from "./patientList/constants";
import useGetPatientSimple from "../hooks/useGetPatientSimple";

interface ProviderProps {
  children: ReactNode;
}

const initialState: State = {
  patients: [],
  handleGetPatientList: () => {},
  success: false,
  loading: false,
  errorMessage: null,
};

export const Context = createContext(initialState);

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sendRequest: getPatientList, success, loading, errorMessage } = useGetPatientSimple();

  const handleSetPatients = (patients: PatientSimple[]) => {
    dispatch({ type: SET_PATIENT_LIST, payload: { patients } });
  };

  const handleGetPatientList = ({ facilityId }: { facilityId: string }) => {
    getPatientList({
      facilityId,
      onSuccess: handleSetPatients,
    });
  };

  const { patients } = state;

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ patients, handleGetPatientList, success, loading, errorMessage }}
    >
      {children}
    </Context.Provider>
  );
};
