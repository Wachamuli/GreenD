import React from "react";

import { NavigationProp } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ServiceList from "../components/ServiceList";
import ServiceDetails from "../components/ServiceDetails";

export type RootStackParamList = {
  serviceList: undefined;
  serviceDetails: { serviceId: string };
};

// Use this one just for navigation
export type navigationProp = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="serviceList"
        component={ServiceList}
        options={{ headerTitle: "Inicio" }}
      />
      <Stack.Screen
        name="serviceDetails"
        component={ServiceDetails}
        options={{ headerTitle: "Detalles del servicio" }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
