import { Text, View } from "react-native";
import { CommonActions, Link, useNavigation } from "@react-navigation/native";

import Txt from "../components/Txt";
import { supabase } from "../lib/supabase";
import Btn from "../components/controls/Btn";
import { navigationProp } from "../App";

const MyProfileScreen = (): JSX.Element => {
  const navigation = useNavigation<navigationProp>();

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
      <Btn onPress={logout} label="Logout" />
    </View>
  );
};
export default MyProfileScreen;
