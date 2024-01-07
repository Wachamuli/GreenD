import { StyleProp, View, ViewStyle } from "react-native";
import { boxShadowXP } from "../utilities/crossplatform";
import { PropsWithChildren } from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

type Props = {
  style?: StyleProp<ViewStyle>;
} & PropsWithChildren;

const Card = ({ children, style }: Props): JSX.Element => {
  return (
    <View
      style={[
        {
          backgroundColor: "white",
          borderRadius: moderateScale(10),
          marginVertical: horizontalScale(5),
          marginHorizontal: horizontalScale(10),
          paddingVertical: verticalScale(20),
          paddingHorizontal: horizontalScale(20),
        },
        boxShadowXP("black", 0.5, 20, -4, 5, 5),
        style,
      ]}>
      {children}
    </View>
  );
};

export default Card;
