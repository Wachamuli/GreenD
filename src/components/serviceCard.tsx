import React from "react";
import {
  View,
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
} from "react-native";

import { horizontalScale, moderateScale, verticalScale } from "../utilities/metrics";

type Props = {
  name: string;
  description: string;
  registrationDate: Date;
  image: ImageRequireSource;
};

const ServiceCard = (props: Props): JSX.Element => {
  return (
    <View style={styles.serviceCardContainer}>
      <Image style={styles.serviceCardImage} source={props.image} />
      <Text style={styles.serviceCardName}>{props.name}</Text>
      <Text style={styles.serviceCardDescription}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  serviceCardContainer: {
    borderWidth: 4,
    borderRadius: moderateScale(10),
    borderColor: "black",
    marginBottom: verticalScale(40),
    maxHeight: verticalScale(200),
    overflow: "hidden",
  },
  serviceCardImage: {
    width: "100%",
    maxHeight: verticalScale(130),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    marginBottom: verticalScale(20)
  },
  serviceCardName: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: "black",
    marginLeft: horizontalScale(8)
  },
  serviceCardDescription: {
    fontSize: moderateScale(18),
  }
});

export default ServiceCard;
