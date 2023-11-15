import React, { useEffect } from "react";
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

import HomeScreen from "./HomeScreen";
import MyProfileScreen from "./MyProfileScreen";
import HistorialScreen from "./HistorialScreen";
import { navigationProp } from "../App";
import ActiveServicesScreen from "./ActiveServicesScreen";
import { moderateScale } from "../utilities/metrics";
import Par from "../components/Par";
import BottomTab from "../components/layout/BottomTab";

const Tab = createBottomTabNavigator();

const IndexScreen = () => {
  const navigation = useNavigation<navigationProp>();

  useEffect(() => {
    navigation.addListener("beforeRemove", event => {
      event.preventDefault();
      BackHandler.exitApp();
    });
  });

  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={BottomTab}
      sceneContainerStyle={
        {
          // padding: moderateScale(10),
        }
      }
      screenOptions={{ tabBarHideOnKeyboard: true }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: props => <FontAwesomeIcon icon={faHome} {...props} />,
        }}
      />
      <Tab.Screen
        name="solicitudes"
        component={ActiveServicesScreen}
        options={{
          title: "Solicitudes",
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

export default IndexScreen;
