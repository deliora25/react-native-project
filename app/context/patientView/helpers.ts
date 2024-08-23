import { LIBRARY_TYPE_ID } from "@/app/constants";
import { CheckboxFilters, FilteredDocumentLibrary } from "./types";

const { TREATMENT, DIAGNOSIS, FACILITY } = LIBRARY_TYPE_ID;

export const filterDocumentLibraryCheckboxes = (
  items: FilteredDocumentLibrary,
  checkboxes: CheckboxFilters
) => {
  const { diagnoses, treatments, facility } = checkboxes || {};

  const itemsArray = Object.values(items);

  let filteredArray = [];

  if (diagnoses && treatments && facility) {
    filteredArray = itemsArray;
  } else if (!diagnoses && !treatments && !facility) {
    filteredArray = itemsArray;
  } else {
    filteredArray = itemsArray.filter((item) => {
      if (item.formLibraryType === TREATMENT && treatments) {
        return true;
      }

      if (item.formLibraryType === DIAGNOSIS && diagnoses) {
        return true;
      }

      if (item.formLibraryType === FACILITY && facility) {
        return true;
      }

      return false;
    });
  }

  const documentLibraryObject: FilteredDocumentLibrary = filteredArray.reduce((obj, current) => {
    const { formLibraryType, diagnosisId, deviceId } = current;

    let id = "";

    if (formLibraryType === DIAGNOSIS) {
      id = diagnosisId;
    } else if (formLibraryType === TREATMENT) {
      id = deviceId;
    } else if (formLibraryType === FACILITY) {
      // Visited, need more context
      // TODO: deviceId should be facilityLibraryId
      // Waiting for backend
      id = deviceId;
    }

    return { ...obj, [id]: { ...current } };
  }, {});

  return documentLibraryObject;
};

export const getUpdatedDocLibraryChecked = ({
  library,
  checked,
  id,
}: {
  library: FilteredDocumentLibrary;
  checked: boolean;
  id?: string;
}) => {
  let updatedDocumentLibrary = { ...library };

  if (id) {
    const docLibrary = updatedDocumentLibrary[id];

    if (docLibrary) {
      updatedDocumentLibrary = {
        ...updatedDocumentLibrary,
        [id]: {
          ...docLibrary,
          checked,
        },
      };
    }
  }

  return updatedDocumentLibrary;
};

export const getUpdatedDocLibraryMultiChecked = ({
  library,
  checked,
  ids,
}: {
  library: FilteredDocumentLibrary;
  checked: boolean;
  ids: string[];
}) => {
  let updatedDocumentLibrary = { ...library };

  if (ids && Array.isArray(ids)) {
    ids.forEach((id) => {
      updatedDocumentLibrary = getUpdatedDocLibraryChecked({
        library: updatedDocumentLibrary,
        checked,
        id,
      });
    });
  }

  return updatedDocumentLibrary;
};
