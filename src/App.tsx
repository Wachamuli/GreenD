import React from "react";

import { calendarSetup } from "./utilities/calendarSetup";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import IndexScreen from "./screens/IndexScreen";

calendarSetup("es");

export type RootStackParamList = {
  login: undefined;
  index: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProp = NavigationProp<RootStackParamList>;

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="index" component={IndexScreen} />
        {/* TODO: Forgot password? */ }
        {/* TODO: Cantact us */ }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
