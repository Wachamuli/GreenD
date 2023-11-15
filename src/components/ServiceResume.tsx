import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/HomeScreen";
import Txt from "./Par";
import Header from "./Header";
import Tappable from "./controls/Tappable";
import { Outsourcers } from "../api/mockData";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Detail from "./Detail";
import { boxShadowXP } from "../utilities/crossplatform";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceResume">;

const ServiceResume = ({ route }: ScreenProps) => {
  const getOutsourcer = Outsourcers.find(
    item => item.outsourcerId.toString() == route.params.serviceId,
  );

  return (
    <>
      <View>
        <Header title="Resumen" />
        <View
          style={[
            styles.resumeTableContainer,
            boxShadowXP("black", 0.5, 20, -4, 10, 20),
          ]}>
          <Image
            source={getOutsourcer?.outsourcerLogo}
            style={styles.outsourcerImage}
          />
          <View style={styles.outsourcerInfoContainer}>
            <Header title={getOutsourcer?.outsourcerName} />
            <Txt>{getOutsourcer?.outsourcerBriefDescription}</Txt>
          </View>

          <View style={styles.detailsContainer}>
            {route.params.selectedDetails.map((value, index) => (
              <Txt style={styles.detail} key={index}>
                {/* <FontAwesomeIcon style={styles.dotlist} icon={faCircle} /> */}
                {value}
              </Txt>
            ))}
          </View>

          <View style={styles.appointment}>
            <View style={styles.row}>
              <Txt style={styles.key}>Día</Txt>
              <Txt>{route.params.selectedDay}</Txt>
            </View>
            <View style={styles.row}>
              <Txt style={styles.key}>Hora</Txt>
              <Txt>{route.params.selectedTime}</Txt>
            </View>
            <View style={styles.row}>
              <Txt style={styles.key}>Nota</Txt>
              <Txt> {route.params.note || "Sin anotaciones"}</Txt>
            </View>
          </View>
        </View>
      </View>
        <View style={styles.buttonContainer}>
          <Tappable title="Solicitar" />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  resumeTableContainer: {
    alignItems: "center",
    backgroundColor: "white",
    height: "80%",
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
    borderRadius: moderateScale(20),
  },
  outsourcerInfoContainer: {
    alignItems: "center",
  },
  outsourcerImage: {
    width: horizontalScale(150),
    maxHeight: verticalScale(150),
  },
  appointment: {
    display: "flex",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  key: {
    fontWeight: "bold",
  },
  row: {
    columnGap: 30,
    flexDirection: "row",
    // justifyContent: "space-evenly",
  },
  detailsContainer: {
    marginVertical: verticalScale(10),
  },
  detail: {},
  dotlist: {},
  buttonContainer: {
    top: "auto",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default ServiceResume;
