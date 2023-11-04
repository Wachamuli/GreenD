import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useController } from "react-hook-form";

import Par from "../Par";
import { horizontalScale, verticalScale } from "../../utilities/metrics";
import { Control, FieldValue } from "react-hook-form";

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
};

const Field = (props: Props) => {
  const { field, formState: { errors } } = useController({
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
        style={styles.input}
      />
      { errors[props.name] && <Par style={styles.error}>{errors[props.name]?.message?.toString()}</Par> }
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
  error: {
    color: "red"
  }
});

export default Field;
