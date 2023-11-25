import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";

import { moderateScale } from "../utilities/metrics";

type Props = TextProps & PropsWithChildren;

const Txt = (props: Props): JSX.Element => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: undefined,
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
