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
  const [totalActiveServices, setTotalActiveServices] = useState<number>();

  useEffect(() => {
    const getActiveRequests = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      
      const { data: totalRequests, error: totalRequestsError } = await supabase
        .from("service_requests")
        .select("*", { head: true, count: "exact" })
        .eq("user_id", user?.id ?? "");

      console.log(totalRequests);
      // setTotalActiveServices(data)
    };

    getActiveRequests();
  }, []);

  useEffect(() => {
    const subscription = navigation.addListener("beforeRemove", event => {
      event.preventDefault();
      BackHandler.exitApp();
    });

    return subscription;
  });

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
