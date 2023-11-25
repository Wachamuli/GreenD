import React, { useEffect, useState } from "react";

import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import dayjs from "dayjs";
import "dayjs/locale/es";

import { supabase } from "./lib/supabase";
import { calendarSetup } from "./utilities/calendarSetup";
import LoginScreen from "./screens/LoginScreen";
import IndexScreen from "./screens/IndexScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PasswordRecoveryScreen from "./screens/PasswordRecoveryScreen";

dayjs.locale("es");
calendarSetup("es");

export type RootStackParamList = {
  login: undefined;
  index: undefined;
  signUp: undefined;
  passwordRecovery: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProp = NavigationProp<RootStackParamList>;

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

  // if (isLoading) return <SplashScreen/>

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        {isSignedIn ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="index"
            component={IndexScreen}
          />
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerTitle: "Contáctanos" }}
              name="signUp"
              component={SignUpScreen}
            />
            <Stack.Screen
              options={{ headerTitle: "Recuperación de contraseña" }}
              name="passwordRecovery"
              component={PasswordRecoveryScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
