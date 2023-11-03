import React, { SetStateAction } from "react";
import {StyleSheet} from "react-native";
import  CheckBox  from "expo-checkbox";

import { horizontalScale, verticalScale } from "../../utilities/metrics";
import Par from "../Par";
import { View } from "react-native";

type Props = {
  value?: boolean | undefined,
  detail: string;
  disabled?: boolean;
  onValueChange?: SetStateAction<any>; 
  onChange?: () => void; 
}

const Detail = (props: Props): JSX.Element => {
  return (
    <View style={styles.detailContainer}>
      <CheckBox
        style={styles.checkbox}
        disabled={props.disabled}
        value={props.value}
        onValueChange={props.onValueChange}
        onChange={props.onChange}
      />
      <Par>{props.detail}</Par>
      </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: verticalScale(5)
  },
  checkbox: {
    marginRight: horizontalScale(10) 
  }
})

export default Detail;
