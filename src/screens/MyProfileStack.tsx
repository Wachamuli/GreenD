import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";

import CustomHeader from "../components/layout/CustomHeader";
import MyProfileScreen from "./MyProfileScreen";

export type RootStackParamList = {
  myProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type navigationProps = NavigationProp<RootStackParamList>;

const MyProfileStack = (): JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{ header: CustomHeader }}>
      <Stack.Screen
        name="myProfileScreen"
        component={MyProfileScreen}
        options={{ title: "Mi Perfil" }}
      />
    </Stack.Navigator>
  );
};
export default MyProfileStack;
