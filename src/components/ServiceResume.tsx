import React from "react";
import { View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/HomeScreen";
import Gtext from "./Gtext";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceResume">;

const ServiceResume = ({ route }: ScreenProps) => {
  return (
    <View>
      <Gtext>Service Resume</Gtext>
    </View>
  )
}

export default ServiceResume;
