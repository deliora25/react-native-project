import { useState } from "react";
import { AutoIsoSetting, Facility, FacilityFeature } from "../types/facility";
import authClient from "@/services/authClient";
import { RequestExceptionError } from "../types/common/api";

const GENERAL_ERROR_MESSAGE = "An error occurred while fetching facility data.";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FacilityData extends Facility {}

const useGetFacility = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [facility, setFacility] = useState<FacilityData | undefined>();
  const [isCalled, setIsCalled] = useState<boolean>(false);

  const handleSetAccountManagerName = ({ accountManagerName }: { accountManagerName: string }) => {
    if (!facility) return;
    setFacility({ ...facility, accountManagerName });
  };

  const handleSetTrainingDetails = ({ date, name }: { date: string; name: string }) => {
    if (!facility) return;
    setFacility({ ...facility, trainorDate: date, trainorName: name });
  };

  const handleSetSubscriptionRate = ({ rate }: { rate: number }) => {
    if (!facility) return;
    setFacility({ ...facility, rate });
  };

  const handleSetContractAgreementOptions = ({ value }: { value: number }) => {
    if (!facility) return;
    setFacility({ ...facility, pendingSubscriptionTerm: value });
  };

  const handleSetSelectedFacilityShowReportsCount = ({ value }: { value: boolean }) => {
    if (!facility) return;
    setFacility({ ...facility, showReportsCount: value });
  };
  const handleSetSelectedFacilityShowArbitrationCount = ({ value }: { value: boolean }) => {
    if (!facility) return;
    setFacility({ ...facility, showArbitrationCount: value });
  };

  const handleSetSelectedFacilityShowMenuButtons = ({ value }: { value: boolean }) => {
    if (!facility) return;
    setFacility({ ...facility, showMenuButtons: value });
  };

  const handleSetSelectedFacilityShowTitlePage = ({ value }: { value: boolean }) => {
    if (!facility) return;
    setFacility({ ...facility, showTitlePage: value });
  };

  const handleUpdateAutoISOSetting = ({ isoSetting }: { isoSetting: AutoIsoSetting }) => {
    if (!facility) return;
    const { autoISOSettings = [] } = facility || {};

    const updatedAutoIsoSettings = autoISOSettings.map((x) => {
      if (x.id === isoSetting.id) {
        return isoSetting;
      }
      return x;
    });

    setFacility({ ...facility, autoISOSettings: updatedAutoIsoSettings });
  };

  const handleAddAutoISOSetting = ({ isoSetting }: { isoSetting: AutoIsoSetting }) => {
    if (!facility) return;
    const { autoISOSettings = [] } = facility || {};

    const updatedAutoIsoSettings = [...autoISOSettings, isoSetting];

    setFacility({ ...facility, autoISOSettings: updatedAutoIsoSettings });
  };

  const handleSetFacilityFeatures = ({ data }: { data: FacilityFeature }) => {
    if (!facility) return;

    const { facilityFeatures = [] } = facility || {};
    const { canCreate, canDelete, canEdit, canView } = data || {};
    const existingFeature = facilityFeatures.find((x) => x.featureId === data.featureId);
    if (existingFeature) {
      const updatedFacilityFeatures = facilityFeatures.map((x) =>
        x.featureId === data.featureId ? { ...x, canCreate, canDelete, canEdit, canView } : x
      );

      setFacility({ ...facility, facilityFeatures: updatedFacilityFeatures });
    } else {
      const updatedFacilityFeatures = [...facility.facilityFeatures, data];
      setFacility({ ...facility, facilityFeatures: updatedFacilityFeatures });
    }
  };

  const handleSetFacilityBillingEmail = ({ billingEmail }: { billingEmail: string }) => {
    if (!facility) return;
    const { facilityBilling } = facility || {};
    setFacility({
      ...facility,
      facilityBilling: {
        ...facilityBilling,
        email: billingEmail,
      },
    });
  };

  const handleSetArbitrationAgreement = ({ value }: { value: string }) => {
    if (!facility) return;
    setFacility({ ...facility, arbitrationLibraryId: value });
  };

  const handleSetFacilityIsWrittenAgreementAccepted = (value: boolean) => {
    if (!facility) return;
    setFacility({ ...facility, isWrittenAgreementAccepted: value });
  };

  const sendRequest = async ({ facilityId }: { facilityId: string }) => {
    setLoading(true);
    setErrorMessage(null);
    setIsCalled(true);

    try {
      const res = await authClient.get(`/facility/${facilityId}`);
      const { status } = res || {};
      if (status === 200 && res.data) {
        setFacility(res.data);
      } else {
        setErrorMessage(GENERAL_ERROR_MESSAGE);
        setFacility(undefined);
      }
    } catch (e) {
      const error = e as RequestExceptionError;
      let errorMessageTemp = GENERAL_ERROR_MESSAGE;
      if (error && error.response) {
        const { data } = error.response || {};
        const { error: errorMessageData } = data || {};
        const { message } = errorMessageData || {};
        if (message) {
          errorMessageTemp = message;
        }
      }
      setErrorMessage(errorMessageTemp);
      setFacility(undefined);
    }
    setLoading(false);
  };

  return {
    errorMessage,
    facility,
    handleAddAutoISOSetting,
    handleSetAccountManagerName,
    handleSetArbitrationAgreement,
    handleSetContractAgreementOptions,
    handleSetFacilityBillingEmail,
    handleSetFacilityFeatures,
    handleSetFacilityIsWrittenAgreementAccepted,
    handleSetSelectedFacilityShowArbitrationCount,
    handleSetSelectedFacilityShowMenuButtons,
    handleSetSelectedFacilityShowReportsCount,
    handleSetSelectedFacilityShowTitlePage,
    handleSetSubscriptionRate,
    handleSetTrainingDetails,
    handleUpdateAutoISOSetting,
    isCalled,
    loading,
    sendRequest,
  };
};

export default useGetFacility;
