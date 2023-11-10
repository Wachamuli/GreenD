import React from "react";
import { FlatList, Text, View } from "react-native";
import { Condominium, Outsourcer, Outsourcers } from "../api/mockData";
import Par from "../components/Par";

const MyProfileScreen = (): JSX.Element => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text style={{ color: "gray" }}>My Profile</Text>
    </View>
  );
};
export default MyProfileScreen;
