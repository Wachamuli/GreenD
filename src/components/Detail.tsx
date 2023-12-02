import React from "react";
import Txt from "./Txt";
import Checkbox from "./controls/Checkbox";
import { Control, useController } from "react-hook-form";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: string;
  control: Control<any>;
  key: number;
  label: string;
  onChange: (isChecked: boolean) => void;
};

const Detail = (props: Props): JSX.Element => {
  const { field } = useController({ control: props.control, name: props.name });

  return (
    <Checkbox
      style={[
        styles.checkbox,
        {
          backgroundColor: field.value ? "#F2FFE9" : "white",
          borderColor:  "#28A745" ,
          borderWidth: field.value ? 1 : 0,
        },
      ]}
      {...props}>
      <Txt
        style={{
          fontStyle: field.value ? "normal" : "italic",
          fontWeight: field.value ? "bold" : "normal",
          color: field.value ? "#28A745" : "#9ca3af",
        }}>
        {props.label}
      </Txt>
    </Checkbox>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
  },
});

export default Detail;
