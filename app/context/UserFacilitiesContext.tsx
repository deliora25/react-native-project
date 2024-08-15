import {
  createContext,
  useReducer,
  useEffect,
  PropsWithChildren,
  FC,
  useMemo,
} from "react";
import { isInformedStaff } from "../utils/permissions";
import { State, Action } from "./userFacilities/types";
import { FACILITY_ACCOUNT_STATUS } from "@/app/constants/facility";
import { FeatureId } from "@/app/constants/features";
import {
  RESET,
  SET_FACILITIES,
  SET_FACILITIES_AND_SELECTED_FACILITY,
  SET_SELECTED_FACILITY,
} from "./userFacilities/constants";
import useAuth from "../hooks/useAuth";
import useGetFacility from "../hooks/useGetFacility";
import { UserFacility } from "../types/model/user";
import { FacilityFeature } from "../types/facility";

const { SUSPEND_STATUS, CANCEL_STATUS, ACTIVE_STATUS } =
  FACILITY_ACCOUNT_STATUS;

const initialState: State = {
  errorMessageGetFacility: "",
  facilities: [],
  facilitySummaryReportFeature: false,
  handleAddAutoISOSetting: () => {},
  handleSetFacilities: () => {},
  handleSetFacilityFeatures: () => {},
  handleSetFacilityIsWrittenAgreementAccepted: () => {},
  handleSetSelectedFacility: () => {},
  handleSetSelectedFacilityShowArbitrationCount: () => {},
  handleSetSelectedFacilityShowMenuButtons: () => {},
  handleSetSelectedFacilityShowReportsCount: () => {},
  handleSetSelectedFacilityShowTitlePage: () => {},
  handleUpdateAutoISOSetting: () => {},
  initialized: false,
  isFacilityActive: false,
  isFacilityCancelledSuspended: false,
  loading: false,
  loadingGetFacility: false,
  refetchFacility: () => {},
  selectedFacility: null,
  selectedFacilityData: null,
};

export const Context = createContext(initialState);

const reducer = (state: State, action: Action) => {
  const { type } = action;
  switch (type) {
    case SET_FACILITIES: {
      const { facilities } = action;

      return {
        ...state,
        facilities,
      };
    }

    case SET_SELECTED_FACILITY: {
      const { selectedFacility } = action;

      return {
        ...state,
        selectedFacility,
      };
    }

    case RESET: {
      return initialState;
    }

    case SET_FACILITIES_AND_SELECTED_FACILITY: {
      const { facilities, selectedFacility } = action;

      return {
        ...state,
        facilities,
        selectedFacility,
        initialized: true,
      };
    }

    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ProviderProps = {};

export const Provider: FC<PropsWithChildren<ProviderProps>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { facilities, selectedFacility, initialized } = state;
  const {
    sendRequest: sendRequestGetFacility,
    loading: loadingGetFacility,
    facility: selectedFacilityData,
    errorMessage: errorMessageGetFacility,
    handleSetSelectedFacilityShowReportsCount,
    handleSetSelectedFacilityShowArbitrationCount,
    handleSetFacilityFeatures,
    handleSetSelectedFacilityShowMenuButtons,
    handleSetSelectedFacilityShowTitlePage,
    handleSetFacilityIsWrittenAgreementAccepted,
    handleUpdateAutoISOSetting,
    handleAddAutoISOSetting,
  } = useGetFacility();
  const { facilityFeatures } = selectedFacilityData || {};

  const { loadingUser, user } = useAuth();
  const {
    defaultFacilityId,
    facilities: userFacilities,
    id: userId,
  } = user || {};

  const { accountStatus } = selectedFacilityData || {};
  const isFacilityCancelledSuspended = accountStatus
    ? [SUSPEND_STATUS, CANCEL_STATUS].includes(accountStatus)
    : false;
  const isFacilityActive = ACTIVE_STATUS === accountStatus;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleSetFacilities = ({
    facilities,
  }: {
    facilities: UserFacility[];
  }) => {
    dispatch({ type: SET_FACILITIES, facilities });
  };

  const handleSetSelectedFacility = ({
    facility,
  }: {
    facility: UserFacility;
  }) => {
    dispatch({ type: SET_SELECTED_FACILITY, selectedFacility: facility });
    const { id } = facility || {};

    if (id) {
      sendRequestGetFacility({ facilityId: id });
    } else {
      // eslint-disable-next-line no-console
      console.error("Unable to fetch the selected facility.");
    }
  };

  const handleReset = () => {
    dispatch({ type: RESET });
  };

  const handleSetFacilitiesAndSelectedFacility = ({
    facility,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    facilities,
  }: {
    facility: UserFacility;
    facilities: UserFacility[];
  }) => {
    dispatch({
      type: SET_FACILITIES_AND_SELECTED_FACILITY,
      selectedFacility: facility,
      facilities,
    });
  };

  const refetchFacility = () => {
    const { id } = selectedFacility || {};
    if (id) {
      sendRequestGetFacility({ facilityId: id });
    }
  };

  useEffect(() => {
    handleReset();
  }, [userId]);

  useEffect(() => {
    if (!initialized) {
      if (
        defaultFacilityId &&
        userFacilities &&
        Array.isArray(userFacilities)
      ) {
        const defaultSelectedFacility = userFacilities.find(
          (x) => x.id === defaultFacilityId
        );
        if (defaultSelectedFacility) {
          handleSetFacilitiesAndSelectedFacility({
            facility: defaultSelectedFacility,
            facilities: userFacilities,
          });
        } else if (userFacilities.length > 0) {
          handleSetFacilitiesAndSelectedFacility({
            facility: userFacilities[0],
            facilities: userFacilities,
          });
        }
      } else {
        handleReset();
      }

      if (defaultFacilityId && user && !isInformedStaff({ user })) {
        sendRequestGetFacility({ facilityId: defaultFacilityId });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFacilities, defaultFacilityId, initialized, user]);

  const facilitySummaryReportFeature = useMemo(() => {
    const currentAddOn: FacilityFeature | undefined = facilityFeatures
      ? facilityFeatures.find((y) => y.featureId === FeatureId.SUMMARY_REPORTS)
      : undefined;
    if (currentAddOn) {
      const { canView } = currentAddOn;
      if (canView) {
        return true;
      }
    }
    return false;
  }, [facilityFeatures]);

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        errorMessageGetFacility,
        facilities,
        facilitySummaryReportFeature,
        handleAddAutoISOSetting,
        handleSetFacilities,
        handleSetFacilityFeatures,
        handleSetFacilityIsWrittenAgreementAccepted,
        handleSetSelectedFacility,
        handleSetSelectedFacilityShowArbitrationCount,
        handleSetSelectedFacilityShowMenuButtons,
        handleSetSelectedFacilityShowReportsCount,
        handleSetSelectedFacilityShowTitlePage,
        handleUpdateAutoISOSetting,
        initialized,
        isFacilityActive,
        isFacilityCancelledSuspended,
        loading: loadingUser,
        loadingGetFacility,
        refetchFacility,
        selectedFacility,
        selectedFacilityData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
