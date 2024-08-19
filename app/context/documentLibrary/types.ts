import { DocumentLibrary } from "@/app/types";
import {
  RESET_FILTERED_DOCUMENT_LIBRARY,
  SET_ARBITRATION_LIBRARY,
  SET_CURRENT_MASTER_ICD_FILENAME,
  SET_DOCUMENT_LIBRARY,
  SET_FILTERED_DOCUMENT_LIBRARY,
} from "./constants";
import { FacilityTypeLibrary } from "@/app/constants";
import { LanguageValue } from "@/app/constants/language";

export type State = {
  // arbitrationErrorMessage: string | null;
  // arbitrationLibrary: DocumentLibrary[];
  // arbitrationLoading: boolean;
  currentMasterIcdFileName: string;
  documentLibrary: DocumentLibrary[];
  errorMessage: string | null;
  filteredDocumentLibrary: DocumentLibrary[];
  loading: boolean;
  handleGetDocumentLibrary: ({
    formName,
    language,
  }: {
    formName?: string;
    language: LanguageValue;
    facilityTypeLibrary?: FacilityTypeLibrary | null;
  }) => void;
  handleGetFilteredDocumentLibrary: ({
    formName,
    language,
  }: {
    formName?: string;
    language: LanguageValue;
    facilityTypeLibrary?: FacilityTypeLibrary | null;
  }) => void;
  handleResetFilteredDocumentLibrary: () => void;
  handleSetCurrentMasterIcdFileName: ({ fileName }: { fileName: string }) => void;
  // handleGetArbitrationLibrary: ({
  //   formName,
  //   language,
  // }: {
  //   formName: string;
  //   language: LanguageValue;
  // }) => void;
};

export type Action =
  | {
      type: typeof SET_DOCUMENT_LIBRARY;
      data: DocumentLibrary[];
    }
  | {
      type: typeof SET_FILTERED_DOCUMENT_LIBRARY;
      data: DocumentLibrary[];
    }
  | {
      type: typeof RESET_FILTERED_DOCUMENT_LIBRARY;
    }
  | {
      type: typeof SET_ARBITRATION_LIBRARY;
      data: DocumentLibrary[];
    }
  | {
      type: typeof SET_CURRENT_MASTER_ICD_FILENAME;
      fileName: string;
    };
