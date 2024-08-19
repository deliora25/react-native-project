import { LanguageValue } from "@/app/constants/language";

export interface DocumentLibraryDocumentFile {
  id: string;
  displayName: string;
  filePath: string;
  fileName: string;
  language: LanguageValue;
}

export enum LibraryTypeId {
  ALL = 0,
  TREATMENT = 1,
  DIAGNOSIS = 2,
  FACILITY = 3,
  ARBITRATION = 4,
}

export interface DocumentLibrary {
  arbitrationId: string;
  deviceId: string;
  diagnosisId: string;
  documentFiles: DocumentLibraryDocumentFile[];
  isDefault: boolean;
  documentLibraryId: string;
  facilityId: string;
  facilityTypeLibrary: number;
  formLibraryType: LibraryTypeId;
  name: string;
}
