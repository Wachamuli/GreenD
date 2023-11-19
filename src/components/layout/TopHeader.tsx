import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, View } from "react-native";
import Txt from "../Txt";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { horizontalScale, moderateScale } from "../../utilities/metrics";

const TopHeader = (props: BottomTabHeaderProps): JSX.Element => {
  return (
    <View style={styles.headerContainer}>
      <FontAwesomeIcon icon={faChevronLeft} size={25} />
      <Txt style={styles.title}>{props.options.title}</Txt>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: horizontalScale(20),
    paddingVertical: horizontalScale(10),
    borderRadius: moderateScale(20),
    top: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: moderateScale(20)
  }
})

export default TopHeader;
