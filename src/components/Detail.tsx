import { StyleSheet, View } from "react-native";

import CheckBox from "expo-checkbox";
import { Control, useController } from "react-hook-form";

import Txt from "./info/Txt";
import Checkbox from "./controls/Checkbox";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { ColorPalette } from "../styles/colorPalette";

type Props = {
  name: string;
  control: Control<any>;
  key: number;
  label: string;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
};

const Detail = (props: Props): JSX.Element => {
  const { field } = useController({ control: props.control, name: props.name });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Txt style={styles.label}>{props.label}</Txt>
      </View>
      <CheckBox
        hitSlop={{
          top: verticalScale(25),
          bottom: verticalScale(25),
          left: horizontalScale(310),
          right: horizontalScale(15),
        }}
        style={styles.checkbox}
        color={ColorPalette.primary}
        disabled={props.disabled}
        value={field.value}
        onValueChange={event => {
          if (props.onChange) props.onChange(event.valueOf());
          field.onChange(event);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),

    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
  },
  textContainer: {
    width: "90%",
  },
  checkbox: {
    // paddingVertical: verticalScale(10),
    // paddingHorizontal: horizontalScale(10),

    borderColor: ColorPalette.primary,
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(5),
  },
  label: {
    fontSize: moderateScale(16),
    marginRight: "auto",
  },
});

export default Detail;
