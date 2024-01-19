import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ServiceList from "../components/ServiceList";
import ServiceDetails from "../components/ServiceDetails";
import ServiceResume from "../components/ServiceResume";
import Txt from "../components/Txt";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";
import CustomHeader from "../components/layout/CustomHeader";
import { ColorPalette } from "../styles/colorPalette";

export type RootStackParamList = {
  serviceList: undefined;
  serviceDetails: { serviceId: string };
  serviceResume: {
    serviceId: string;
    selectedDetails: string[];
    selectedDay: string;
    selectedTime: string;
    selectedOutsourcer: string;
    note: string | undefined;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProp = NavigationProp<RootStackParamList>;

const HomeStack = (): JSX.Element => {
  const [condominium, setCondomium] = useState("");

  const getCondominiums = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) Alert.alert(error.message);

    if (error) Alert.alert(error.message);

    const { data, error: er } = await supabase
      .from("condominiums")
      .select("name")
      .eq("id", user?.user_metadata.condominium)
      .single();

    if (er) Alert.alert(er.message);

    if (!data?.name) {
      Alert.alert(
        "Condominio no encontrado",
        "No se ha podido encontrar su condominio, adiós",
        [
          {
            text: "Entendido",
            onPress: async () => {
              await supabase.auth.signOut();
              BackHandler.exitApp();
            },
            style: "cancel",
          },
        ],
      );
    }

    setCondomium(data?.name ?? "Sin condominio");
  };

  useEffect(() => {
    getCondominiums();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ header: CustomHeader }}>
      <Stack.Screen
        name="serviceList"
        component={ServiceList}
        options={{
          title: "Inicio",
          headerRight: () => (
            <Txt
              style={{ color: ColorPalette.secondary }}>
              {condominium}
            </Txt>
          ),
        }}
      />
      <Stack.Screen
        name="serviceDetails"
        component={ServiceDetails}
        options={{ title: "Detalles del servicio" }}
      />
      <Stack.Screen
        name="serviceResume"
        component={ServiceResume}
        options={{ title: "Resumen del servicio" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
