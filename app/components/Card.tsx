import * as React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

type Props = {
  title: string;
  onPress: () => void;
};

const styles = StyleSheet.create({
  cardContainer: { marginVertical: 8 },
});

const CustomCard = ({ title, onPress }: Props) => (
  <Card onPress={onPress} style={styles.cardContainer}>
    <Card.Content>
      <Text variant="labelLarge">{title}</Text>
    </Card.Content>
  </Card>
);

export default CustomCard;
