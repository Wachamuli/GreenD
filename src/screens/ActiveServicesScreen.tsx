import React from "react";
import { View, StyleSheet } from "react-native";
import Txt from "../components/Par";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import ActiveServiceCard from "../components/ActiveServiceCard";

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
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <Txt style={[styles.label, styles.timeLabel]}>Hora</Txt>
          <Txt style={[styles.label, styles.activeLabel]}>
            Solicitudes Activas
          </Txt>
        </View>

        <View>
          <ActiveServiceCard
            time="9:30 a.m"
            day="Lunes, noviembre 16"
            detail="Actualización y mejora del sistema eléctrico"
            status="En proceso de cotización..."
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    paddingVertical: horizontalScale(20),
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(2),
    borderRadius: moderateScale(10),
    width: "100%",
  },
  header: {
    flexDirection: "row",
    marginBottom: verticalScale(20),
    justifyContent: "space-evenly",
  },
  label: {
    fontWeight: "bold",
  },
  timeLabelContainer: {
    flexGrow: 1,
  },
  timeLabel: {
    marginRight: horizontalScale(40),
  },
  activeLabel: {},
});

export default ActiveServicesScreen;
