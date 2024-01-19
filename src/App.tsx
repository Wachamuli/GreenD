import { useCallback, useState } from "react";
import {
  NavigationContainer,
  NavigationProp,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import dayjs from "dayjs";
import "dayjs/locale/es";

import { supabase } from "./lib/supabase";
// import { calendarSetup } from "./utilities/calendarSetup";
import LoginScreen from "./screens/LoginScreen";
import IndexTabs from "./screens/IndexTabs";
import SignUpScreen from "./screens/SignUpScreen";
import PasswordRecoveryScreen from "./screens/PasswordRecoveryScreen";
import { View } from "react-native";
import CustomHeader from "./components/layout/CustomHeader";

dayjs.locale("es");
// calendarSetup("es");

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255, 255, 255)",
  },
};

export type RootStackParamList = {
  login: undefined;
  index: undefined;
  signUp: undefined;
  passwordRecovery: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProp = NavigationProp<RootStackParamList>;

SplashScreen.preventAutoHideAsync();

const App = (): JSX.Element => {
  const [isSignedIn, setSignedIn] = useState(false);

  supabase.auth.onAuthStateChange(event => {
    switch (event) {
      case "SIGNED_IN":
        setSignedIn(true);
        break;
      case "SIGNED_OUT":
        setSignedIn(false);
        break;
      case "PASSWORD_RECOVERY":
        break;
    }
  });

  const [fontsLoaded, fontsError] = useFonts({
    ffNormal: require("./assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    ffItalic: require("./assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
    ffBold: require("./assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    ffBoldItalic: require("./assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
    ffBlack: require("./assets/fonts/Montserrat/static/Montserrat-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontsError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return <></>;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            header: CustomHeader,
          }}>
          {isSignedIn ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="index"
              component={IndexTabs}
            />
          ) : (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="login"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{ title: "Regístrate" }}
                name="signUp"
                component={SignUpScreen}
              />
              <Stack.Screen
                options={{ title: "Recuperar contraseña" }}
                name="passwordRecovery"
                component={PasswordRecoveryScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
