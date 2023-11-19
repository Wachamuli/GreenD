import React from "react";

import { StyleSheet, TextInput, View } from "react-native";
import { Control, FieldValue, useController } from "react-hook-form";

import Txt from "../Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import ErrorMessage from "../ErrorMessage";

type Props = {
  name: string;
  style?: {};
  control: Control<FieldValue<any>>;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  selectTextOnFocus?: boolean;
};

const Field = (props: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    defaultValue: "",
    name: props.name,
  });

  return (
    <View style={styles.container}>
      <Txt style={styles.label}>{props.label}</Txt>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        placeholderTextColor={"#9ca3af"}
        selectTextOnFocus={props.selectTextOnFocus}
        style={{ ...styles.input, ...props.style }}
      />
      <ErrorMessage style={styles.errorMessageContainer} error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(8),
  },
  label: {
    marginBottom: verticalScale(5),
  },
  input: {
    width: horizontalScale(250),
    color: "black",
    borderColor: "black",
    backgroundColor: "#f3f4f6",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    borderRadius: verticalScale(10),
  },
  errorMessageContainer: {
    marginBottom: verticalScale(10),
  },
});

export default Field;
