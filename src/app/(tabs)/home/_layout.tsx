import { useEffect, useState } from "react";
import { Stack } from "expo-router";

import { Alert, BackHandler, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import CustomHeader from "../../../components/layout/CustomHeader";
import Txt from "../../../components/info/Txt";
import { horizontalScale } from "../../../utilities/metrics";
import { ColorPalette } from "../../../styles/colorPalette";
import { supabase } from "../../../lib/supabase";

const HomeLayout = () => {
  const [userCondomium, setUserCondominium] = useState("");

  const getUserCondomium = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      Alert.alert(userError.message);
      return;
    }

    const { data, error: condominiumError } = await supabase
      .from("condominiums")
      .select("name")
      .eq("id", user?.user_metadata.condominium)
      .single();

    if (condominiumError) {
      Alert.alert(condominiumError.message);
      return;
    }

    if (!data.name) {
      Alert.alert(
        "Condominio no encontrado",
        "No se ha podido encontrar su condominio. Intente autenticarse nuevamente.",
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

      return;
    }

    setUserCondominium(data.name);
  };

  useEffect(() => {
    getUserCondomium();
  }, []);

  return (
    <Stack screenOptions={{ header: CustomHeader }}>
      <Stack.Screen
        name="index"
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
                {userCondomium}
              </Txt>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="all-services"
        options={{ title: "Todos los servicios" }}
      />
    </Stack>
  );
};

export default HomeLayout;
