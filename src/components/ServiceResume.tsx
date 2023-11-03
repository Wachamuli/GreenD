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
        <Par key={index}>{value}</Par>
      ))}
      <Header title={route.params.selectedDay}/>
      <Par>{route.params.selectedOutsourcer}</Par>
      <Par>{route.params.note}</Par>
    </View>
  );
};

export default ServiceResume;
