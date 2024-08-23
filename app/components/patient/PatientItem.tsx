import { PatientSimple } from "@/app/types";
import { Link } from "expo-router";
import React, { memo } from "react";
import { Text, View } from "react-native";

type Props = {
  item: PatientSimple;
};

const PatientItem = ({ item }: Props) => (
  <View>
    <Link href={`/patient/${item?.id}`}>
      <Text>{item.fullName}</Text>
    </Link>
  </View>
);

export default memo(PatientItem);
