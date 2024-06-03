import { useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ServiceList from "../components/ServiceList";
import ServiceDetails from "../app/(tabs)/home/details";
import ServiceResume from "../app/(tabs)/home/resume";
import Txt from "../components/info/Txt";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";
import CustomHeader from "../components/layout/CustomHeader";
import { ColorPalette } from "../styles/colorPalette";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { horizontalScale, moderateScale } from "../utilities/metrics";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import AllServicesScreen from "./AllServicesScreen";
import ServiceBookingScreen from "../app/(tabs)/home/booking";

export type RootStackParamList = {
  serviceList: undefined;
  allServices: undefined;
  serviceDetails: { serviceId: string };
  serviceBooking: {
    serviceId: string;
    selectedDetails: string[];
    selectedOutsourcer: string;
    note: string | undefined;
  };
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
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <FontAwesomeIcon
                icon={faLocationDot}
                color={ColorPalette.secondary}
                style={{ marginRight: horizontalScale(5) }}
              />
              <Txt
                style={{ color: ColorPalette.secondary, fontFamily: "ffBold" }}>
                {condominium}
              </Txt>
            </View>
          ),
          headerRight: () => (
            <FontAwesomeIcon icon={faBell} size={moderateScale(25)} />
          ),
        }}
      />
      <Stack.Screen
        name="allServices"
        component={AllServicesScreen}
        options={{ title: "Servicios" }}
      />
      <Stack.Group>
        <Stack.Screen name="serviceDetails" component={ServiceDetails} />
        <Stack.Screen
          name="serviceBooking"
          component={ServiceBookingScreen}
          options={{ title: "Agendar" }}
        />
        <Stack.Screen
          name="serviceResume"
          component={ServiceResume}
          options={{ title: "Resumen" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
