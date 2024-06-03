import { useEffect, useState } from "react";

import { Stack, SplashScreen, router } from "expo-router";
import { useFonts } from "expo-font";
import dayjs from "dayjs";
import CustomHeader from "../components/layout/CustomHeader";
import { supabase } from "../lib/supabase";

dayjs.locale("es");
// calendarSetup("es");
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontsError] = useFonts({
    ffNormal: require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    ffItalic: require("../assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
    ffBold: require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    ffBoldItalic: require("../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
    ffBlack: require("../assets/fonts/Montserrat/static/Montserrat-Black.ttf"),
  });

  supabase.auth.onAuthStateChange(events => {
    switch (events) {
      case "SIGNED_IN":
        router.replace("/home");
        break;
      case "SIGNED_OUT":
        router.replace("/");
        break;
      // TODO: We need to move this in a new layout only
      // for the password recovery flow
      case "PASSWORD_RECOVERY":
        router.push("/password-recovery-new");
        break;
    }
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
    <Stack screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" options={{ title: "Crea una cuenta" }} />
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
  );
};

export default RootLayout;
