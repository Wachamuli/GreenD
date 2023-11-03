import React from "react";

import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ServiceList from "../components/ServiceList";
import ServiceDetails from "../components/ServiceDetails";
import ServiceResume from "../components/ServiceResume";
import Par from "../components/Par";
import { Condominium } from "../api/mockData";

export type RootStackParamList = {
  serviceList: undefined;
  serviceDetails: { serviceId: string };
  serviceResume: {
    serviceId: string;
    selectedDetails: string[];
    selectedDay: string;
    selectedOutsourcer: string;
    note: string;
  };
};

// Use this one just for navigation
export type navigationProp = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const condominiumName = Condominium[0].condominiumName;

const HomeScreen = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="serviceList"
        component={ServiceList}
        options={{
          headerTitle: "Inicio",
          headerRight: () => <Par>{condominiumName}</Par>,
        }}
      />
      <Stack.Screen
        name="serviceDetails"
        component={ServiceDetails}
        options={{ headerTitle: "Detalles del servicio" }}
      />
      <Stack.Screen
        name="serviceResume"
        component={ServiceResume}
        options={{ headerTitle: "Resumen del servicio" }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
