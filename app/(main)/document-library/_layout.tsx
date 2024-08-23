import React from "react";
import { Stack } from "expo-router";

const DocumentLibraryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Document Library" }} />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default DocumentLibraryLayout;
