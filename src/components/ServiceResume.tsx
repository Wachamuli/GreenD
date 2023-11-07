import React from "react";
import { View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/HomeScreen";
import Par from "./Par";
import Header from "./Header";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceResume">;

const ServiceResume = ({ route }: ScreenProps) => {
  return (
    <View>
      <Header title="Resumen" />
      {route.params.selectedDetails.map((value, index) => (
        <Par key={index}>{index + ":"}{value}</Par>
      ))}
      <Par>Day: {route.params.selectedDay}</Par>
      <Par>OutsourcerID: {route.params.selectedOutsourcer}</Par>
      <Par>Note: {route.params.note}</Par>
    </View>
  );
};

export default ServiceResume;
