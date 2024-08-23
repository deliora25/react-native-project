import { View, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "expo-router";
import { useAuth, useDocumentLibrary, useQuery, useUserFacilities } from "@/app/hooks";
import {
  getFacilityTypeLibrary,
  getLanguageFilterIdFromQueryStringWithDefault,
} from "@/app/utils/documentLibrary";

const DocumentLibraryPage = () => {
  const auth = useAuth();
  const { userIsClientStaff, userIsInformedStaff } = auth || {};

  //TODO: search function
  const [searchText] = useState("");
  const { documentLibrary, handleGetDocumentLibrary, loading } = useDocumentLibrary();
  const userFacilities = useUserFacilities();
  const { selectedFacilityData } = userFacilities || {};
  const { facilityTypeCode } = selectedFacilityData || {};
  const query = useQuery();

  const facilityTypeLibraryQuery = query.get("facilityTypeLibrary");
  const languageQ = query.get("language");

  const facilityTypeLibrary = useMemo(() => {
    const newFacilityTypeLibrary = getFacilityTypeLibrary({
      userIsInformedStaff,
      userIsClientStaff,
      facilityTypeLibraryQuery,
      facilityTypeCode,
    });
    return newFacilityTypeLibrary;
  }, [facilityTypeLibraryQuery, facilityTypeCode, userIsClientStaff, userIsInformedStaff]);

  const languageFilterId = getLanguageFilterIdFromQueryStringWithDefault(languageQ);

  const refetchLibrary = async () => {
    handleGetDocumentLibrary({
      formName: searchText,
      language: languageFilterId,
      facilityTypeLibrary,
    });
  };

  useEffect(() => {
    handleGetDocumentLibrary({
      formName: searchText,
      language: languageFilterId,
      facilityTypeLibrary,
    });
  }, []);

  return (
    <View>
      <FlatList
        data={documentLibrary}
        renderItem={({ item }) => {
          const { documentLibraryId, name } = item;

          const selectedDocument = documentLibrary.find(
            (x) => x.documentLibraryId === documentLibraryId
          );
          const pathname = `/document-library/${documentLibraryId}`;
          return (
            <View>
              <Link
                href={{
                  pathname: pathname as "/document-library",
                  params: {
                    documentLibrary: JSON.stringify(selectedDocument),
                  },
                }}
              >
                {name}
              </Link>
            </View>
          );
        }}
        onRefresh={refetchLibrary}
        refreshing={loading}
      />
    </View>
  );
};

export default DocumentLibraryPage;
