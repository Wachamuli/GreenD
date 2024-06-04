import { StyleProp, View, ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Tappable from "./Tappable";
import { moderateScale, verticalScale } from "../../utilities/metrics";
import { ColorPalette } from "../../styles/colorPalette";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const CircleButton = ({
  onPress,
  icon,
  iconStyle,
  containerStyle,
}: {
  onPress: () => void;
  icon: IconDefinition;
  iconStyle?: { color?: string; size?: number };
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <Tappable onPress={onPress} hitSlop={moderateScale(15)}>
      <View
        style={[
          {
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            height: verticalScale(40),
            width: verticalScale(40),
            borderWidth: moderateScale(0.5),
            borderRadius: moderateScale(40) / 2,
            borderColor: ColorPalette.tertiary,
          },
          containerStyle,
        ]}>
        <FontAwesomeIcon icon={icon} {...iconStyle} />
      </View>
    </Tappable>
  );
};

export default CircleButton;
