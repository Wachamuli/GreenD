import React, { PropsWithChildren } from "react";
import { StyleProp, TextStyle, Text } from "react-native";
import { moderateScale } from "../utilities/metrics";

type Props = PropsWithChildren & {
  style?: {} // TODO: Type-check this with StyleProp and TextStyle or other way
}

const Gtext = ({ children, style}: Props): JSX.Element => {
  return (
    <Text
      style={{
        ...style,
        fontFamily: undefined,
        fontSize: moderateScale(16),
        color: "black",
      }}>
      {children}
    </Text>
  );
};

export default Gtext;
