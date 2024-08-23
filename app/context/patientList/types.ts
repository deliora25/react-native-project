import { PatientSimple } from "@/app/types";
import { SET_PATIENT_LIST } from "./constants";

export type Action = {
  type: typeof SET_PATIENT_LIST;
  payload: { patients: PatientSimple[] };
};

export type State = {
  patients: PatientSimple[];
  handleGetPatientList: ({ facilityId }: { facilityId: string }) => void;
  success: boolean;
  loading: boolean;
  errorMessage: string | null;
};
