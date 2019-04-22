import React from "react";
import { Text } from "react-native";

export function renderTextBlocks(text, index) {
  return <Text key={index}>{text}</Text>;
}
