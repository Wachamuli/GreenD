import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faFileInvoice,
  faHome,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import ServiceList from "./components/ServiceList";
import MyProfileScreen from "./screens/MyProfileScreen";
import ActiveServicesScreen from "./screens/ActiveServicesScreen";
import HistorialScreen from "./screens/HistorialScreen";

const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="home">
        <Tab.Screen
          name="home"
          component={ServiceList}
          options={{
            title: "Inicio",
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
    </NavigationContainer>
  );
};

export default App;
