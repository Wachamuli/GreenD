import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import ActiveServicesScreen from "./ActiveServicesScreen";

import ActiveServiceDetailsScreen from "./ActiveServiceDetailsScreen";

export type RootStackParamList = {
  activeServices: undefined;
  activeServicesDetails: { serviceRequestId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProps = NavigationProp<RootStackParamList>;

const ServiceRequestsStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleStyle: { fontFamily: "ffBold" } }}>
      <Stack.Screen
        name="activeServices"
        component={ActiveServicesScreen}
        options={{ title: "Solicitudes" }}
      />
      <Stack.Screen
        name="activeServicesDetails"
        component={ActiveServiceDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default ServiceRequestsStack;
