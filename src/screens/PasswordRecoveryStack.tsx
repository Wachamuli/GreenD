import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomHeader from "../components/layout/CustomHeader";
import NewPasswordScreen from "./NewPasswordScreen";
import PasswordRecoveryScreen from "../app/password-recovery";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import PasswordEmailScreen from "../app/password-recovery-email";

export type RootStackParamList = {
  passwordRecoveryScreen: undefined;
  passwordEmailScreen: { email: string };
  newPassword: { email: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const PasswordRecoveryStack = () => {
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  // FIXME: Events are not triggering properly.
  supabase.auth.onAuthStateChange(event => {
    if (event === "PASSWORD_RECOVERY") {
      setPasswordRecovery(true);
      console.log("GOOOO");
    }
    // if (event === "SIGNED_IN") {
    //   setPasswordRecovery(true);
    //   console.log("AAAAAAAHHHHHH");
    // }
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {passwordRecovery ? (
        <Stack.Screen name="newPassword" component={NewPasswordScreen} />
      ) : (
        <>
          <Stack.Screen
            name="passwordRecoveryScreen"
            component={PasswordRecoveryScreen}
          />
          <Stack.Screen
            name="passwordEmailScreen"
            component={PasswordEmailScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default PasswordRecoveryStack;
