import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

import WheelPicker from "react-native-wheely";

import { ColorPalette } from "../../styles/colorPalette";
import { moderateScale } from "../../utilities/metrics";

type Props = {
  value: number;
  onValueChange: Dispatch<SetStateAction<number>>;
  options: string[];
};

const WheelTimePicker = (props: Props): JSX.Element => {
  return (
    <View style={styles.wheelContainer}>
      <WheelPicker
        flatListProps={{ nestedScrollEnabled: true }}
        selectedIndicatorStyle={styles.selectedIndicator}
        itemTextStyle={styles.itemStyle}
        itemHeight={60}
        visibleRest={1}
        selectedIndex={props.value}
        onChange={index => props.onValueChange(index)}
        options={props.options}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
    alignItems: "center",
  },
  itemStyle: {
    fontFamily: "ffNormal",
    fontSize: moderateScale(16),
    color: ColorPalette.primary,
  },
  selectedIndicator: {
    backgroundColor: "#f3f5ff",
    borderRadius: moderateScale(10),
  },
  wheelContainer: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // height: verticalScale(60),
  },
});

export default WheelTimePicker;
