import React from "react";
import { View, StyleSheet } from "react-native";
import Txt from "./Par";
import { horizontalScale, verticalScale } from "../utilities/metrics";

type Props = {
  time: string;
  day: string;
  detail: string;
  status: string;
};

const ActiveServiceCard = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <View>
        <Txt>{props.time}</Txt>
      </View>

      <View style={styles.apponitmentDetailsCard}>
        <View>
        <Txt>{props.day}</Txt>
          <Txt numberOfLines={1}>{props.detail}</Txt>
          <Txt style={styles.state}>{props.status}</Txt>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  state: {
    color: "#FFC436",
  },
  time: {},
  apponitmentDetailsCard: {
    flexGrow: 6,
    maxWidth: "75%",
    borderLeftWidth: 2,
    // borderBottomWidth: 2,
    // borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(15),
    paddingVertical: horizontalScale(20),
  },
});

export default ActiveServiceCard;
