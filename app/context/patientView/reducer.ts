import { LIBRARY_TYPE_ID } from "@/app/constants";
import {
  SET_DEVICE_TOGGLE,
  SET_DIAGNOSIS_TOGGLE,
  SET_PATIENT_DEVICE_TOGGLE,
  SET_PATIENT_DEVICES,
  SET_PATIENT_DIAGNOSES,
  SET_PATIENT_DIAGNOSIS_TOGGLE,
  SET_PATIENT,
  SET_DOCUMENT_LIBRARY,
  SET_CHECKBOX_FILTERS,
  SET_PATIENT_FACILITY_LIBRARY_TOGGLE,
  SET_FACILITY_LIBRARY_TOGGLE,
  SET_SELECT_ALL_PATIENT_FACILITY_LIBRARY_FORMS,
  SET_SELECT_ALL_PATIENT_GENERAL_FORMS,
  SET_SELECT_ALL_PATIENT_DIAGNOSIS,
  SET_PATIENT_FACILITY_FORMS,
} from "./constants";

import {
  filterDocumentLibraryCheckboxes,
  getUpdatedDocLibraryChecked,
  getUpdatedDocLibraryMultiChecked,
} from "./helpers";
import {
  Action,
  FilteredDocumentLibrary,
  PatientDeviceWithChecked,
  PatientDiagnosisWithChecked,
  PatientFacilityFormWithChecked,
  State,
} from "./types";

const { TREATMENT, DIAGNOSIS, FACILITY } = LIBRARY_TYPE_ID;

const reducer = (state: State, action: Action) => {
  const { type } = action;

  switch (type) {
    case SET_CHECKBOX_FILTERS: {
      const { name, checked } = action;
      const { documentLibrary, checkboxFilters } = state;

      const updatedCheckboxFilters = {
        ...checkboxFilters,
        [name]: checked,
      };

      const filteredItems = filterDocumentLibraryCheckboxes(
        documentLibrary,
        updatedCheckboxFilters
      );

      return {
        ...state,
        checkboxFilters: {
          ...updatedCheckboxFilters,
        },
        filteredDocumentLibrary: filteredItems,
      };
    }

    case SET_DOCUMENT_LIBRARY: {
      const { library } = action;
      const { checkboxFilters, patient } = state;
      const { patientDevices, patientDiagnoses, patientFacilityForms } = patient || {};

      const documentLibrary: FilteredDocumentLibrary = library.reduce((obj, current) => {
        const { formLibraryType, deviceId, diagnosisId } = current;

        let checked = false;

        if (formLibraryType === DIAGNOSIS) {
          const patientHasDiagnosis =
            patientDiagnoses && Array.isArray(patientDiagnoses)
              ? patientDiagnoses.find((y) => y.diagnosisId === current.diagnosisId)
              : false;
          if (patientHasDiagnosis && patientHasDiagnosis.status === 1) {
            checked = true;
          }
        } else if (formLibraryType === TREATMENT) {
          const patientHasDevice =
            patientDevices && Array.isArray(patientDevices)
              ? patientDevices.find((y) => y.deviceId === current.deviceId)
              : false;

          if (patientHasDevice && patientHasDevice.status === 1) {
            checked = true;
          }
        } else if (formLibraryType === FACILITY) {
          // Visited, need more context
          // TODO: deviceId should be facilityLibraryId
          // Waiting for backend
          const patientHasFacilityLibrary =
            patientFacilityForms && Array.isArray(patientFacilityForms)
              ? patientFacilityForms.find((y) => y.deviceId === current.deviceId)
              : false;

          if (patientHasFacilityLibrary && patientHasFacilityLibrary.status === 1) {
            checked = true;
          }
        }

        let id = "";

        if (formLibraryType === DIAGNOSIS) {
          id = diagnosisId;
        } else if (formLibraryType === TREATMENT) {
          id = deviceId;
        } else if (formLibraryType === FACILITY) {
          // TODO: deviceId should be facilityLibraryId
          // Waiting for backend
          id = deviceId;
        }

        return { ...obj, [id]: { ...current, id, checked } };
      }, {});

      const filteredItems = filterDocumentLibraryCheckboxes(documentLibrary, checkboxFilters);

      return {
        ...state,
        documentLibrary,
        filteredDocumentLibrary: filteredItems,
      };
    }

    case SET_PATIENT_DIAGNOSES: {
      const { patientDiagnoses } = action;

      return {
        ...state,
        patient: {
          ...state.patient,
          patientDiagnoses,
        },
      };
    }

    case SET_PATIENT_DEVICES: {
      const { patientDevices } = action;

      return {
        ...state,
        patient: {
          ...state.patient,
          patientDevices,
        },
      };
    }

    case SET_PATIENT_FACILITY_FORMS: {
      const { patientFacilityForms } = action;
      return {
        ...state,
        patient: {
          ...state.patient,
          patientFacilityForms,
        },
      };
    }

    case SET_DEVICE_TOGGLE: {
      const { device, checked } = action;
      const { deviceId, name } = device || {};
      const { patient, documentLibrary, filteredDocumentLibrary } = state;
      const { patientDevices } = patient || {};
      let newPatientDevices = [...patientDevices];

      const patientSelectedDevice = newPatientDevices.find((x) => x.deviceId === deviceId);

      if (patientSelectedDevice) {
        const { isSync, isFromAutoInformSetting } = patientSelectedDevice;

        if (!checked && !isSync && !isFromAutoInformSetting) {
          newPatientDevices = newPatientDevices.filter((x) => x.deviceId !== deviceId);
        } else {
          newPatientDevices = newPatientDevices.map((x) => {
            if (x.deviceId === deviceId) return { ...x, checked };
            return { ...x };
          });
        }
      } else {
        newPatientDevices = [...newPatientDevices, { deviceId, name, checked }];
      }

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryChecked({
        library: filteredDocumentLibrary,
        checked,
        id: deviceId,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryChecked({
        library: documentLibrary,
        checked,
        id: deviceId,
      });

      return {
        ...state,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientDevices: newPatientDevices,
        },
      };
    }

    case SET_FACILITY_LIBRARY_TOGGLE: {
      const { item, checked } = action;
      // TODO: deviceId should be facilityLibraryId
      //   Waiting for backend
      const { deviceId, name } = item || {};
      const { patient, documentLibrary, filteredDocumentLibrary } = state;
      const { patientFacilityForms } = patient || {};

      let newPatientFacilityForms: PatientFacilityFormWithChecked[] = [];

      if (patientFacilityForms && Array.isArray(patientFacilityForms)) {
        newPatientFacilityForms = [...patientFacilityForms];
      }

      // TODO: deviceId should be facilityLibraryId
      //   Waiting for backend
      const patientSelectedFacilityLibrary = newPatientFacilityForms.find(
        (x) => x.facilityLibraryId === deviceId
      );

      if (patientSelectedFacilityLibrary) {
        const { isSync, isFromAutoInformSetting } = patientSelectedFacilityLibrary;

        if (!checked && !isSync && !isFromAutoInformSetting) {
          newPatientFacilityForms = newPatientFacilityForms.filter(
            (x) => x.facilityLibraryId !== deviceId
          );
        } else {
          newPatientFacilityForms = newPatientFacilityForms.map((x) => {
            if (x.facilityLibraryId === deviceId) return { ...x, checked };
            return { ...x };
          });
        }
      } else {
        newPatientFacilityForms = [
          ...newPatientFacilityForms,
          { facilityLibraryId: deviceId, name, checked },
        ];
      }

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryChecked({
        library: filteredDocumentLibrary,
        checked,
        id: deviceId,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryChecked({
        library: documentLibrary,
        checked,
        id: deviceId,
      });

      return {
        ...state,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientFacilityForms: newPatientFacilityForms,
        },
      };
    }

    case SET_DIAGNOSIS_TOGGLE: {
      const { diagnosis, checked } = action;
      const { diagnosisId, name } = diagnosis || {};
      const { patient, filteredDocumentLibrary, documentLibrary } = state;
      const { patientDiagnoses } = patient || {};
      let newPatientDiagnoses = [...patientDiagnoses];

      const patientSelectedDiagnosis = newPatientDiagnoses.find(
        (x) => x.diagnosisId === diagnosisId
      );

      if (patientSelectedDiagnosis) {
        const { isSync, isFromAutoInformSetting } = patientSelectedDiagnosis;

        if (!checked && !isSync && !isFromAutoInformSetting) {
          newPatientDiagnoses = newPatientDiagnoses.filter((x) => x.diagnosisId !== diagnosisId);
        } else {
          newPatientDiagnoses = newPatientDiagnoses.map((x) => {
            if (x.diagnosisId === diagnosisId) return { ...x, checked };
            return { ...x };
          });
        }
      } else {
        newPatientDiagnoses = [
          ...newPatientDiagnoses,
          { diagnosisId: diagnosis.diagnosisId, name, checked },
        ];
      }

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryChecked({
        library: filteredDocumentLibrary,
        checked,
        id: diagnosisId,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryChecked({
        library: documentLibrary,
        checked,
        id: diagnosisId,
      });

      return {
        ...state,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientDiagnoses: newPatientDiagnoses,
        },
      };
    }
    case SET_PATIENT_FACILITY_LIBRARY_TOGGLE: {
      const { item, checked } = action;

      const { facilityLibraryId } = item || {};
      const { patient, filteredDocumentLibrary, documentLibrary } = state;
      const { patientFacilityForms } = patient || {};
      let selectAll = true;
      let newPatientFacilityForms: PatientFacilityFormWithChecked[] = [];

      if (patientFacilityForms && Array.isArray(patientFacilityForms)) {
        patientFacilityForms.forEach((x) => {
          if (x.facilityLibraryId === facilityLibraryId) {
            if (x.isSync || x.isFromAutoInformSetting) {
              newPatientFacilityForms = [...newPatientFacilityForms, { ...x, checked }];
            }
            if (!checked) {
              selectAll = false;
            }
          } else {
            newPatientFacilityForms = [...newPatientFacilityForms, { ...x }];
            if (!x.checked) {
              selectAll = false;
            }
          }
        });
      }

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryChecked({
        library: filteredDocumentLibrary,
        checked,
        id: facilityLibraryId,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryChecked({
        library: documentLibrary,
        checked,
        id: facilityLibraryId,
      });

      return {
        ...state,
        selectAllFacilityForms: selectAll,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientFacilityForms: newPatientFacilityForms,
        },
      };
    }

    case SET_PATIENT_DEVICE_TOGGLE: {
      const { device, checked } = action;
      const { deviceId } = device || {};
      const { patient, filteredDocumentLibrary, documentLibrary } = state;
      const { patientDevices } = patient || {};
      let selectAll = true;
      let newPatientDevices: PatientFacilityFormWithChecked[] = [];

      patientDevices.forEach((x) => {
        if (x.deviceId === deviceId) {
          if (x.isSync || x.isFromAutoInformSetting) {
            newPatientDevices = [...newPatientDevices, { ...x, checked }];
          }
          if (!checked) {
            selectAll = false;
          }
        } else {
          newPatientDevices = [...newPatientDevices, { ...x }];
          if (!x.checked) {
            selectAll = false;
          }
        }
      });

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryChecked({
        library: filteredDocumentLibrary,
        checked,
        id: deviceId,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryChecked({
        library: documentLibrary,
        checked,
        id: deviceId,
      });

      return {
        ...state,
        selectAllGeneralForms: selectAll,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientDevices: newPatientDevices,
        },
      };
    }

    case SET_PATIENT_DIAGNOSIS_TOGGLE: {
      const { diagnosis, checked } = action;
      const { diagnosisId } = diagnosis || {};
      const { patient, filteredDocumentLibrary, documentLibrary } = state;
      const { patientDiagnoses } = patient || {};
      let selectAll = true;
      let newPatientDiagnoses: PatientDiagnosisWithChecked[] = [];

      patientDiagnoses.forEach((x) => {
        if (x.diagnosisId === diagnosisId) {
          if (x.isSync || x.isFromAutoInformSetting) {
            newPatientDiagnoses = [...newPatientDiagnoses, { ...x, checked }];
          }
          if (!checked) {
            selectAll = false;
          }
        } else {
          newPatientDiagnoses = [...newPatientDiagnoses, { ...x }];
          if (!x.checked) {
            selectAll = false;
          }
        }
      });

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryChecked({
        library: filteredDocumentLibrary,
        checked,
        id: diagnosisId,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryChecked({
        library: documentLibrary,
        checked,
        id: diagnosisId,
      });
      return {
        ...state,
        selectAllDiagnoses: selectAll,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientDiagnoses: newPatientDiagnoses,
        },
      };
    }

    case SET_SELECT_ALL_PATIENT_FACILITY_LIBRARY_FORMS: {
      const { checked } = action;
      const { patient, filteredDocumentLibrary, documentLibrary } = state;
      const { patientFacilityForms } = patient || {};
      let newPatientFacilityForms: PatientFacilityFormWithChecked[] = [];
      let ids: string[] = [];

      patientFacilityForms.forEach((x) => {
        if (x.facilityLibraryId) {
          ids = [...ids, x.facilityLibraryId];
        }
        if (checked) {
          newPatientFacilityForms = [...newPatientFacilityForms, { ...x, checked }];
        } else if (x.isSync || x.isFromAutoInformSetting) {
          newPatientFacilityForms = [...newPatientFacilityForms, { ...x, checked }];
        }
      });

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryMultiChecked({
        library: filteredDocumentLibrary,
        checked,
        ids,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryMultiChecked({
        library: documentLibrary,
        checked,
        ids,
      });
      return {
        ...state,
        selectAllFacilityForms: checked,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientFacilityForms: newPatientFacilityForms,
        },
      };
    }

    case SET_SELECT_ALL_PATIENT_GENERAL_FORMS: {
      const { checked } = action;
      const { patient, filteredDocumentLibrary, documentLibrary } = state;
      const { patientDevices } = patient || {};
      let newPatientDevices: PatientDeviceWithChecked[] = [];
      let ids: string[] = [];

      patientDevices.forEach((x) => {
        if (x.deviceId) {
          ids = [...ids, x.deviceId];
        }

        if (checked) {
          newPatientDevices = [...newPatientDevices, { ...x, checked }];
        } else if (x.isSync || x.isFromAutoInformSetting) {
          newPatientDevices = [...newPatientDevices, { ...x, checked }];
        }
      });

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryMultiChecked({
        library: filteredDocumentLibrary,
        checked,
        ids,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryMultiChecked({
        library: documentLibrary,
        checked,
        ids,
      });
      return {
        ...state,
        selectAllGeneralForms: checked,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientDevices: newPatientDevices,
        },
      };
    }

    case SET_SELECT_ALL_PATIENT_DIAGNOSIS: {
      const { checked } = action;
      const { patient, filteredDocumentLibrary, documentLibrary } = state;
      const { patientDiagnoses } = patient || {};
      let newPatientDiagnoses: PatientDiagnosisWithChecked[] = [];
      let ids: string[] = [];

      patientDiagnoses.forEach((x) => {
        if (x.diagnosisId) {
          ids = [...ids, x.diagnosisId];
        }
        if (checked) {
          newPatientDiagnoses = [...newPatientDiagnoses, { ...x, checked }];
        } else if (x.isSync || x.isFromAutoInformSetting) {
          newPatientDiagnoses = [...newPatientDiagnoses, { ...x, checked }];
        }
      });

      const updatedFilteredDocumentLibrary = getUpdatedDocLibraryMultiChecked({
        library: filteredDocumentLibrary,
        checked,
        ids,
      });

      const updatedDocumentLibrary = getUpdatedDocLibraryMultiChecked({
        library: documentLibrary,
        checked,
        ids,
      });
      return {
        ...state,
        selectAllDiagnoses: checked,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: updatedFilteredDocumentLibrary,
        patient: {
          ...state.patient,
          patientDiagnoses: newPatientDiagnoses,
        },
      };
    }

    case SET_PATIENT: {
      const { checkboxFilters, documentLibrary } = state;
      const { patient } = action;
      const { patientDevices, patientDiagnoses, patientFacilityForms } = patient || {};

      let updatedDocumentLibrary = { ...documentLibrary };

      let checkedPatientDevices: PatientDeviceWithChecked[] = [];
      let checkedPatientDiagnoses: PatientDiagnosisWithChecked[] = [];
      let checkedPatientFacilityForms: PatientFacilityFormWithChecked[] = [];

      if (patientDevices && Array.isArray(patientDevices)) {
        checkedPatientDevices = patientDevices.map((x) => {
          const { isSync, status, isFromAutoInformSetting, deviceId } = x;
          if (isSync || isFromAutoInformSetting) {
            const checked = status === 1;

            if (deviceId) {
              const docLibrary = updatedDocumentLibrary[deviceId];
              if (docLibrary) {
                updatedDocumentLibrary = {
                  ...updatedDocumentLibrary,
                  [deviceId]: {
                    ...docLibrary,
                    checked,
                  },
                };
              }
            }

            return {
              ...x,
              checked,
              name: x.deviceName,
              formLibraryType: LIBRARY_TYPE_ID.TREATMENT,
            };
          }

          if (deviceId) {
            const docLibrary = updatedDocumentLibrary[deviceId];

            if (docLibrary) {
              updatedDocumentLibrary = {
                ...updatedDocumentLibrary,
                [deviceId]: {
                  ...docLibrary,
                  checked: true,
                },
              };
            }
          }
          return {
            ...x,
            checked: true,
            name: x.deviceName,
            formLibraryType: LIBRARY_TYPE_ID.DIAGNOSIS,
          };
        });
      }

      if (patientDiagnoses && Array.isArray(patientDiagnoses)) {
        checkedPatientDiagnoses = patientDiagnoses.map((x) => {
          const { isSync, status, isFromAutoInformSetting, diagnosisId } = x;

          if (isSync || isFromAutoInformSetting) {
            const checked = status === 1;
            if (diagnosisId) {
              const docLibrary = updatedDocumentLibrary[diagnosisId];

              if (docLibrary) {
                updatedDocumentLibrary = {
                  ...updatedDocumentLibrary,
                  [diagnosisId]: {
                    ...docLibrary,
                    checked,
                  },
                };
              }
            }

            return {
              ...x,
              checked,
              name: x.diagnosisName,
              formLibraryType: LIBRARY_TYPE_ID.TREATMENT,
            };
          }

          if (diagnosisId) {
            const docLibrary = updatedDocumentLibrary[diagnosisId];

            if (docLibrary) {
              updatedDocumentLibrary = {
                ...updatedDocumentLibrary,
                [diagnosisId]: {
                  ...docLibrary,
                  checked: true,
                },
              };
            }
          }

          return {
            ...x,
            checked: true,
            name: x.diagnosisName,
            formLibraryType: LIBRARY_TYPE_ID.DIAGNOSIS,
          };
        });
      }

      if (patientFacilityForms && Array.isArray(patientFacilityForms)) {
        checkedPatientFacilityForms = patientFacilityForms.map((x) => {
          const { isSync, status, isFromAutoInformSetting, deviceId } = x;
          if (isSync || isFromAutoInformSetting) {
            const checked = status === 1;
            if (deviceId) {
              const docLibrary = updatedDocumentLibrary[deviceId];

              if (docLibrary) {
                updatedDocumentLibrary = {
                  ...updatedDocumentLibrary,
                  [deviceId]: {
                    ...docLibrary,
                    facilityLibraryId: deviceId,
                    checked,
                  },
                };
              }
            }

            return {
              ...x,
              checked,
              facilityLibraryId: deviceId,
              name: x.deviceName,
              formLibraryType: LIBRARY_TYPE_ID.FACILITY,
            };
          }

          if (deviceId) {
            const docLibrary = updatedDocumentLibrary[deviceId];

            if (docLibrary) {
              updatedDocumentLibrary = {
                ...updatedDocumentLibrary,
                [deviceId]: {
                  ...docLibrary,
                  facilityLibraryId: deviceId,
                  checked: true,
                },
              };
            }
          }
          return {
            ...x,
            checked: true,
            name: x.deviceName,
            facilityLibraryId: deviceId,
            formLibraryType: LIBRARY_TYPE_ID.DIAGNOSIS,
          };
        });
      }
      // visited, need more context
      // TODO: Need to implement the patient facilityLibrary
      // Waiting for backend

      const filteredItems = filterDocumentLibraryCheckboxes(
        updatedDocumentLibrary,
        checkboxFilters
      );

      return {
        ...state,
        documentLibrary: updatedDocumentLibrary,
        filteredDocumentLibrary: filteredItems,
        patient: {
          ...patient,
          patientDiagnoses: [...checkedPatientDiagnoses],
          patientDevices: [...checkedPatientDevices],
          patientFacilityForms: [...checkedPatientFacilityForms],
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
