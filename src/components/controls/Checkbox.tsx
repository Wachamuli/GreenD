import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import { Control, FieldValue, useController } from "react-hook-form";
import CheckBox, { CheckboxEvent } from "expo-checkbox";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import Txt from "../Par";
import { View } from "react-native";
import ErrorMessage from "../ErrorMessage";

type Props = {
  name: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  control: Control<FieldValue<any>>;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

const Checkbox = (props: Props): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    defaultValue: false,
    name: props.name,
  });

  return (
    <View style={[styles.detailContainer, props.style]}>
      <CheckBox
        style={styles.checkbox}
        disabled={props.disabled}
        value={field.value}
        color={"black"}
        onValueChange={event => {
          if (props.onChange) props.onChange(event.valueOf());
          field.onChange(event);
        }}
      />
      {props.label && <Txt style={props.labelStyle}>{props.label}</Txt>}
      <ErrorMessage error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: verticalScale(5),
  },
  checkbox: {
    marginRight: horizontalScale(10),
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
  },
  error: {
    color: "red",
  },
});

export default Checkbox;
