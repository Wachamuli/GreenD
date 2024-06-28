import { useEffect } from "react";

import { Stack, SplashScreen, useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { useFonts } from "expo-font";
import dayjs from "dayjs";

import CustomHeader from "../components/layout/CustomHeader";
import { supabase } from "../lib/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

dayjs.locale("es");
// calendarSetup("es");
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const navigation = useNavigation();
  const queryClient = new QueryClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange(events => {
      switch (events) {
        case "SIGNED_IN":
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: "(tabs)" }],
            }),
          );
          break;
        case "SIGNED_OUT":
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: "sign-in" }],
            }),
          );
          break;
        // TODO: We need to move this in a new layout only
        // for the password recovery flow
        case "PASSWORD_RECOVERY":
          // router.navigate("/password-recovery-new");
          break;
      }
    });
  }, []);

  const [fontsLoaded, fontsError] = useFonts({
    ffNormal: require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    ffItalic: require("../assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
    ffBold: require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    ffBoldItalic: require("../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
    ffBlack: require("../assets/fonts/Montserrat/static/Montserrat-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return <></>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ header: CustomHeader }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" options={{ title: "Crea una cuenta" }} />
        <Stack.Screen
          name="confirmation"
          options={{ title: "Confirmar correo" }}
        />
        <Stack.Screen
          name="password-recovery"
          options={{ title: "Recuperar contraseña" }}
        />
        <Stack.Screen
          name="password-recovery-email"
          options={{ title: "Recuperar contraseña" }}
        />
        <Stack.Screen
          name="password-recovery-new"
          options={{ title: "Recuperar contraseña" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
};

export default RootLayout;
