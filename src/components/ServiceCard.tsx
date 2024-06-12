import { View, Image, StyleSheet, Text } from "react-native";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { Services } from "../api/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Txt from "./info/Txt";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { boxShadowXP } from "../utilities/crossplatform";
import dayjs from "dayjs";
import Tappable from "./controls/Tappable";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { capitalize } from "../utilities/utils";
import { router } from "expo-router";

type Props = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const ServiceCard = (props: Props): JSX.Element => {
  const [availableOutsourcers, setAvailableOutsourcers] = useState<
    number | null
  >();

  const getAvailableOutsourcers = async () => {
    const { count, error } = await supabase
      .from("condominium_services")
      .select("*", { head: true, count: "exact" })
      // .eq("condominium_id", props.id)
      .eq("service_id", props.id);

    setAvailableOutsourcers(count || 0);
  };

  useEffect(() => {
    getAvailableOutsourcers();
  }, []);

  // TODO: Remove this, it is a mockup
  const {
    serviceMinimumDate,
    serviceMinimumPrice,
    serviceAvailableOutsourcers,
  } = Services.filter(({ serviceId }) => serviceId.toString() === "1")[0];

  const setColor =
    serviceAvailableOutsourcers > 50
      ? "#5cb85c"
      : serviceAvailableOutsourcers > 30
      ? "#FFC107"
      : "red";

  return (
    <Tappable
      containerStyle={[styles.serviceCardContainer]}
      onPress={() => {
        router.navigate({
          pathname: "/home/details",
          params: { serviceId: props.id },
        });
      }}>
      <View>
        <Image style={styles.serviceCardImage} source={{ uri: props.image }} />
        <View
          style={[
            styles.availableUsers,
            boxShadowXP("black", 0.5, 20, -4, 5, 5),
          ]}>
          <FontAwesomeIcon
            icon={faUser}
            color={setColor}
            size={moderateScale(13)}
          />
          <Txt style={[styles.infoContent, { color: setColor }]}>
            {availableOutsourcers}
          </Txt>
        </View>
      </View>

      <View>
        <Txt style={styles.serviceCardName} numberOfLines={1}>
          {props.name}
        </Txt>

        <View style={styles.infoContainer}>
          <View style={styles.infoItemContainer}>
            <FontAwesomeIcon icon={faCalendarDays} color="#9ca3af" />
            <Txt style={styles.infoContent}>
              {capitalize(
                dayjs(serviceMinimumDate.toString()).format("dddd, D"),
              )}
            </Txt>
          </View>
          <View style={styles.infoItemContainer}>
            <FontAwesomeIcon
              icon={faDollarSign}
              color="#9ca3af"
              size={moderateScale(10)}
            />
            <Txt style={styles.infoContent}>{serviceMinimumPrice} Min.</Txt>
          </View>
        </View>
      </View>
    </Tappable>
  );
};

const styles = StyleSheet.create({
  serviceCardContainer: {
    backgroundColor: "white",
    width: moderateScale(100),
    justifyContent: "center",
    marginBottom: verticalScale(20),
    alignItems: "center",
  },
  serviceCardImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(80) / 2,
  },
  serviceCardName: {
    fontSize: moderateScale(12),
    textAlign: "center",
    fontFamily: "ffBold",
    color: "black",
  },
  serviceCardDescription: {
    color: "gray",
  },
  infoContainer: {
    marginTop: verticalScale(10),
    alignItems: "center",
  },
  availableUsers: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(30) / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  infoItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoContent: {
    marginLeft: horizontalScale(2),
    color: "#9ca3af",
    fontSize: moderateScale(12),
  },
});

export default ServiceCard;
