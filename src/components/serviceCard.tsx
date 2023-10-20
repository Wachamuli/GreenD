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

type Props = {
  id: string;
  name: string;
  description: string;
  registrationDate: Date;
  image: ImageRequireSource;
};

const ServiceCard = (props: Props): JSX.Element => {
  const navigation = useNavigation<navigationProp>();

  return (
    <Pressable
      style={styles.serviceCardContainer}
      onPress={() => {
        navigation.navigate("serviceDetails", { serviceId: props.id });
      }}>
      <Image style={styles.serviceCardImage} source={props.image} />
      <View style={styles.serviceTextContainer}>
        <Text style={styles.serviceCardName}>{props.name}</Text>
        <Text style={styles.serviceCardDescription} numberOfLines={1}>{props.description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // TODO: Fix the minimium width when the phone is rotated
  serviceCardContainer: {
    borderWidth: 4,
    borderRadius: moderateScale(10),
    borderColor: "black",
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    maxHeight: verticalScale(200),
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
});

export default ServiceCard;
