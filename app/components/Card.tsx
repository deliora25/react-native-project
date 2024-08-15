import * as React from "react";
import { Card, Text } from "react-native-paper";

type Props = {
  title: string;
  onPress: () => void;
};

const CustomCard = ({ title, onPress }: Props) => (
  <Card onPress={onPress} style={{ marginVertical: 8 }}>
    <Card.Content>
      <Text variant="labelLarge">{title}</Text>
    </Card.Content>
  </Card>
);

export default CustomCard;
