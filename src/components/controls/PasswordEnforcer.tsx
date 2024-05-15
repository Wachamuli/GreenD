import { StyleSheet, View } from "react-native";
import { Control, FieldValue } from "react-hook-form";

import Field from "./Field";
import Txt from "../Txt";
import { useState } from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import PasswordField from "./PasswordField";

type Props = {
  name: string;
  label?: string;
  control: Control<FieldValue<any>>;
};

const PasswordEnforcer = (props: Props): JSX.Element => {
  const [status, setStatus] = useState({
    statusName: "Status",
    colors: ["#9ca3af", "#9ca3af", "#9ca3af"],
  });

  const handleOnChangeText = (text: string) => {
    let status;
    if (text.length > 0) status = "weak";
    if (text.match(/^(?=.*[a-zA-Z])(.{8,16})$/)) status = "moderate";
    if (text.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/))
      status = "strong";

    switch (status) {
      case "strong":
        setStatus({
          statusName: "Fuerte",
          colors: ["#5cb85c", "#5cb85c", "#5cb85c"],
        });
        break;
      case "moderate":
        setStatus({
          statusName: "Moderate",
          colors: ["#FFC107", "#FFC107", "#9ca3af"],
        });
        break;
      case "weak":
        setStatus({
          statusName: "Débil",
          colors: ["red", "#9ca3af", "#9ca3af"],
        });
        break;
      default:
        setStatus({
          statusName: "Status",
          colors: ["#9ca3af", "#9ca3af", "#9ca3af"],
        });
        break;
    }
  };

  return (
    <View>
      <PasswordField
        onChangeText={handleOnChangeText}
        name={props.name}
        label={props.label}
        control={props.control}
      />

      <View>
        <View style={styles.barContainer}>
          <View style={[{ backgroundColor: status.colors[0] }, styles.bar]} />
          <View style={[{ backgroundColor: status.colors[1] }, styles.bar]} />
          <View style={[{ backgroundColor: status.colors[2] }, styles.bar]} />
        </View>
        <Txt style={[{ color: status?.colors[0] }, styles.status]}>
          {status?.statusName}
        </Txt>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  bar: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(30),
    marginLeft: horizontalScale(4),
    borderRadius: moderateScale(10),
  },
  status: {
    fontStyle: "italic",
    textAlign: "right",
  },
});

export default PasswordEnforcer;
