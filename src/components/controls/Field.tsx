import React from "react";

import { StyleSheet, TextInput, View } from "react-native";
import { Control, FieldValue, useController } from "react-hook-form";

import Par from "../Par";
import { horizontalScale, verticalScale } from "../../utilities/metrics";
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
  const { field, fieldState: { error } } = useController({
    control: props.control,
    defaultValue: "",
    name: props.name,
  });

  return (
    <View>
      <Par>{props.label}</Par>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        placeholderTextColor={"#D9D9D9"}
        selectTextOnFocus={props.selectTextOnFocus}
        style={{...styles.input, ...props.style}}
      />
      <ErrorMessage error={error} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: horizontalScale(250),
    color: "black",
    borderColor: "black",
    textAlignVertical: "top",
    borderBottomWidth: 2,
    marginBottom: verticalScale(10),
  },
});

export default Field;
