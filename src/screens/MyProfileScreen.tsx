import React from "react";
import { Text, View } from "react-native";
import Tappable from "../components/controls/Tappable";
import { useNavigation } from "@react-navigation/native";
import { navigationProp } from "../App";
import Txt from "../components/Txt";

const MyProfileScreen = (): JSX.Element => {
  const navigation = useNavigation<navigationProp>();
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text style={{ color: "gray" }}>My Profile</Text>
      <Tappable onPress={() => navigation.navigate("login")}><Txt>Logout</Txt></Tappable>
    </View>
  );
};
export default MyProfileScreen;
