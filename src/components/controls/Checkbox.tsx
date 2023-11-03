import React, { SetStateAction } from "react";
import {StyleSheet} from "react-native";
import  CheckBox  from "expo-checkbox";

import { horizontalScale, verticalScale } from "../../utilities/metrics";
import Par from "../Par";
import { View } from "react-native";

type Props = {
  style?: {},
  value?: boolean | undefined,
  text: string;
  disabled?: boolean;
  onValueChange?: SetStateAction<any>; 
  onChange?: () => void; 
}

const Checkbox = (props: Props): JSX.Element => {
  return (
    <View style={{...styles.detailContainer, ...props.style}}>
      <CheckBox
        style={styles.checkbox}
        disabled={props.disabled}
        value={props.value}
        onValueChange={props.onValueChange}
        onChange={props.onChange}
      />
      <Par>{props.text}</Par>
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

export default Checkbox;
