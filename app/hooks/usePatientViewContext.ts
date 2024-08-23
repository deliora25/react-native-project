import { useContext } from "react";
import { Context as PatientViewContext } from "../context/PatientViewContext";

const usePatientViewContext = () => {
  return useContext(PatientViewContext);
};

export default usePatientViewContext;
