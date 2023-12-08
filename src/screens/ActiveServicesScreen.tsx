import React from "react";
import { View, StyleSheet } from "react-native";
import Txt from "../components/Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import ActiveServiceCard from "../components/ActiveServiceCard";
import { supabase } from "../lib/supabase";

const ActiveServicesScreen = (): JSX.Element => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: horizontalScale(20),
      }}>
      {/* <Par>Sin Servicios Activos</Par> */}
      <ActiveServiceCard
        time="9:30 a.m"
        day="Lunes, noviembre 16"
        details={["Actualización y mejora del sistema eléctrico"]}
        status="En proceso de cotización..."
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ActiveServicesScreen;
