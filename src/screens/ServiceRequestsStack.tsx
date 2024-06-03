import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import ServiceRequest from "../app/(tabs)/requests";

import ServiceDetails from "../app/(tabs)/requests/details";
import CustomHeader from "../components/layout/CustomHeader";
import Report from "../app/(tabs)/requests/report";

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
        component={ServiceRequest}
        options={{ title: "Solicitudes" }}
      />
      <Stack.Screen
        name="activeServicesDetails"
        component={ServiceDetails}
        options={{ title: "Detalles de solicitud" }}
      />
      {/* <Stack.Screen
        name="payment
        component={ReportScreen}
        options={{ title: "El pago" }}
      /> */}
      <Stack.Screen
        name="report"
        component={Report}
        options={{ title: "Reporte sobre la solicitud" }}
      />
    </Stack.Navigator>
  );
};

export default ServiceRequestsStack;
