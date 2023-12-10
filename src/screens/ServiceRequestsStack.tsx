import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import ActiveServicesScreen from "./ActiveServicesScreen";

import ActiveServiceDetailsScreen from "./ActiveServiceDetailsScreen";
import CustomHeader from "../components/layout/CustomHeader";

export type RootStackParamList = {
  activeServices: undefined;
  activeServicesDetails: { serviceRequestId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProps = NavigationProp<RootStackParamList>;

const ServiceRequestsStack = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{ header: CustomHeader }}>
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
