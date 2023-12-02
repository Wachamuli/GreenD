import { View, Image, StyleSheet, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { navigationProp } from "../screens/HomeScreen";
import { Services } from "../api/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Txt from "./Txt";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faUser, faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { boxShadowXP } from "../utilities/crossplatform";
import dayjs from "dayjs";
import Tappable from "./controls/Tappable";
import Header from "./Header";

type Props = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const ServiceCard = (props: Props): JSX.Element => {
  const navigation = useNavigation<navigationProp>();

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
      containerStyle={[
        styles.serviceCardContainer,
        boxShadowXP("black", 0.5, 20, -4, 5, 5),
      ]}
      onPress={() => {
        navigation.navigate("serviceDetails", {
          serviceId: props.id,
        });
      }}>
      <Image style={styles.serviceCardImage} source={{ uri: props.image }} />
      <View style={styles.serviceTextContainer}>
        <Txt style={styles.serviceCardName}>{props.name}</Txt>
        <Txt style={styles.serviceCardDescription} numberOfLines={1}>
          {props.description}
        </Txt>

        <View style={styles.infoContainer}>
          <View style={styles.infoItemContainer}>
            <FontAwesomeIcon icon={faCalendarDays} color="#9ca3af" />
            <Txt style={styles.infoContent}>
              {dayjs(serviceMinimumDate.toString()).format("dddd, MMMM D")}
            </Txt>
          </View>
          <View style={styles.infoItemContainer}>
            <FontAwesomeIcon icon={faDollarSign} color="#9ca3af" />
            <Txt style={styles.infoContent}>
              Desde {serviceMinimumPrice} DOP
            </Txt>
          </View>
          <View style={styles.infoItemContainer}>
            <FontAwesomeIcon icon={faUser} color={setColor} />
            <Txt style={[styles.infoContent, { color: setColor }]}>
              {serviceAvailableOutsourcers} disponibles
            </Txt>
          </View>
        </View>
      </View>
    </Tappable>
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
    height: verticalScale(130),
  },
  serviceTextContainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: horizontalScale(8),
  },
  serviceCardName: {
    fontSize: moderateScale(18),
    fontFamily: "MontserratBold",
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
