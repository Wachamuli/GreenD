import React from "react";

import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import dayjs from "dayjs";
import "dayjs/locale/es";

import { supabase } from "./lib/supabase";
import { calendarSetup } from "./utilities/calendarSetup";
import LoginScreen from "./screens/LoginScreen";
import IndexScreen from "./screens/IndexScreen";

dayjs.locale("es");
calendarSetup("es");

export type RootStackParamList = {
  login: undefined;
  index: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProp = NavigationProp<RootStackParamList>;

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="index" component={IndexScreen} />
        {/* TODO: Forgot password? */}
        {/* TODO: Cantact us */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
