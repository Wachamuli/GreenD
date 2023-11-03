import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Par from "../Par";
import { horizontalScale, verticalScale } from "../../utilities/metrics";

type Props = {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
};

const Field = (props: Props) => {
  return (
    <View>
      <Par>{props.label}</Par>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        placeholderTextColor={"#D9D9D9"}
        style={styles.input}
      />
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
