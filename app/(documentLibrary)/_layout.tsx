import React from "react";
import { Stack } from "expo-router";

const DocumentLibraryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="document-library" options={{ headerShown: false }} />
    </Stack>
  );
};

export default DocumentLibraryLayout;
