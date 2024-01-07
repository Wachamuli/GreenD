import { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFileInvoice,
  faHome,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { supabase } from "../lib/supabase";
import HomeStack from "./HomeStack";
import MyProfileScreen from "./MyProfileScreen";
import HistorialScreen from "./HistorialScreen";
import { navigationProp } from "../App";
import ServiceRequestsStack from "./ServiceRequestsStack";
import CustomTabs from "../components/layout/CustomTabs";

const Tab = createBottomTabNavigator();

const IndexTabs = () => {
  const navigation = useNavigation<navigationProp>();
  const [totalActiveServices, setTotalActiveServices] = useState<string>();

  // TODO: This function is also defined and called in ActiveServicesScreen.
  // There's must be a way to take its value from there and bring it to here
  // to avoid code duplication and sustained maintainability.
  const getActiveRequests = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { error: totalRequestsError, count: totalRequests } = await supabase
      .from("service_requests")
      .select("*", { head: true, count: "exact" })
      .eq("user_id", user?.id ?? "")
      .or("status.eq.Pending, status.eq.Confirmed, status.eq.InProgress")

    const total = totalRequests === 0 ? undefined : totalRequests;

    setTotalActiveServices(total?.toString());
  };

  useEffect(() => {
    getActiveRequests();
  }, []);

  useEffect(() => {
    const subscription = navigation.addListener("beforeRemove", event => {
      event.preventDefault();
      BackHandler.exitApp();
    });

    return subscription;
  }, [navigation]);

  return (
    <Tab.Navigator
      id="tabBar"
      initialRouteName="home"
      tabBar={CustomTabs}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: props => <FontAwesomeIcon icon={faHome} {...props} />,
        }}
      />
      <Tab.Screen
        name="requests"
        component={ServiceRequestsStack}
        options={{
          title: "Solicitudes",
          headerShown: false,
          tabBarIcon: props => <FontAwesomeIcon icon={faSpinner} {...props} />,
          tabBarBadge: totalActiveServices,
        }}
      />
      <Tab.Screen
        name="historial"
        component={HistorialScreen}
        options={{
          title: "Historial",
          tabBarIcon: props => (
            <FontAwesomeIcon icon={faFileInvoice} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="myProfile"
        component={MyProfileScreen}
        options={{
          title: "Mi Perfil",
          tabBarIcon: props => <FontAwesomeIcon icon={faUser} {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default IndexTabs;
