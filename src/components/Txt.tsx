import { PropsWithChildren, useCallback } from "react";
import { Text, TextProps } from "react-native";

import { moderateScale } from "../utilities/metrics";
import { useFonts } from "expo-font";

type Props = TextProps & PropsWithChildren;

const Txt = (props: Props): JSX.Element => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "ffNormal",
          fontSize: moderateScale(16),
          color: "black",
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

export default Txt;
