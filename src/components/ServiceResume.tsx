import React from "react";
import { View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/HomeScreen";
import Gtext from "./Gtext";
import Gheader from "./Gheader";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceResume">;

const ServiceResume = ({ route }: ScreenProps) => {
  return (
    <View>
      <Gheader title="Resumen" />
      {route.params.selectedDetails.map((value, index) => (
        <Gtext key={index}>{value}</Gtext>
      ))}
      <Gheader title={route.params.selectedDay}/>
      <Gtext>{route.params.note}</Gtext>
    </View>
  );
};

export default ServiceResume;
