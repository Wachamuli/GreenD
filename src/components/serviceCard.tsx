import React from "react";
import {
  View,
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
} from "react-native";

import { verticalScale } from "../utilities/metrics";

type Props = {
  name: string;
  description: string;
  registrationDate: Date;
  image: ImageRequireSource;
};

const ServiceCard = (props: Props): JSX.Element => {
  return (
    <View style={styles.serviceCardContainer}>
      <Image source={props.image} />
      <Text>{props.name}</Text>
      <Text>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  serviceCardContainer: {
    borderWidth: 4,
    borderColor: "black",
    marginVertical: verticalScale(10),
  },
  serviceCardImage: {
    width: "100%",
    maxHeight: verticalScale(10),
  },
});

export default ServiceCard;
