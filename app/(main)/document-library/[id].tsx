/* eslint-disable no-console */
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { DocumentLibrary } from "@/app/types";

//TODO: css and function

const DocumentDetail = () => {
  const searchParams = useLocalSearchParams();
  const { id, documentLibrary } = searchParams;
  const navigation = useNavigation();

  // Safely parse the documentLibrary and handle potential parsing errors
  let parsedDocumentLibrary: DocumentLibrary | null = null;

  try {
    parsedDocumentLibrary = JSON.parse(documentLibrary as string);
  } catch (error) {
    console.error("Failed to parse documentLibrary:", error);
  }

  useEffect(() => {
    if (parsedDocumentLibrary) {
      // Set the header title dynamically
      navigation.setOptions({
        headerTitle: parsedDocumentLibrary.name,
      });
    }
  }, [parsedDocumentLibrary]);

  return (
    <View>
      <Text>DocumentDetail id: {id}</Text>
      {parsedDocumentLibrary ? (
        <Text>DocumentDetail name: {parsedDocumentLibrary.name}</Text>
      ) : (
        <Text>Failed to load document details</Text>
      )}
    </View>
  );
};

export default DocumentDetail;
