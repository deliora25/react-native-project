import { View } from "react-native";
import React from "react";
import CustomCard from "../Card";
import { FacilityTypeLibrary } from "@/app/constants/facility";
import { usePermissionDocumentLibrary } from "@/app/hooks/permissions";

type Props = {
  onCardPress: (route: string) => void;
  route: string;
  clientStaffDocumentLibraryLabel: string;
};

const DocumentLibraryCard = ({ onCardPress, route, clientStaffDocumentLibraryLabel }: Props) => {
  const { canViewAllLibrary } = usePermissionDocumentLibrary();

  return (
    <View>
      {canViewAllLibrary ? (
        <>
          <CustomCard
            title="SNF Library"
            onPress={() => onCardPress(`${route}?facilityTypeLibrary=${FacilityTypeLibrary.SNF}`)}
          />
          <CustomCard
            title="ANF Library"
            onPress={() => onCardPress(`${route}?facilityTypeLibrary=${FacilityTypeLibrary.ALF}`)}
          />
        </>
      ) : (
        <CustomCard
          title={clientStaffDocumentLibraryLabel}
          onPress={() => onCardPress(`${route}?facilityTypeLibrary=${FacilityTypeLibrary.SNF}`)}
        />
      )}
    </View>
  );
};

export default DocumentLibraryCard;
