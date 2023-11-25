import { StyleSheet, View } from "react-native";
import { Control, FieldValue } from "react-hook-form";

import Field from "./Field";
import Txt from "../Txt";
import { useState } from "react";
import { horizontalScale, verticalScale } from "../../utilities/metrics";

type Props = {
  name: string;
  label?: string;
  control: Control<FieldValue<any>>;
};

const PasswordEnforcer = (props: Props): JSX.Element => {
  const [status, setStatus] = useState({
    status: "Status",
    color: "#9ca3af",
  });

  const handleOnChangeText = (text: string) => {
    let status;
    if (text.length > 1) status = "weak";
    if (text.match(/^(?=.*[a-zA-Z])(.{8,16})$/)) status = "moderate";
    if (text.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/)) status = "strong";

    switch (status) {
      case "weak":
        setStatus({ status: "Débil", color: "red" });
        break;
      case "moderate":
        setStatus({ status: "Moderado", color: "#FFC107" });
        break;
      case "strong":
        setStatus({ status: "Fuerte", color: "#5cb85c" });
        break;
      default:
        setStatus({ status: "Status", color: "#9ca3af" });
        break;
    }
  };

  return (
    <View>
      <Field
        onChangeText={handleOnChangeText}
        name={props.name}
        label={props.label}
        control={props.control}
        secureTextEntry={true}
        placeholder="********"
        maxLength={16}
      />

      <View style={styles.stren}>
        <View style={styles.barContainer}>
          <View style={[{ backgroundColor: status?.color }, styles.bar]} />
          <View
            style={[
              {
                backgroundColor:
                  status.status === "Moderado" || status.status === "Fuerte"
                    ? status?.color
                    : "#9ca3af",
              },
              styles.bar,
            ]}
          />
          <View
            style={[
              {
                backgroundColor:
                  status.status === "Fuerte" ? status?.color : "#9ca3af",
              },
              styles.bar,
            ]}
          />
        </View>
        <Txt style={[{ color: status?.color }, styles.status]}>
          {status?.status}
        </Txt>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stren: {},
  barContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  bar: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(30),
    marginLeft: horizontalScale(4),
  },
  status: {
    fontStyle: "italic",
    textAlign: "right",
  },
});

export default PasswordEnforcer;
