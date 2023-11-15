import React from "react";
import {
  View,
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { navigationProp } from "../screens/HomeScreen";
import { Services } from "../api/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Txt from "./Par";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faUser, faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { boxShadowXP } from "../utilities/crossplatform";

type Props = {
  id: string;
  name: string;
  description: string;
  registrationDate: Date;
  image: ImageRequireSource;
};

const ServiceCard = ({ serviceId: id }: { serviceId: string }): JSX.Element => {
  const navigation = useNavigation<navigationProp>();
  const {
    serviceName,
    serviceImage,
    serviceDescription,
    serviceMinimumDate,
    serviceMinimumPrice,
    serviceAvailableOutsourcers,
  } = Services.filter(({ serviceId }) => serviceId.toString() === id)[0];

  const setColor =
    serviceAvailableOutsourcers > 50
      ? "#5cb85c"
      : serviceAvailableOutsourcers > 30
      ? "#FFC107"
      : "red";

  return (
    <Pressable
      style={[
        styles.serviceCardContainer,
        boxShadowXP("black", 0.5, 20, -4, 5, 5),
      ]}
      onPress={() => {
        navigation.navigate("serviceDetails", { serviceId: id });
      }}>
      <Image style={styles.serviceCardImage} source={serviceImage} />
      <View style={styles.serviceTextContainer}>
        <Text style={styles.serviceCardName}>{serviceName}</Text>
        <Text style={styles.serviceCardDescription} numberOfLines={1}>
          {serviceDescription}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItemContainer}>
            <FontAwesomeIcon icon={faCalendarDays} color="#9ca3af" />
            <Txt style={styles.infoContent}>
              {serviceMinimumDate.toString()}{" "}
            </Txt>
          </View>
          <View style={styles.infoItemContainer}>
            <FontAwesomeIcon icon={faDollarSign} color="#9ca3af" />
            <Txt style={styles.infoContent}>Desde {serviceMinimumPrice} RD</Txt>
          </View>
          <View style={styles.infoItemContainer}>
            <FontAwesomeIcon icon={faUser} color={setColor} />
            <Txt style={[styles.infoContent, { color: setColor }]}>
              {serviceAvailableOutsourcers} disponibles
            </Txt>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // TODO: Fix the minimium width when the phone is rotated
  serviceCardContainer: {
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    maxHeight: verticalScale(270),
    overflow: "hidden",
  },
  serviceCardImage: {
    width: "100%",
    maxHeight: verticalScale(130),
    marginBottom: verticalScale(3),
  },
  serviceTextContainer: {
    paddingHorizontal: horizontalScale(8),
  },
  serviceCardName: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "black",
  },
  serviceCardDescription: {
    fontSize: moderateScale(16),
    color: "gray",
  },
  infoContainer: {
    marginTop: verticalScale(10),
  },
  infoItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContent: {
    marginLeft: horizontalScale(10),
    color: "#9ca3af",
  },
});

export default ServiceCard;
