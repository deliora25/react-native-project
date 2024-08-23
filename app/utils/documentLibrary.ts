import { FacilityTypeCode, FacilityTypeLibrary, FacilityTypeLibraryString } from "../constants";
import { LanguageString, LanguageValue } from "../constants/language";

export const getLanguageFilterIdFromQueryStringWithDefault = (queryString: null | string) => {
  switch (queryString) {
    case LanguageString.ENGLISH:
      return LanguageValue.ENGLISH;
    case LanguageString.SPANISH:
      return LanguageValue.SPANISH;
    default:
      return LanguageValue.ENGLISH;
  }
};

export const getFacilityTypeLibrary = ({
  userIsInformedStaff,
  userIsClientStaff,
  facilityTypeLibraryQuery,
  facilityTypeCode,
}: {
  userIsInformedStaff: boolean | null | undefined;
  userIsClientStaff: boolean | null | undefined;
  facilityTypeLibraryQuery?: string | null;
  facilityTypeCode: FacilityTypeCode | undefined;
}) => {
  if (userIsInformedStaff) {
    if (facilityTypeLibraryQuery === FacilityTypeLibraryString.SNF) return FacilityTypeLibrary.SNF;
    if (facilityTypeLibraryQuery === FacilityTypeLibraryString.ALF) return FacilityTypeLibrary.ALF;
    return FacilityTypeLibrary.NONE;
  }
  if (userIsClientStaff) {
    if (facilityTypeCode === FacilityTypeCode.SNF) return FacilityTypeLibrary.SNF;
    if (facilityTypeCode === FacilityTypeCode.ALF) return FacilityTypeLibrary.ALF;
  }
  return FacilityTypeLibrary.NONE;
};
