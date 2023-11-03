import React, { PropsWithChildren } from "react";
import { StyleProp, TextStyle, Text } from "react-native";
import { moderateScale } from "../utilities/metrics";

type Props = PropsWithChildren & {
  style?: {}; // TODO: Type-check this with StyleProp and TextStyle or other way
  numberOfLines?: number;
};

const Par = ({ children, style, numberOfLines }: Props): JSX.Element => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        fontFamily: undefined,
        fontSize: moderateScale(16),
        color: "black",
        ...style,
      }}>
      {children}
    </Text>
  );
};

export default Par;
