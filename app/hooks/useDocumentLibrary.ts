import { useContext } from "react";
import { Context as DocumentLibraryContext } from "../context/DocumentLibraryContext";

const useDocumentLibrary = () => {
  return useContext(DocumentLibraryContext);
};

export default useDocumentLibrary;
