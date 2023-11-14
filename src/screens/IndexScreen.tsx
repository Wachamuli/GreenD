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
      sceneContainerStyle={{
        // padding: moderateScale(10),
      }}
      screenOptions={{ tabBarHideOnKeyboard: true }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="activeServices"
        component={ActiveServicesScreen}
        options={{
          title: "Servicios Activos",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faSpinner} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="historial"
        component={HistorialScreen}
        options={{
          title: "Historial",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faFileInvoice} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="myProfile"
        component={MyProfileScreen}
        options={{
          title: "Mi Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default IndexScreen;
