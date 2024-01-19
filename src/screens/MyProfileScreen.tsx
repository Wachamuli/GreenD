import { View } from "react-native";

import Txt from "../components/Txt";
import Btn from "../components/controls/Btn";
import { supabase } from "../lib/supabase";

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
      <Txt style={{ color: "gray" }}>My Profile</Txt>
      <View>
        <Txt>Foto</Txt>
        <Btn onPress={logout} label="Cerrar sesión" />
        <Txt>Name</Txt>
        <Txt>Idioma</Txt>
        <Txt>Cambiar numero telefónico</Txt>
        <Txt>Gestionar notificaciones</Txt>
        <Txt>Ayuda</Txt>
        <Txt>Eliminar cuenta</Txt>
        <Txt></Txt>
        <Txt></Txt>
      </View>
    </View>
  );
};

export default MyProfileScreen;
