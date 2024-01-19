import { Text, View } from "react-native";

import Txt from "../components/Txt";
import { supabase } from "../lib/supabase";
import Btn from "../components/controls/Btn";

const MyProfileScreen = (): JSX.Element => {
  const logout = async () => {
    // TODO: Manage error
    const { error } = await supabase.auth.signOut();
  };

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text style={{ color: "gray" }}>My Profile</Text>
      <Btn onPress={logout} label="Cerrar sesión" />
      <View>
        <Txt>Idioma</Txt>
        <Txt>Cambiar numero telefónico</Txt>
        <Txt></Txt>
        <Txt></Txt>
      </View>
    </View>
  );
};
export default MyProfileScreen;
