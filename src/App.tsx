import React from "react";

import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import dayjs from "dayjs";
import "dayjs/locale/es";

import { calendarSetup } from "./utilities/calendarSetup";
import LoginScreen from "./screens/LoginScreen";
import IndexScreen from "./screens/IndexScreen";
import SignUp from "./screens/SignUpScreen";

dayjs.locale("es");
calendarSetup("es");

export type RootStackParamList = {
  login: undefined;
  index: undefined;
  contactUs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProp = NavigationProp<RootStackParamList>;

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="index"
          component={IndexScreen}
        />
        {/* TODO: Forgot password? */}
        <Stack.Screen
          options={{ headerTitle: "Contáctanos" }}
          name="contactUs"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
