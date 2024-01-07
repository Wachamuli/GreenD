import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import ActiveServicesScreen from "./ActiveServicesScreen";

import ActiveServiceDetailsScreen from "./ActiveServiceDetailsScreen";
import CustomHeader from "../components/layout/CustomHeader";
import ReportScreen from "./ReportScreen";

export type RootStackParamList = {
  activeServices: undefined;
  activeServicesDetails: { serviceRequestId: string };
  report: { serviceRequestId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProps = NavigationProp<RootStackParamList>;

const ServiceRequestsStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="activeServices"
      screenOptions={{ header: CustomHeader }}>
      <Stack.Screen
        name="activeServices"
        component={ActiveServicesScreen}
        options={{ title: "Solicitudes" }}
      />
      <Stack.Screen
        name="activeServicesDetails"
        component={ActiveServiceDetailsScreen}
        options={{ title: "Detalles de solicitud" }}
      />
      {/* <Stack.Screen
        name="payment"
        component={ReportScreen}
        options={{ title: "El pago" }}
      /> */}
      <Stack.Screen
        name="report"
        component={ReportScreen}
        options={{ title: "Reporte sobre la solicitud" }}
      />
    </Stack.Navigator>
  );
};

export default ServiceRequestsStack;
