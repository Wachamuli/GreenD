import { Platform } from "react-native";
import { horizontalScale, verticalScale } from "./metrics";

const boxShadowXP = (
  shadowColor: string,
  shadowOpacityIOS: number,
  shadowRadiusIOS: number,
  xOffsetIOS: number,
  yOffsetIOS: number,
  elevationAndroid: number,
) => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: shadowColor,
      shadowOpacity: shadowOpacityIOS,
      shadowRadius: shadowRadiusIOS,
      shadowOffset: {
        width: horizontalScale(xOffsetIOS),
        height: verticalScale(yOffsetIOS),
      },
    };
  } else if (Platform.OS === "android") {
    return {
      shadowColor: shadowColor,
      elevation: elevationAndroid,
    };
  }
};

export { boxShadowXP };
