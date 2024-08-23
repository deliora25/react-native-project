import { State } from "./types";

export const initialState: State = {
  // arbitrationErrorMessage: null,
  // arbitrationLibrary: [],
  // arbitrationLoading: false,
  currentMasterIcdFileName: "",
  documentLibrary: [],
  errorMessage: null,
  filteredDocumentLibrary: [],
  // handleGetArbitrationLibrary: () => {},
  handleGetDocumentLibrary: () => {},
  handleGetFilteredDocumentLibrary: () => {},
  handleResetFilteredDocumentLibrary: () => {},
  handleSetCurrentMasterIcdFileName: () => {},
  loading: false,
};
