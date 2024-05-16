import { ReactNode } from "react";
import {
  StyleSheet,
  TextInputProps,
  TextInput,
  View,
  TextStyle,
  StyleProp,
} from "react-native";
import { Control, FieldValue, useController } from "react-hook-form";

import Txt from "../Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import ErrorMessage from "../ErrorMessage";
import { ColorPalette } from "../../styles/colorPalette";

export type FieldProps = TextInputProps & {
  name: string;
  style?: StyleProp<TextStyle>;
  control: Control<FieldValue<any>>;
  onChangeText?: (text: string) => void;
  label?: string;
  children?: ReactNode;
};

const Field = (props: FieldProps) => {
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
      {props.label && <Txt style={styles.label}>{props.label}</Txt>}
      <View>
        <TextInput
          {...props}
          children={null}
          maxLength={150}
          value={field.value}
          placeholderTextColor={"#9ca3af"}
          selectTextOnFocus={props.selectTextOnFocus}
          style={[
            { borderColor: error ? ColorPalette.error : ColorPalette.tertiary },
            styles.input,
            props.style,
          ]}
          onChangeText={e => {
            props.onChangeText && props.onChangeText(e);
            field.onChange(e);
          }}
        />
        {props.children}
      </View>
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
    color: "black",
    width: horizontalScale(250),
    borderWidth: moderateScale(1),
    backgroundColor: "#f9fafb",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    borderRadius: verticalScale(10),
  },
  errorMessageContainer: {
    marginBottom: verticalScale(10),
  },
});

export default Field;
