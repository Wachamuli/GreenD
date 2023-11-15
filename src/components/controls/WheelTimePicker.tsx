import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View } from "react-native";
import WheelPicker from "react-native-wheely";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  value: number;
  onValueChange: Dispatch<SetStateAction<number>>;
  options: string[];
};

const WheelTimePicker = (props: Props): JSX.Element => {
  return (
    <View style={styles.timePickerContainer}>
      <FontAwesomeIcon icon={faCaretUp} />
      <View style={styles.wheelContainer}>
        <WheelPicker
          flatListProps={{ nestedScrollEnabled: true }}
          itemTextStyle={{
            color: "black",
            textAlign: "center",
            fontSize: moderateScale(16),
            fontWeight: "bold",
          }}
          itemStyle={{
            backgroundColor: "white",
            borderRadius: moderateScale(10),
            paddingVertical: verticalScale(10),
          }}
          itemHeight={60}
          visibleRest={1}
          selectedIndex={props.value}
          onChange={index => props.onValueChange(index)}
          options={props.options}
        />
      </View>
      <FontAwesomeIcon icon={faCaretDown} />
    </View>
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
    alignItems: "center",
  },
  wheelContainer: {
    display: "flex",
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    alignItems: "center",
    gap: horizontalScale(10),
    flexDirection: "row",
    overflow: "hidden",
    // width: horizontalScale(10),
    height: verticalScale(60),
  },
});

export default WheelTimePicker;
