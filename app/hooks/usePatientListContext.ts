import { useContext } from "react";
import { Context as PatientListContext } from "../context/PatientListContext";

const usePatientListContext = () => {
  return useContext(PatientListContext);
};

export default usePatientListContext;
