import { UserFacility } from "@/app/types/model/user";
import {
  SET_FACILITIES,
  SET_SELECTED_FACILITY,
  RESET,
  SET_FACILITIES_AND_SELECTED_FACILITY,
} from "./constants";
import { AutoIsoSetting, Facility, FacilityFeature } from "@/app/types/facility";

export type State = {
  errorMessageGetFacility: string | null;
  facilities: UserFacility[];
  facilitySummaryReportFeature: boolean;
  handleAddAutoISOSetting: ({ isoSetting }: { isoSetting: AutoIsoSetting }) => void;
  handleSetFacilities: ({ facilities }: { facilities: UserFacility[] }) => void;
  handleSetFacilityFeatures: ({ data }: { data: FacilityFeature }) => void;
  handleSetFacilityIsWrittenAgreementAccepted: (value: boolean) => void;
  handleSetSelectedFacility: ({ facility }: { facility: UserFacility }) => void;
  handleSetSelectedFacilityShowArbitrationCount: ({ value }: { value: boolean }) => void;
  handleSetSelectedFacilityShowMenuButtons: ({ value }: { value: boolean }) => void;
  handleSetSelectedFacilityShowReportsCount: ({ value }: { value: boolean }) => void;
  handleSetSelectedFacilityShowTitlePage: ({ value }: { value: boolean }) => void;
  handleUpdateAutoISOSetting: ({ isoSetting }: { isoSetting: AutoIsoSetting }) => void;
  initialized: boolean;
  isFacilityActive: boolean;
  isFacilityCancelledSuspended: boolean;
  loading: boolean;
  loadingGetFacility: boolean;
  refetchFacility: () => void;
  selectedFacility: UserFacility | null;
  selectedFacilityData?: Facility | null;
};

export type Action =
  | {
      type: typeof SET_FACILITIES;
      facilities: UserFacility[];
    }
  | {
      type: typeof SET_SELECTED_FACILITY;
      selectedFacility: UserFacility;
    }
  | {
      type: typeof RESET;
    }
  | {
      type: typeof SET_FACILITIES_AND_SELECTED_FACILITY;
      facilities: UserFacility[];
      selectedFacility: UserFacility;
    };
