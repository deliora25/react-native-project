import { View, FlatList, Text } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Link } from "expo-router";
import { LanguageValue } from "@/app/constants/language";
import { FacilityTypeLibrary } from "@/app/constants";
import { useDocumentLibrary } from "@/app/hooks";

const DocumentLibraryPage = () => {
  //TODO: search function
  const [searchText] = useState("");
  const { documentLibrary, handleGetDocumentLibrary, loading } = useDocumentLibrary();

  const refetchLibrary = async () => {
    handleGetDocumentLibrary({
      formName: searchText,
      language: LanguageValue.ENGLISH,
      facilityTypeLibrary: FacilityTypeLibrary.SNF,
    });
  };

  useEffect(() => {
    handleGetDocumentLibrary({
      formName: searchText,
      language: LanguageValue.ENGLISH,
      facilityTypeLibrary: FacilityTypeLibrary.SNF,
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
                  pathname: pathname,
                  params: { documentLibrary: JSON.stringify(selectedDocument) },
                }}
              >
                {name}
              </Link>
            </View>
          );
        }}
        onRefresh={refetchLibrary}
        refreshing={loading}
        ListHeaderComponent={() => {
          return (
            <View>
              <Text>Header</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default memo(DocumentLibraryPage);
